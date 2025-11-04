import { TextDataSet } from "@/components/Data/TextData";
import { playSound } from "./Playsound.util";
import keyDownEventHandlerParameters from "@/Types/TypingTest.types";

export const changeTypeText = (
  letterIndexRef: React.MutableRefObject<number>,
  setTextContent: (textContent: string) => void,
  setVisibleIndex: (num: number) => void
) => {
  const idx = getRandomNumber();
  setTextContent(TextDataSet[idx].content);
  setVisibleIndex(-1);
  letterIndexRef.current = -1;
};

export const keyDownEventHandler = ({
  actions,
  context,
  events,
  refs,
}: keyDownEventHandlerParameters & { isMobile?: boolean }) => {
  const {
    setIsCapsLockEnabled,
    setKeyPressed,
    updateLetterIndex,
    updateWrongLetterIndex,
  } = actions;

  const { restrictedKeys, textContent } = context;
  const { e } = events;
  const { counterRef, letterIndexRef } = refs;

  // --- Detect event type ---
  const isMobileEvent = !(e as KeyboardEvent).getModifierState;
  const key = e.key;

  // --- Update Caps Lock only on desktop ---
  if (!isMobileEvent && (e as KeyboardEvent).getModifierState) {
    setIsCapsLockEnabled((e as KeyboardEvent).getModifierState("CapsLock"));
  }

  // --- Ignore restricted keys ---
  const isRestricted = restrictedKeys.some((ele) => ele === key);
  if (isRestricted) return;

  // --- Handle Backspace ---
  if (key === "Backspace") {
    const newIndex = Math.max(letterIndexRef.current - 1, -1);
    updateLetterIndex(newIndex);
    return;
  }

  // --- Main typing logic ---
  const nextIndex = letterIndexRef.current + 1;
  setKeyPressed(key);

  if (nextIndex < textContent.length) {
    if (key === textContent[nextIndex]) {
      if (letterIndexRef.current === -1) {
        counterRef.current?.callStartTimerFunction();
      }
      playSound("/assets/audios/type-sound.wav");
      updateLetterIndex(nextIndex);
      setKeyPressed(textContent[nextIndex + 1]);
    } else {
      updateWrongLetterIndex(nextIndex);
      setKeyPressed(key);
    }

    // Prevent default only for real keyboard events
    if (!isMobileEvent) e.preventDefault?.();
  }
};

export const getRandomNumber = () => {
  const len = TextDataSet.length || 10; // fallback
  return Math.floor(Math.random() * len);
};
