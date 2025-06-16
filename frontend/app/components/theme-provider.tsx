"use client"

import React from "react";

type Theme = "light" | "dark" | "system";

interface ThemeProviderProps {
  attribute: string;
  defaultTheme: Theme;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  children?: React.ReactNode;
}

export function ThemeProvider({
  attribute,
  defaultTheme,
  enableSystem = true,
  disableTransitionOnChange = false,
  ...props
}: ThemeProviderProps) {
  const storageKey = "theme";
  const [theme, setTheme] = React.useState<Theme>(defaultTheme);

  React.useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute(attribute, theme);
  }, [theme, attribute]);

  return <>{props.children}</>;
}
