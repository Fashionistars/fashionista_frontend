import { checkUserRole } from "../utils/lib";

export default async function Layout({
  client,
  vendor,
}: {
  client: React.ReactNode;
  vendor: React.ReactNode;
}) {
  const role = await checkUserRole();

  return <>{role == "Vendor" ? vendor : client}</>;
}
