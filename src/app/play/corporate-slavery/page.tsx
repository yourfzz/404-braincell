import type { Metadata } from "next";
import CorporateGenerator from "@/components/experiences/corporate-slavery/CorporateGenerator";

export const metadata: Metadata = {
  title: "Corporate Slavery | 404 Braincell",
  description:
    "Explore the dark humor of corporate life with our satirical experience. Discover the absurdities of office culture, from endless meetings to burnout executives, and laugh at the realities of modern work.",
};

export default function CorporateSlaveryPage() {
  return <CorporateGenerator />;
}
