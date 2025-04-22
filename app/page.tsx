"use client"

import { useEffect, useState } from "react"
import { Mail, Phone, RefreshCw } from "lucide-react"
import { cn } from "./lib/utils"
import { LanguageProvider, useLanguage } from "./contexts/language-context"
import LanguageSelector from "./components/language-selector"

function MaintenanceContent() {
  const { t } = useLanguage()
  const [blinkCursor, setBlinkCursor] = useState(true)
  const [loadingText, setLoadingText] = useState("")
  const loadingMessages = t("loadingMessages") as string[]

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setBlinkCursor((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  // Typewriter effect for loading messages
  useEffect(() => {
    let currentMessageIndex = 0
    let currentCharIndex = 0
    let isDeleting = false
    let typingSpeed = 100

    const typeNextCharacter = () => {
      const currentMessage = loadingMessages[currentMessageIndex]

      if (isDeleting) {
        setLoadingText((current) => current.substring(0, current.length - 1))
        if (loadingText === "") {
          isDeleting = false
          currentMessageIndex = (currentMessageIndex + 1) % loadingMessages.length
          typingSpeed = 500 // Pause before typing next message
        } else {
          typingSpeed = 50
        }
      } else {
        setLoadingText(currentMessage.substring(0, currentCharIndex + 1))
        currentCharIndex++

        if (currentCharIndex >= currentMessage.length) {
          isDeleting = true
          typingSpeed = 2000 // Pause before deleting
          currentCharIndex = 0
        } else {
          typingSpeed = 100
        }
      }
    }

    const typingInterval = setInterval(typeNextCharacter, typingSpeed)
    return () => clearInterval(typingInterval)
  }, [loadingText, loadingMessages])

  return (
    <div className="min-h-dvh bg-black text-green-500 font-mono flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Scanlines effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20" />

      {/* CRT vignette effect */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent to-black opacity-50" />

      <div className="w-full max-w-2xl border border-green-500 p-6 md:p-8 rounded-md bg-black/80 relative z-10 shadow-[0_0_15px_rgba(0,255,0,0.3)]">
        <div className="flex items-center mb-6 border-b border-green-500 pb-2">
          <div className="flex gap-2 mr-auto">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-xs uppercase tracking-widest mr-4">{t("systemStatus")}</div>
          <LanguageSelector />
        </div>

        <div className="mb-8">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 tracking-tight uppercase">&gt; {t("systemOffline")}</h1>
          <div className="flex items-center text-sm md:text-base mb-6">
            <span className="mr-2">&gt;</span>
            <span>{loadingText}</span>
            <span
              className={cn("ml-1 inline-block w-3 h-5 bg-green-500", {
                "opacity-0": !blinkCursor,
              })}
            />
          </div>

          <div className="border border-green-500 p-4 mb-6">
            <h2 className="text-xl mb-4 flex items-center">
              <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
              {t("maintenanceInProgress")}
            </h2>
            <p className="mb-4 text-sm md:text-base leading-relaxed">{t("maintenanceDescription")}</p>
            <p className="text-sm md:text-base leading-relaxed">
              {t("expectedCompletion")} <span className="underline">{t("soon")}</span>
            </p>
          </div>
        </div>

        <div className="border border-green-500 p-4">
          <h2 className="text-xl mb-4">&gt; {t("contactInformation")}</h2>
          <div className="space-y-3 text-sm md:text-base">
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-3" />
              <span className="mr-2">{t("email")}</span>
              <a href="mailto:support@example.com" className="underline hover:text-green-400 transition-colors">
                breyardirin@gmail.com
              </a>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-3" />
              <span className="mr-2">{t("phone")}</span>
              <a href="tel:+15551234567" className="underline hover:text-green-400 transition-colors">
                +221 (77) xxx-xx-xx
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-xs">
          <p className="animate-pulse">{t("pressAnyKey")}</p>
        </div>
      </div>

      <div className="mt-6 text-xs text-green-700">
        © {new Date().getFullYear()} • {t("systemVersion")}
      </div>
    </div>
  )
}

export default function MaintenancePage() {
  return (
    <LanguageProvider>
      <MaintenanceContent />
    </LanguageProvider>
  )
}
