import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About | 404 Braincell",
  description:
    "The philosophy behind 404 Braincell: why the internet needs more playful nonsense and zero enterprise dashboards.",
};

export default function AboutPage() {
  return <AboutClient />;
}
