import { create } from 'zustand';
import { ToastMessage } from '../types';

interface UIState {
  // Loading states
  globalLoading: boolean;
  loadingStates: Record<string, boolean>;

  // Toast messages
  toasts: ToastMessage[];

  // Modal states
  modals: Record<string, boolean>;

  // Actions
  setGlobalLoading: (loading: boolean) => void;
  setLoading: (key: string, loading: boolean) => void;
  isLoading: (key: string) => boolean;

  // Toast actions
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;

  // Modal actions
  openModal: (key: string) => void;
  closeModal: (key: string) => void;
  isModalOpen: (key: string) => boolean;
}

export const useUIStore = create<UIState>((set, get) => ({
  // Initial state
  globalLoading: false,
  loadingStates: {},
  toasts: [],
  modals: {},

  // Loading actions
  setGlobalLoading: (globalLoading: boolean) => {
    set({ globalLoading });
  },

  setLoading: (key: string, loading: boolean) => {
    set((state) => ({
      loadingStates: {
        ...state.loadingStates,
        [key]: loading,
      },
    }));
  },

  isLoading: (key: string) => {
    return get().loadingStates[key] || false;
  },

  // Toast actions
  addToast: (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastMessage = {
      ...toast,
      id,
      duration: toast.duration || 5000,
    };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    // Auto remove toast after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        get().removeToast(id);
      }, newToast.duration);
    }
  },

  removeToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },

  clearToasts: () => {
    set({ toasts: [] });
  },

  // Modal actions
  openModal: (key: string) => {
    set((state) => ({
      modals: {
        ...state.modals,
        [key]: true,
      },
    }));
  },

  closeModal: (key: string) => {
    set((state) => ({
      modals: {
        ...state.modals,
        [key]: false,
      },
    }));
  },

  isModalOpen: (key: string) => {
    return get().modals[key] || false;
  },
}));

// Hooks utilitários
export const useLoading = (key?: string) => {
  const store = useUIStore();
  
  if (key) {
    return {
      isLoading: store.isLoading(key),
      setLoading: (loading: boolean) => store.setLoading(key, loading),
    };
  }

  return {
    globalLoading: store.globalLoading,
    setGlobalLoading: store.setGlobalLoading,
  };
};

export const useToast = () => {
  const store = useUIStore();
  
  return {
    toasts: store.toasts,
    addToast: store.addToast,
    removeToast: store.removeToast,
    clearToasts: store.clearToasts,
    success: (title: string, message?: string) =>
      store.addToast({ type: 'success', title, message }),
    error: (title: string, message?: string) =>
      store.addToast({ type: 'error', title, message }),
    warning: (title: string, message?: string) =>
      store.addToast({ type: 'warning', title, message }),
    info: (title: string, message?: string) =>
      store.addToast({ type: 'info', title, message }),
  };
};

export const useModal = (key: string) => {
  const store = useUIStore();
  
  return {
    isOpen: store.isModalOpen(key),
    open: () => store.openModal(key),
    close: () => store.closeModal(key),
  };
};
