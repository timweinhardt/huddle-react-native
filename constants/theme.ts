/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

export const Colors = {
  background: "#F7F7F7",
  primary: "#DD0033",
  secondary: "#586771",
  accent: "#005174",
  border: "#E1E7EB",
  card: "#FFFFFF",
  success: "#00A166",
  warning: "#FFB123",
  error: "#A20025",
  info: "#00B4CB",
  textPrimary: "#2D2926",
  textSecondary: "#586771",
  textMuted: "#9AA5AC",
  textInverse: "#FFFFFF",
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const CustomFonts = {
  "Apercu-Regular": require("@/assets/fonts/Apercu-Regular.otf"),
  "Apercu-Medium": require("@/assets/fonts/Apercu-Medium.otf"),
  "Apercu-Bold": require("@/assets/fonts/Apercu-Bold.otf"),
};

export const Apercu = {
  regular: "Apercu-Regular",
  medium: "Apercu-Medium",
  bold: "Apercu-Bold",
};
