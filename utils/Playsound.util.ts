export const playSound = (soundSrc: string, volume: number = 0.019) => {
  const sound = new Audio(soundSrc);
  sound.volume = Math.max(0, Math.min(volume, 1));
  sound.play().catch((err) => {
    console.error("Failed to play sound:", err);
  });
};
