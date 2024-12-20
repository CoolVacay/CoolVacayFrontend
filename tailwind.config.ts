import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { createThemes } from "tw-colors";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      fontSize: {
        heading: ["2rem", "2.343rem"],
        title: ["1.5rem", "1.75rem"],
        subtitle: ["1.125rem", "1.318rem"],
      },
    },
  },
  plugins: [
    createThemes({
      CoolVacay: {
        primary: {
          DEFAULT: "#29ABE2",
          background: "#06336C",
          border: "#084298",
          text: "#6EA8FE",
          primary100: "#D4FCFC",
          primary200: "#A9F3FC",
          primary300: "#7DE2F6",
          primary400: "#5BCCEE",
          primary500: "#29AAE1",
          primary600: "#1D85C2",
          primary700: "#0D4882",
          primary800: "#052C65",
          primary900: "#06336C",
          grey100: "#EAEAEF",
          grey200: "#F7F7F7",
          grey300: "#858C93",
          grey400: "#676D73",
        },
      },
      BayClub: {
        primary: {
          DEFAULT: "#FFC107", // A bright yellow
          background: "#664D00", // Darker yellow-brown
          border: "#805A00", // Slightly lighter brown-yellow
          text: "#FFECB3", // Light yellow for text
          primary100: "#FFF9E1", // Very light yellow
          primary200: "#FFF3C1", // Light yellow
          primary300: "#FFE08A", // Mid yellow
          primary400: "#FFD658", // Slightly darker yellow
          primary500: "#FFC107", // Bright yellow (similar to DEFAULT)
          primary600: "#E0A800", // Darker golden yellow
          primary700: "#B28700", // Deeper mustard yellow
          primary800: "#856500", // Dark brownish yellow
          primary900: "#664D00", // Darker brown-yellow (same as background)
          grey100: "#FAF9F6", // Very light beige-grey
          grey200: "#F5F5E9", // Light beige-grey
          grey300: "#A69F94", // Muted brown-grey
          grey400: "#7D7567", // Darker brownish-grey
        },
      },
      FloridaRent: {
        primary: {
          DEFAULT: "#FF7F50", // Vibrant coral
          background: "#FFF5E1", // Soft sandy beige
          border: "#FFA07A", // Light coral-peach
          text: "#FFEFD5", // Light peach for text
          primary100: "#FFF9E6", // Very light cream
          primary200: "#FFEBD2", // Pale peach
          primary300: "#FFD1B3", // Soft sandy peach
          primary400: "#FFB08F", // Warm sunlit peach
          primary500: "#FF7F50", // Bright coral (similar to DEFAULT)
          primary600: "#FF6347", // Deeper tropical coral-red
          primary700: "#E05A42", // Rich sunset coral
          primary800: "#C14E3B", // Darker earthy coral
          primary900: "#A04133", // Deep sunset orange
          grey100: "#FFF5DC", // Very light sandy cream
          grey200: "#FFE4B5", // Light golden sand
          grey300: "#FFD39B", // Warm sandy tan
          grey400: "#E3BA85", // Muted beach tan
        },
      },
      BeechGetaway: {
        primary: {
          DEFAULT: "#2E6A47", // Pine Green (deep, rich green with earthy undertones)
          background: "#F1F3EB", // Soft, pale cream (neutral and light)
          border: "#A0B68D", // Olive green (natural, subtle tone for borders)
          text: "#D9E2C7", // Soft pale green (subtle, light contrast for text)
          primary100: "#E4F1E2", // Very light mint green (fresh and airy)
          primary200: "#C1E0C3", // Light sage (soft and natural green)
          primary300: "#8FB68B", // Muted olive green (earthy, calming tone)
          primary400: "#6F9E71", // Moss green (deeper, forest-like green)
          primary500: "#2E6A47", // Pine Green (main color - vibrant and grounded)
          primary600: "#2A5D3E", // Forest Green (richer, deeper green)
          primary700: "#234F33", // Dark pine green (dark, almost emerald tone)
          primary800: "#1A3E2B", // Deep forest green (earthy and grounding)
          primary900: "#102B1B", // Charcoal pine (dark, almost blackened green)
          grey100: "#F4F4F1", // Off-white (warm, light neutral)
          grey200: "#D0D0C6", // Light stone gray (soft, muted)
          grey300: "#B4B4A1", // Light olive gray (earthy undertones)
          grey400: "#8E8E77", // Olive gray (deep, muted greenish gray)
        },
      },
    }),
  ],
} satisfies Config;
