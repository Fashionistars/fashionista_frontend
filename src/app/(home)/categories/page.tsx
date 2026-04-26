import { CatalogCategoryGrid } from "@/features/catalog";

export default function CategoriesPage() {
  return (
    <div className="bg-background">
      <CatalogCategoryGrid showCta={false} />
    </div>
  );
}
