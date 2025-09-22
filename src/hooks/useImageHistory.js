import { useState, useEffect, useCallback } from 'react';

const HISTORY_KEY = 'toonly-ai-history';
const MAX_HISTORY_ITEMS = 20; // Limit to prevent localStorage bloat

export const useImageHistory = () => {
  const [history, setHistory] = useState([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(HISTORY_KEY);
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        setHistory(parsedHistory);
      }
    } catch (error) {
      console.error('Error loading history from localStorage:', error);
      // Clear corrupted data
      localStorage.removeItem(HISTORY_KEY);
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Error saving history to localStorage:', error);
      // If localStorage is full, try to clear old items
      if (error.name === 'QuotaExceededError') {
        clearOldestItems(5);
      }
    }
  }, [history]);

  const addToHistory = useCallback((item) => {
    const historyItem = {
      id: Date.now() + Math.random(), // Unique ID
      originalImage: item.originalImage,
      processedImage: item.processedImage,
      style: item.style,
      customPrompt: item.customPrompt,
      timestamp: new Date().toISOString(),
    };

    setHistory(prev => {
      // Remove duplicates and add new item at the beginning
      const filtered = prev.filter(h => 
        h.originalImage !== item.originalImage || 
        h.processedImage !== item.processedImage
      );
      const newHistory = [historyItem, ...filtered];
      
      // Limit history size
      return newHistory.slice(0, MAX_HISTORY_ITEMS);
    });
  }, []);

  const deleteHistoryItem = useCallback((id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  }, []);

  const clearAllHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  }, []);

  const clearOldestItems = useCallback((count) => {
    setHistory(prev => prev.slice(0, -count));
  }, []);

  const getHistoryStats = useCallback(() => {
    return {
      totalItems: history.length,
      oldestDate: history.length > 0 ? history[history.length - 1].timestamp : null,
      newestDate: history.length > 0 ? history[0].timestamp : null,
    };
  }, [history]);

  return {
    history,
    addToHistory,
    deleteHistoryItem,
    clearAllHistory,
    getHistoryStats,
  };
};