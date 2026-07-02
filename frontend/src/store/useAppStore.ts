import { create } from 'zustand'

interface AppState {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  activeContext: string | null
  setActiveContext: (contextId: string | null) => void
  isCommandOpen: boolean
  setCommandOpen: (open: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'light', // Default to light mode (Frosted Green)
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light'
    // Also apply to document class for Tailwind dark mode
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    return { theme: newTheme }
  }),
  activeContext: null,
  setActiveContext: (contextId) => set({ activeContext: contextId }),
  isCommandOpen: false,
  setCommandOpen: (open) => set({ isCommandOpen: open }),
}))
