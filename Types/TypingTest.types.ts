import { CounterRef } from "@/components/Counter";
import { RestrictedKeyType } from "@/constants/RestrictedKeys.costants";
import { typingStatusType } from "@/constants/typing.constants";

interface eventsInterface {
  e: KeyboardEvent;
}

interface contextInterface {
  textContent: string;
  restrictedKeys: readonly RestrictedKeyType[];
  typingStatus: typingStatusType;
  wrongLetterIndex: number[];
}

interface refInterface {
  letterIndexRef: React.MutableRefObject<number>;
  counterRef: React.RefObject<CounterRef | null>;
}

interface actionInterface {
  setIsCapsLockEnabled: React.Dispatch<React.SetStateAction<boolean | null>>;
  updateLetterIndex: (value: number) => void;
  setKeyPressed: React.Dispatch<React.SetStateAction<string>>;
  setTypingStatus: React.Dispatch<React.SetStateAction<typingStatusType>>;
  updateWrongLetterIndex: (value: number) => void;
}

export default interface keyDownEventHandlerParameters {
  events: eventsInterface;
  context: contextInterface;
  refs: refInterface;
  actions: actionInterface;
}



