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

  // System keys
  "Tab",
  "Enter",
  "Escape",
  "Delete",
  "Insert",
  "ContextMenu", // Right-click key

  // Lock keys
  "NumLock",
  "ScrollLock",
  "Pause",
  "PrintScreen",

  // Function keys (F1–F12)
  "F1",
  "F2",
  "F3",
  "F4",
  "F5",
  "F6",
  "F7",
  "F8",
  "F9",
  "F10",
  "F11",
  "F12",
] as const;

export type RestrictedKeyType = (typeof restrictedKeysData)[number];
