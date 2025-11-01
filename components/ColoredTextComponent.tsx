"use client";

import clsx from "clsx";

interface GetColoredTextProps {
  textContent: string;
  visibleIndex: number;
  letterIndexRef: React.MutableRefObject<number>;
}
const GetColoredText = ({
  textContent,
  visibleIndex,
}: GetColoredTextProps) => {
  // Ensure this code only runs after the component is mounted (client-side)
  //   const isClient =
  //     typeof window !== "undefined" && letterIndexRef.current !== undefined;
  // const letterIndex = useMemo(
  //   () => letterIndexRef.current,
  //   [letterIndexRef.current],
  // );
  return (
    <>
      {textContent.split("").map((letter, index) => {
        const isTyped = index <= visibleIndex;

        // Cursor logic — only activate cursor highlight on the client
        const showCursor =
          index === visibleIndex + 1 || (visibleIndex === -1 && index === 0);

        return (
          <span
            key={index}
            className={clsx(
              "transition-colors duration-150",
              isTyped ? "text-white bg-stone-700" : "",
              showCursor ? "cursor" : "",
            )}>
            {letter}
          </span>
        );
      })}
    </>
  );
};

export default GetColoredText;
