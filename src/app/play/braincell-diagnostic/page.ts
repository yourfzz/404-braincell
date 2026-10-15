import type { Metadata } from "next";
import { createElement } from "react";
import BraincellDiagnostic from "@/components/experiences/braincell-diagnostic/BraincellDiagnostic";

export const metadata: Metadata = {
  title: "Braincell Diagnostic | 404 Braincell",
  description:
    "Discover your unique braincell profile with our interactive diagnostic tool. Uncover the quirks and characteristics that make you distinctly you.",
};

export default function BraincellDiagnosticPage() {
  return createElement(BraincellDiagnostic);
}
