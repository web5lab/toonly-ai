import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Image data (not persisted)
  selectedFile: null,
  originalImageUrl: null,
  processedImageUrl: null,
  
  // Image processing state
  isUploading: false,
  uploadProgress: 0,
  
  // History (handled by useImageHistory hook)
  // We keep this in localStorage via the hook, not Redux
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setSelectedFile: (state, action) => {
      state.selectedFile = action.payload;
    },
    setOriginalImageUrl: (state, action) => {
      state.originalImageUrl = action.payload;
    },
    setProcessedImageUrl: (state, action) => {
      state.processedImageUrl = action.payload;
    },
    setUploading: (state, action) => {
      state.isUploading = action.payload;
    },
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    clearImages: (state) => {
      state.selectedFile = null;
      state.originalImageUrl = null;
      state.processedImageUrl = null;
      state.isUploading = false;
      state.uploadProgress = 0;
    },
  },
});

export const {
  setSelectedFile,
  setOriginalImageUrl,
  setProcessedImageUrl,
  setUploading,
  setUploadProgress,
  clearImages,
} = imageSlice.actions;

export default imageSlice.reducer;