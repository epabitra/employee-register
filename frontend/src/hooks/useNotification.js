import { useState, useCallback, useRef } from 'react';

const AUTO_DISMISS_MS = 3000;

export const useNotification = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const timerRef = useRef(null);

  const clearMessages = useCallback(() => {
    setSuccessMessage('');
    setErrorMessage('');
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const showSuccess = useCallback((message) => {
    setSuccessMessage(message);
    setErrorMessage('');
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setSuccessMessage(''), AUTO_DISMISS_MS);
  }, []);

  const showError = useCallback((message) => {
    setErrorMessage(message);
    setSuccessMessage('');
  }, []);

  return { successMessage, errorMessage, showSuccess, showError, clearMessages };
};
