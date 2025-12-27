"use client";
import { useSearchParams } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import axios from "axios";
import reactParser from "html-react-parser";
import { Loader, Loader2 } from "lucide-react";

export default function ResultScreen() {
  const prompt = useSearchParams().get("prompt");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState<JSX.Element>();
  const extractBodyContent = (html: string): string => {
    const match = html.match(/<body[^>]*>(.*)<\/body>/i);
    if (match && match[1]) {
      return match[1];
    }

    return html;
  };
  const generateSite = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/generateSite", { prompt });
      const code = reactParser(extractBodyContent(res.data));
      console.log(code);
      setCode(code);
      setLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    prompt && generateSite();
  }, [prompt]);
  return (
    <div className="min-h-screen w-1/1 rounded-[20px] bg-white">
      {loading ? (
        <div className="flex w-1/1 h-1/1 items-center justify-center">
          <Loader2 className="text-primary-light animate-spin" />{" "}
        </div>
      ) : (
        <div>{code}</div>
      )}
    </div>
  );
}
