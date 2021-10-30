import { useCallback, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

interface UseKeyboard {
  keyboardIsOpen: boolean;
  keyboardHeight: number;
}

export function useKeyboard(didHide = () => {}, didOpen = () => {}): UseKeyboard {
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const _keyboardDidShow = useCallback(
    (e) => {
      didOpen();
      setKeyboardIsOpen(true);
      setKeyboardHeight(e.endCoordinates.height);
    },
    [didOpen],
  );

  const _keyboardDidHide = useCallback(() => {
    didHide();
    setKeyboardIsOpen(false);
    setKeyboardHeight(0);
  }, [didHide]);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, [_keyboardDidHide, _keyboardDidShow]);

  return { keyboardIsOpen, keyboardHeight };
}
