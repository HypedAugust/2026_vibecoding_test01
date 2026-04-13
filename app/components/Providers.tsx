"use client";
import { LanguageProvider } from "../context/LanguageContext";
import LanguageToggle from "./LanguageToggle";
import Footer from "./Footer";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <LanguageToggle />
      {children}
      <Footer />
    </LanguageProvider>
  );
}
