import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Modal states
  isAuthModalOpen: false,
  isPricingModalOpen: false,
  isSubmitStyleModalOpen: false,
  isHistoryModalOpen: false,
  
  // UI states
  theme: 'dark',
  selectedStyle: 'ghibli',
  customPrompt: '',
  
  // Processing states
  isProcessing: false,
  isEditing: false,
  processingTimeMs: 0,
  
  // Notification states
  notifications: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // Modal actions
    setAuthModalOpen: (state, action) => {
      state.isAuthModalOpen = action.payload;
    },
    setPricingModalOpen: (state, action) => {
      state.isPricingModalOpen = action.payload;
    },
    setSubmitStyleModalOpen: (state, action) => {
      state.isSubmitStyleModalOpen = action.payload;
    },
    setHistoryModalOpen: (state, action) => {
      state.isHistoryModalOpen = action.payload;
    },
    
    // UI actions
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setSelectedStyle: (state, action) => {
      state.selectedStyle = action.payload;
    },
    setCustomPrompt: (state, action) => {
      state.customPrompt = action.payload;
    },
    
    // Processing actions
    setProcessing: (state, action) => {
      state.isProcessing = action.payload;
    },
    setEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    setProcessingTime: (state, action) => {
      state.processingTimeMs = action.payload;
    },
    
    // Notification actions
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    
    // Reset actions
    resetAppState: (state) => {
      state.isProcessing = false;
      state.isEditing = false;
      state.processingTimeMs = 0;
      state.customPrompt = '';
    },
  },
});

export const {
  setAuthModalOpen,
  setPricingModalOpen,
  setSubmitStyleModalOpen,
  setHistoryModalOpen,
  setTheme,
  setSelectedStyle,
  setCustomPrompt,
  setProcessing,
  setEditing,
  setProcessingTime,
  addNotification,
  removeNotification,
  clearNotifications,
  resetAppState,
} = appSlice.actions;

export default appSlice.reducer;