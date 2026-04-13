"use client";
import { LanguageProvider } from "../context/LanguageContext";
import LanguageToggle from "./LanguageToggle";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <LanguageToggle />
      {children}
    </LanguageProvider>
  );
}
