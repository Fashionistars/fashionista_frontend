import { redirect } from "next/navigation";

export default function ClientSettingsRedirectPage() {
  redirect("/client/dashboard/account-details");
}
