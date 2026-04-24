import type { Metadata } from "next";
import { ClientSettingsView } from "@/features/client/components/client-settings-view";

export const metadata: Metadata = {
  title: "Settings — Client Dashboard | Fashionistar",
  description: "Manage your profile, security, wallet PIN, measurements, and appearance settings.",
};

export default function ClientSettingsPage() {
  return <ClientSettingsView />;
}
