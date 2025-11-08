import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AppState {
  theme: "light" | "dark" | "system"
  language: "ja" | "en"
}

interface AppActions {
  setTheme: (theme: AppState["theme"]) => void
  setLanguage: (language: AppState["language"]) => void
}

type AppStore = AppState & AppActions

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      // State
      theme: "system",
      language: "ja",

      // Actions
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "elsia_app_settings",
    }
  )
)

// Selectors
export const useTheme = () => useAppStore((state) => state.theme)
export const useLanguage = () => useAppStore((state) => state.language)
