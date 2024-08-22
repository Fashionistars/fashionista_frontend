// export default function Layout({
//   children,
//   client,
//   vendor,
// }: {
//   children: React.ReactNode;
//   client: React.ReactNode;
//   vendor: React.ReactNode;
// }) {
//   return (
//     <>
//       {children}
//       <div className="flex ">
//         {client}
//         {vendor}
//       </div>
//     </>
//   );
// }
import { checkUserRole } from "../utils/lib";

export default function Layout({
  client,
  vendor,
}: {
  client: React.ReactNode;
  vendor: React.ReactNode;
}) {
  const role = checkUserRole();
  return <>{role === "vendor" ? vendor : client}</>;
}
