export type Theme = {
  name: string;
  colors: {
    primary: string;
    primaryDark: string;
    secondary: string;
    background: string;
    surface: string;
    muted: string;
    border: string;
    success: string;
    danger: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  radii: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
};

export const urbanArcTheme: Theme = {
  name: "UrbanArc Default",
  colors: {
    primary: "#FF4D4D",
    primaryDark: "#D93737",
    secondary: "#1F2933",
    background: "#050608",
    surface: "#111827",
    muted: "#6B7280",
    border: "#272C35",
    success: "#22C55E",
    danger: "#EF4444"
  },
  fonts: {
    heading:
      '"Poppins", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    body:
      '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  radii: {
    sm: "4px",
    md: "8px",
    lg: "16px",
    xl: "24px"
  }
};
