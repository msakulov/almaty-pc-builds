import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const LeadSchema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(3).max(30),
  email: z.string().trim().email().max(200).optional().or(z.literal("")).transform((v) => (v ? v : undefined)),
  message: z.string().trim().max(2000).optional(),
  source: z.string().max(50).default("contact_form"),
  language: z.enum(["ru", "kz", "en"]).default("ru"),
  build_config: z.record(z.string(), z.unknown()).optional(),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => LeadSchema.parse(data))
  .handler(async ({ data }) => {
    const supabase = createClient<Database>(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY!,
      { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
    );

    const { error: insertError } = await supabase.from("leads").insert({
      name: data.name,
      phone: data.phone,
      email: data.email ?? null,
      message: data.message ?? null,
      source: data.source,
      language: data.language,
      build_config: (data.build_config as never) ?? null,
    });

    if (insertError) {
      throw new Error(insertError.message);
    }

    // Optional: send to Telegram if bot secrets are configured
    let telegramSent = false;
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (botToken && chatId) {
      const text = [
        `🖥️ Новая заявка (${data.source}, ${data.language})`,
        `Имя: ${data.name}`,
        `Телефон: ${data.phone}`,
        data.email ? `Email: ${data.email}` : null,
        data.message ? `Сообщение: ${data.message}` : null,
        data.build_config ? `Конфигурация:\n${JSON.stringify(data.build_config, null, 2)}` : null,
      ]
        .filter(Boolean)
        .join("\n");
      try {
        const resp = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text }),
        });
        telegramSent = resp.ok;
      } catch (err) {
        console.error("telegram send failed", err);
      }
    }

    return { telegramSent };
  });

