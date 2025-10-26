import { TextDataSet } from "@/components/Data/TextData";

export const changeTypeText = (
  letterIndexRef: React.MutableRefObject<number>,
  setTextContent: (textContent: string) => void,
  setVisibleIndex: (num: number) => void
) => {
  setTextContent(TextDataSet[Math.floor(Math.random() * 10)].content);
  setVisibleIndex(-1);
  letterIndexRef.current = -1;
};

export function getColoredText(
  TextContent: string,
  visibleIndex: number,
  letterIndexRef: React.MutableRefObject<number>
): React.ReactNode {
  return TextContent.split("").map((letter, index) => {
    const isTypped = index <= visibleIndex;
    return (
      <span
        className={`
      ${isTypped ? "text-white bg-stone-600" : ""} 
      ${
        index === visibleIndex + 1 ||
        (letterIndexRef.current == -1 && index === 0)
          ? "cursor"
          : ""
      }
    `}
        key={index}
      >
        {letter}
      </span>
    );
  });
}
