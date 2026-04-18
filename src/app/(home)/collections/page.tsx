import LatestCollection from "@/components/ui/compounds/LatestCollection";

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div className="bg-background">
      <LatestCollection searchParams={searchParams} />
    </div>
  );
}
