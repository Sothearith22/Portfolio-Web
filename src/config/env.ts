import cv from "../assets/cv/KimSothearith-Webdeveloper-CV.pdf";
const normalizeEnvValue = (value: string | undefined) =>
  value?.trim().replace(/^["']|["']$/g, "").replace(/[,;]+$/g, "");

export const env = {
  resume: cv,
  contactEmail: "kimsothearith2007@gmail.com",
  githubUrl: "https://github.com/Sothearith22",
  BOT_TOKEN: normalizeEnvValue(import.meta.env.VITE_BOT_TOKEN),
  CHAT_ID: normalizeEnvValue(import.meta.env.VITE_CHAT_ID),
};
