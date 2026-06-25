import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import type { IncomingMessage, ServerResponse } from "http";
import { z } from "zod";
import { componentTagger } from "lovable-tagger";

const contactRoute = "/api/contact";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(4).max(1000),
});

const normalizeEnvValue = (value: string | undefined) =>
  value?.trim().replace(/^["']|["']$/g, "").replace(/[,;]+$/g, "");

const readBody = (req: IncomingMessage) =>
  new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = [];

    req.on("data", (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });

const sendJson = (
  res: ServerResponse,
  statusCode: number,
  payload: Record<string, unknown>,
) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
};

const telegramContactPlugin = (mode: string): Plugin => {
  const getTelegramCredentials = () => {
    const env = loadEnv(mode, process.cwd(), "");

    return {
      botToken: normalizeEnvValue(env.BOT_TOKEN || env.VITE_BOT_TOKEN),
      chatId: normalizeEnvValue(env.CHAT_ID || env.VITE_CHAT_ID),
    };
  };

  const handler = (
    req: IncomingMessage,
    res: ServerResponse,
    next: (err?: unknown) => void,
  ) => {
    if (!req.url) {
      next();
      return;
    }

    const url = new URL(req.url, "http://localhost");
    if (req.method !== "POST" || url.pathname !== contactRoute) {
      next();
      return;
    }

    void (async () => {
      const { botToken, chatId } = getTelegramCredentials();

      if (!botToken || !chatId) {
        sendJson(res, 500, {
          error:
            "Telegram contact is not configured. Set BOT_TOKEN and CHAT_ID in .env.",
        });
        return;
      }

      if (chatId.startsWith("http")) {
        sendJson(res, 500, {
          error:
            "CHAT_ID must be your Telegram chat ID or channel username, not a URL.",
        });
        return;
      }

      if (/^@.+bot$/i.test(chatId)) {
        sendJson(res, 500, {
          error:
            "CHAT_ID cannot be a bot username. Use a numeric chat ID or a channel/group username.",
        });
        return;
      }

      let payload: unknown;
      try {
        payload = JSON.parse(await readBody(req));
      } catch {
        sendJson(res, 400, { error: "Request body must be valid JSON." });
        return;
      }

      const result = contactSchema.safeParse(payload);
      if (!result.success) {
        sendJson(res, 400, {
          error: result.error.issues[0]?.message || "Invalid form data.",
        });
        return;
      }

      const { name, email, message } = result.data;

      const text = [
        "New Contact Message",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Message: ${message}`,
      ].join("\n");

      const telegramResponse = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: new URLSearchParams({
            chat_id: chatId,
            text,
          }),
        },
      );

      const telegramData = (await telegramResponse
        .json()
        .catch(() => null)) as
        | { ok?: boolean; description?: string }
        | null;

      if (!telegramResponse.ok || telegramData?.ok === false) {
        if (telegramResponse.status === 404) {
          sendJson(res, 500, {
            error:
              "Telegram bot token was not found. Generate a fresh token with BotFather and update BOT_TOKEN in .env.",
          });
          return;
        }

        if (telegramResponse.status === 400) {
          sendJson(res, 400, {
            error:
              telegramData?.description ||
              "Telegram rejected the request. Check CHAT_ID and bot permissions.",
          });
          return;
        }

        sendJson(res, 502, {
          error:
            telegramData?.description ||
            "Telegram rejected the message. Check BOT_TOKEN and CHAT_ID.",
        });
        return;
      }

      sendJson(res, 200, { ok: true });
    })().catch((error: unknown) => {
      sendJson(res, 500, {
        error: error instanceof Error ? error.message : "Failed to send message.",
      });
    });
  };

  return {
    name: "telegram-contact-api",
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [
      react(),
      telegramContactPlugin(mode),
      mode === "development" && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
  };
});
