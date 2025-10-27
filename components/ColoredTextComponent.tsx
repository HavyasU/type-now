"use client";

export function getColoredText(
  TextContent: string,
  visibleIndex: number,
  letterIndexRef: React.MutableRefObject<number>,
): React.ReactNode {
  // Ensure this code only runs after the component is mounted (client-side)
  //   const isClient =
  //     typeof window !== "undefined" && letterIndexRef.current !== undefined;

  return TextContent.split("").map((letter, index) => {
    const isTyped = index <= visibleIndex;

    // Cursor logic — only activate cursor highlight on the client
    const showCursor =
      index === visibleIndex + 1 ||
      (letterIndexRef.current === -1 && index === 0);

    return (
      <span
        key={index}
        className={[
          isTyped ? "text-white bg-stone-600" : "",
          showCursor ? "cursor" : "",
        ]
          .filter(Boolean)
          .join(" ")}>
        {letter}
      </span>
    );
  });
}
