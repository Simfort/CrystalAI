import { AudioLines, Send } from "lucide-react";

export default function Textarea() {
  return (
    <div
      className="bg-[#72727220] flex flex-col rounded-[20px] h-[265px] w-[600px] relative"
      role="region"
      aria-label="Поле ввода текста с дополнительными действиями">
      <textarea
        id="text-input"
        className="w-full h-full p-5 resize-none outline-none bg-transparent"
        placeholder="Напишите описание..."
        aria-required="false"
        aria-describedby="textarea-hint"
      />
      <div
        className="flex gap-3 items-center h-[30px] justify-end pb-8 pr-8 absolute bottom-0 right-0"
        aria-label="Панель действий">
        <button
          type="button"
          className="cursor-pointer hover:opacity-50 transition-all rounded-full bg-[#72727236] p-2 border-0"
          aria-label="Включить голосовой ввод">
          <AudioLines className="text-primary-light" />
        </button>
        <button
          type="button"
          className="cursor-pointer hover:opacity-50 transition-all rounded-full bg-[#72727236] p-2 border-0"
          aria-label="Отправить текст">
          <Send className="text-primary-light" />
        </button>
      </div>
      <div id="textarea-hint" className="sr-only">
        Вы можете ввести текст или использовать кнопки для голосового ввода и
        отправки.
      </div>
    </div>
  );
}
