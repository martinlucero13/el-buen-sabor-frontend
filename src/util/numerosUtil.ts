import { KeyboardEvent } from 'react';

export const validateNumericInput = (event: KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    const inputKey = event.key;
  
    const isAllowedKey = allowedKeys.includes(inputKey) || inputKey === 'Backspace';
    const isNumericChar = /\d/.test(inputKey);
  
    if (!isAllowedKey && !isNumericChar) {
      event.preventDefault();
    }
};