"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "es" | "fr" | "de" | "jp"

type Translations = {
  [key in Language]: {
    systemStatus: string
    systemOffline: string
    maintenanceInProgress: string
    maintenanceDescription: string
    expectedCompletion: string
    soon: string
    contactInformation: string
    email: string
    phone: string
    pressAnyKey: string
    systemVersion: string
    loadingMessages: string[]
  }
}

const translations: Translations = {
  en: {
    systemStatus: "System Status",
    systemOffline: "SYSTEM OFFLINE",
    maintenanceInProgress: "MAINTENANCE IN PROGRESS",
    maintenanceDescription:
      "Our system is currently undergoing scheduled maintenance to improve performance and reliability. We apologize for any inconvenience this may cause.",
    expectedCompletion: "Expected completion:",
    soon: "SOON",
    contactInformation: "CONTACT INFORMATION:",
    email: "EMAIL:",
    phone: "PHONE:",
    pressAnyKey: "[Press any key to continue...]",
    systemVersion: "SYSTEM VERSION 1.0.2",
    loadingMessages: [
      "Initializing system...",
      "Checking disk space...",
      "Running diagnostics...",
      "Defragmenting memory...",
      "Optimizing database...",
    ],
  },
  es: {
    systemStatus: "Estado del Sistema",
    systemOffline: "SISTEMA FUERA DE LÍNEA",
    maintenanceInProgress: "MANTENIMIENTO EN PROGRESO",
    maintenanceDescription:
      "Nuestro sistema está actualmente en mantenimiento programado para mejorar el rendimiento y la fiabilidad. Pedimos disculpas por cualquier inconveniente que esto pueda causar.",
    expectedCompletion: "Finalización esperada:",
    soon: "PRONTO",
    contactInformation: "INFORMACIÓN DE CONTACTO:",
    email: "CORREO:",
    phone: "TELÉFONO:",
    pressAnyKey: "[Presione cualquier tecla para continuar...]",
    systemVersion: "VERSIÓN DEL SISTEMA 1.0.2",
    loadingMessages: [
      "Inicializando sistema...",
      "Comprobando espacio en disco...",
      "Ejecutando diagnósticos...",
      "Desfragmentando memoria...",
      "Optimizando base de datos...",
    ],
  },
  fr: {
    systemStatus: "État du Système",
    systemOffline: "SYSTÈME HORS LIGNE",
    maintenanceInProgress: "MAINTENANCE EN COURS",
    maintenanceDescription:
      "Notre système est actuellement en maintenance programmée pour améliorer les performances et la fiabilité. Nous nous excusons pour tout inconvénient que cela pourrait causer.",
    expectedCompletion: "Achèvement prévu:",
    soon: "BIENTÔT",
    contactInformation: "INFORMATIONS DE CONTACT:",
    email: "EMAIL:",
    phone: "TÉLÉPHONE:",
    pressAnyKey: "[Appuyez sur n'importe quelle touche pour continuer...]",
    systemVersion: "VERSION DU SYSTÈME 1.0.2",
    loadingMessages: [
      "Initialisation du système...",
      "Vérification de l'espace disque...",
      "Exécution des diagnostics...",
      "Défragmentation de la mémoire...",
      "Optimisation de la base de données...",
    ],
  },
  de: {
    systemStatus: "Systemstatus",
    systemOffline: "SYSTEM OFFLINE",
    maintenanceInProgress: "WARTUNG IM GANGE",
    maintenanceDescription:
      "Unser System wird derzeit einer geplanten Wartung unterzogen, um die Leistung und Zuverlässigkeit zu verbessern. Wir entschuldigen uns für eventuelle Unannehmlichkeiten.",
    expectedCompletion: "Voraussichtliche Fertigstellung:",
    soon: "BALD",
    contactInformation: "KONTAKTINFORMATIONEN:",
    email: "E-MAIL:",
    phone: "TELEFON:",
    pressAnyKey: "[Drücken Sie eine beliebige Taste, um fortzufahren...]",
    systemVersion: "SYSTEMVERSION 1.0.2",
    loadingMessages: [
      "System wird initialisiert...",
      "Festplattenplatz wird überprüft...",
      "Diagnose wird ausgeführt...",
      "Speicher wird defragmentiert...",
      "Datenbank wird optimiert...",
    ],
  },
  jp: {
    systemStatus: "システム状態",
    systemOffline: "システムオフライン",
    maintenanceInProgress: "メンテナンス進行中",
    maintenanceDescription:
      "現在、システムはパフォーマンスと信頼性を向上させるために定期メンテナンスを実施しています。ご不便をおかけして申し訳ありません。",
    expectedCompletion: "完了予定:",
    soon: "まもなく",
    contactInformation: "連絡先情報:",
    email: "メール:",
    phone: "電話:",
    pressAnyKey: "[続行するには任意のキーを押してください...]",
    systemVersion: "システムバージョン 1.0.2",
    loadingMessages: [
      "システム初期化中...",
      "ディスク容量確認中...",
      "診断実行中...",
      "メモリデフラグ中...",
      "データベース最適化中...",
    ],
  },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: keyof Translations[Language]) => string | string[]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load language preference from localStorage if available
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const t = (key: keyof Translations[Language]) => {
    return translations[language][key]
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
