"use client"

import { useState } from "react"
import { useLanguage } from "../contexts/language-context"
import { cn } from "@/app/lib/utils"
import { ChevronDown, ChevronUp } from "lucide-react"

type LanguageOption = {
  code: "en" | "es" | "fr" | "de" | "jp"
  name: string
  flag: string
}

const languages: LanguageOption[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "jp", name: "日本語", flag: "🇯🇵" },
]

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = languages.find((lang) => lang.code === language)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 border border-green-500 px-3 py-1 text-xs hover:bg-green-500/10 transition-colors"
      >
        <span className="mr-1">{currentLanguage?.flag}</span>
        <span>{currentLanguage?.code.toUpperCase()}</span>
        {isOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-32 bg-black border border-green-500 z-50">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={cn(
                  "flex items-center w-full px-3 py-1 text-left text-xs hover:bg-green-500/10 transition-colors",
                  {
                    "bg-green-500/20": lang.code === language,
                  },
                )}
                onClick={() => {
                  setLanguage(lang.code)
                  setIsOpen(false)
                }}
              >
                <span className="mr-2">{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
