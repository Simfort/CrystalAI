import { openai } from "@/config/openAiModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const completion = await openai.chat.completions.create({
      model: "xiaomi/mimo-v2-flash:free",
      messages: [
        {
          role: "system",
          content: `Ты — опытный фронтенд‑разработчик. Сгенерируй полный HTML-код сайта с CSS и JavaScript. 
        Выведи только код без пояснений. Используй современные практики: семантическая разметка, адаптивный дизайн,
        доступность. Все стили пиши в атрибуте style.ТОЛЬКО КОД ! ТОЛЬКО КОД БЕЗ НИЧЕГО ! Без картинок. На русском `,
        },
        {
          role: "user",
          content: `Напиши только код для описания:${prompt}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 4096,
    });
    const code =
      completion.choices[0].message.content ||
      completion.choices[0].message.reasoning;

    return NextResponse.json(code, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 501 });
  }
}
