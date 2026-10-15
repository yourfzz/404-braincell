import type { Metadata } from "next";
import MuseumOfUnsentThings from "@/components/experiences/museum-of-unsent-things/MuseumOfUnsentThings";

export const metadata: Metadata = {
  title: "Museum of Unsent Things | 404 Braincell",
  description:
    "Explore the Museum of Unsent Things, a unique experience that delves into the world of unsent messages, forgotten letters, and unspoken words. Discover the stories behind these unsent communications and reflect on the emotions they carry.",
};

export default function MuseumOfUnsentThingsPage() {
  return <MuseumOfUnsentThings />;
}
