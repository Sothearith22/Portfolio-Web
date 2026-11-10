import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(4, "Message should be at least 4 characters").max(1000),
});

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  entry.count++;
  return false;
};

interface VercelRequestLike {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string };
  body?: unknown;
}

interface VercelResponseLike {
  setHeader: (name: string, value: string) => void;
  status: (statusCode: number) => VercelResponseLike;
  json: (body: unknown) => void;
}

declare const process: {
  env: Record<string, string | undefined>;
};

export default async function handler(
  req: VercelRequestLike,
  res: VercelResponseLike
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const clientIp =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "127.0.0.1";

  if (checkRateLimit(clientIp)) {
    return res.status(429).json({
      error: "Too many requests. Please wait a minute before sending another message.",
    });
  }

  const botToken = process.env.BOT_TOKEN || process.env.VITE_BOT_TOKEN;
  const chatId = process.env.CHAT_ID || process.env.VITE_CHAT_ID;

  if (!botToken || !chatId) {
    return res.status(500).json({
      error: "Telegram contact is not configured on the server.",
    });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: "Invalid JSON payload." });
    }
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return res.status(400).json({
      error: result.error.issues[0]?.message || "Invalid form data.",
    });
  }

  const { name, email, message } = result.data;
  const cleanName = name.replace(/[\r\n]+/g, " ");
  const cleanEmail = email.replace(/[\r\n]+/g, " ");

  const text = [
    "📩 New Contact Message from Portfolio",
    "",
    `Name: ${cleanName}`,
    `Email: ${cleanEmail}`,
    "Message:",
    message,
  ].join("\n");

  try {
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
      }
    );

    const telegramData = (await telegramResponse.json().catch(() => null)) as {
      ok?: boolean;
      description?: string;
    } | null;

    if (!telegramResponse.ok || telegramData?.ok === false) {
      return res.status(502).json({
        error: telegramData?.description || "Failed to deliver Telegram notification.",
      });
    }

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({
      error: "An unexpected error occurred while sending message.",
    });
  }
}
