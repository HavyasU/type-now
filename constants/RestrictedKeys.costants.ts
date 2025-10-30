/**
 * Keys that should be ignored during typing input.
 * Includes modifiers, navigation, system, media, and OS-specific keys.
 */

export const restrictedKeysData = [
  // Modifier keys
  "Alt",
  "Control",
  "Shift",
  "Meta", // ⌘ on Mac / Windows key on Windows
  "CapsLock",
  "Fn",
  "FnLock",
  "Hyper",
  "Super",

  // Navigation keys
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Home",
  "End",
  "PageUp",
  "PageDown",

  // System and control keys
  "Tab",
  "Enter",
  "Escape",
  "Delete",
  "Backspace",
  "Insert",
  "ContextMenu",
  "Help",
  "Clear",

  // Lock keys
  "NumLock",
  "ScrollLock",
  "Pause",
  "PrintScreen",

  // Function keys (F1–F24)
  ...Array.from({ length: 24 }, (_, i) => `F${i + 1}`),

  // Media keys
  "AudioVolumeDown",
  "AudioVolumeUp",
  "AudioVolumeMute",
  "MediaPlayPause",
  "MediaTrackNext",
  "MediaTrackPrevious",
  "LaunchMail",
  "LaunchMediaPlayer",
  "LaunchApplication1",
  "LaunchApplication2",

  // Browser keys
  "BrowserBack",
  "BrowserForward",
  "BrowserRefresh",
  "BrowserStop",
  "BrowserSearch",
  "BrowserFavorites",
  "BrowserHome",

  // IME (Input Method Editor) keys — often found in international keyboards
  "Convert",
  "NonConvert",
  "Accept",
  "ModeChange",
  "Process",
  "JunjaMode",
  "FinalMode",
  "HanjaMode",
  "KanjiMode",
  "HangulMode",
  "Hiragana",
  "Katakana",
  "RomanCharacters",

  // Other OS or special keys
  "Power",
  "Sleep",
  "WakeUp",
  "Print",
  "Attn",
  "CrSel",
  "ExSel",
  "EraseEof",
  "Zoom",
  "Play",
  "Pause", // kept for redundancy / media overlap
  "Select",
  "Undo",
  "Redo",
] as const;

/** Strong type definition for restricted keys */
export type RestrictedKeyType = (typeof restrictedKeysData)[number];

/** For fast O(1) runtime lookup */
export const restrictedKeysSet: ReadonlySet<RestrictedKeyType> = new Set(
  restrictedKeysData,
);
