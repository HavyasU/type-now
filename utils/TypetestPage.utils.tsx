// utils/TypetestPage.utils.ts
import { TextDataSet } from "@/components/Data/TextData";
import { playSound } from "./Playsound.util";
import type  keyDownEventHandlerParameters  from "@/Types/TypingTest.types";

// --- Helper: Safe random index ---
export const getRandomNumber = () => {
  return Math.floor(Math.random() * (TextDataSet.length || 10));
};

// --- Change text ---
export const changeTypeText = (
  letterIndexRef: React.MutableRefObject<number>,
  setTextContent: (text: string) => void,
  setVisibleIndex: (num: number) => void,
  clearWrongLetterIndex:()=>void
) => {
  const idx = getRandomNumber();
  setTextContent(TextDataSet[idx].content);
  setVisibleIndex(-1);
  letterIndexRef.current = -1;
  clearWrongLetterIndex();
};

// --- Main Key Handler ---
export const keyDownEventHandler = ({
  actions,
  context,
  events,
  refs,
  isMobile = false,
}: keyDownEventHandlerParameters & { isMobile?: boolean }) => {
  const {
    setIsCapsLockEnabled,
    setKeyPressed,
    updateLetterIndex,
    updateWrongLetterIndex,
    setTypingStatus,
  } = actions;

  const { restrictedKeys, textContent, typingStatus, wrongLetterIndex } = context;
  const { e } = events;
  const { counterRef, letterIndexRef } = refs;

  const key = e.key;

  // --- 1. Caps Lock (Desktop only) ---
  if (!isMobile && "getModifierState" in e) {
    setIsCapsLockEnabled(e.getModifierState("CapsLock"));
  }

  // --- 2. Ignore restricted keys ---
  if (restrictedKeys.includes(key)) return;

  // --- 3. Handle Backspace ---
  if (key === "Backspace") {
    const currentIdx = letterIndexRef.current;
    if (currentIdx >= 0) {
      const newIndex = currentIdx - 1;

      // Remove from wrong letters if it was marked wrong
      if (wrongLetterIndex.includes(currentIdx)) {
        updateWrongLetterIndex(-1); // We'll filter it out in context
        // Note: You may want to filter wrongLetterIndex in context
      }

      updateLetterIndex(newIndex);
    }
    if (!isMobile) e.preventDefault();
    return;
  }

  // --- 4. Ignore non-character keys ---
  if (key.length > 1 && key !== " ") return;

  // --- 5. Main Typing Logic ---
  const currentIdx = letterIndexRef.current;
  const nextIdx = currentIdx + 1;

  // Don't type beyond text length
  if (nextIdx >= textContent.length) return;

  const expectedChar = textContent[nextIdx];
  const isCorrect = key === expectedChar;

  // --- Start timer on first correct key ---
  if (currentIdx === -1 && isCorrect && typingStatus === "no-started") {
    counterRef.current?.callStartTimerFunction();
    setTypingStatus("started");
    playSound("/assets/audios/type-sound.wav");
  }

  // --- Play sound only on correct keys (optional: throttle) ---
  if (isCorrect) {
    playSound("/assets/audios/type-sound.wav");
  }

  // --- Update index and wrong letters ---
  if (isCorrect) {
    updateLetterIndex(nextIdx);
  } else {
    // Only mark as wrong if not already wrong
    if (!wrongLetterIndex.includes(nextIdx)) {
      updateWrongLetterIndex(nextIdx);
    }
    updateLetterIndex(nextIdx)
  }

  // --- Show feedback: pressed vs expected ---
  setKeyPressed(key);

  // --- Prevent default scrolling, etc. (desktop only) ---
  if (!isMobile) {
    e.preventDefault();
  }
};