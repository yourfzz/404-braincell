import SecretRoomExperience from "@/components/experiences/SecretRoomExperience";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secret Lab | 404 Braincell",
  description:
    "A hidden corner of 404 Braincell where the most absurd and experimental web experiences are tested. Enter at your own risk.",
};

export default function SecretLabPage() {
  return <SecretRoomExperience />;
}
