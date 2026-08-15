"use client";

import { useEffect, useState } from "react";

type Language = "es" | "en";
const ORIGINAL_TEXT = new WeakMap<Text, string>();

function browserLanguage(): Language {
  return navigator.languages.some((language) => language.toLowerCase().startsWith("en")) ? "en" : "es";
}

async function translateText(text: string) {
  const response = await fetch(
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=en&dt=t&q=${encodeURIComponent(text)}`
  );
  if (!response.ok) throw new Error("Translation request failed");
  const data = (await response.json()) as Array<Array<[string]>>;
  return data[0].map(([translated]) => translated).join("");
}

async function translateDocument(language: Language) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    const text = node.nodeValue?.trim() ?? "";
    if (text && !node.parentElement?.closest("script, style, button[aria-label='Language selector']")) nodes.push(node);
  }

  if (language === "es") {
    nodes.forEach((node) => {
      const original = ORIGINAL_TEXT.get(node);
      if (original) node.nodeValue = original;
    });
    return;
  }

  const queue = [...nodes];
  await Promise.all(Array.from({ length: 6 }, async () => {
    let node = queue.shift();
    while (node) {
      const original = ORIGINAL_TEXT.get(node) ?? node.nodeValue ?? "";
      ORIGINAL_TEXT.set(node, original);
      const text = original.trim();
      if (text && !/^(ES|EN|HistoriAR|GitHub|[\d.]+)$/.test(text)) {
        try {
          const leading = original.match(/^\s*/)?.[0] ?? "";
          const trailing = original.match(/\s*$/)?.[0] ?? "";
          node.nodeValue = `${leading}${await translateText(text)}${trailing}`;
        } catch {
          // Keep the original content visible if the translation service is unavailable.
        }
      }
      node = queue.shift();
    }
  }));
}

export default function LanguageSelector() {
  const [language, setLanguage] = useState<Language>("es");
  const [translating, setTranslating] = useState(false);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("historiar-language");
    const initialLanguage = savedLanguage === "en" || savedLanguage === "es" ? savedLanguage : browserLanguage();
    setLanguage(initialLanguage);
    document.documentElement.lang = initialLanguage;
    if (initialLanguage === "en") {
      setTranslating(true);
      void translateDocument("en").finally(() => setTranslating(false));
    }
  }, []);

  const changeLanguage = async (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem("historiar-language", nextLanguage);
    document.documentElement.lang = nextLanguage;
    setTranslating(true);
    await translateDocument(nextLanguage);
    setTranslating(false);
  };

  return (
    <div aria-label="Language selector" style={{ display: "inline-flex", padding: 3, gap: 2, border: "1px solid rgba(255,255,255,0.14)", borderRadius: 999, background: "rgba(15,23,42,0.58)" }}>
      {(["es", "en"] as const).map((option) => (
        <button key={option} type="button" aria-pressed={language === option} disabled={translating} onClick={() => void changeLanguage(option)} style={{ border: 0, borderRadius: 999, padding: "5px 8px", background: language === option ? "#F97316" : "transparent", color: language === option ? "#fff" : "#CBD5E1", cursor: translating ? "wait" : "pointer", fontSize: "0.7rem", fontWeight: 800, lineHeight: 1 }}>
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
