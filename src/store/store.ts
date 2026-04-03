import { create } from 'zustand';

interface AppState {
   isMobileMenuOpen: boolean;
   toggleMobileMenu: () => void;
   activeOverlay: string | null;
   setActiveOverlay: (overlayId: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
   isMobileMenuOpen: false,
   toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
   activeOverlay: null,
   setActiveOverlay: (id) => set({ activeOverlay: id }),
}));
