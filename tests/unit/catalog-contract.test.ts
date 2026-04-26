import { describe, expect, it } from "vitest";

import {
  CatalogCategoryListSchema,
  CatalogCollectionListSchema,
} from "@/features/catalog";

describe("catalog contracts", () => {
  it("parses normalized backend category payloads", () => {
    const payload = [
      {
        id: 1,
        name: "Gowns",
        title: "Gowns",
        slug: "gowns",
        image: null,
        image_url: "https://cdn.example/gowns.jpg",
        cloudinary_url: "https://cdn.example/gowns.jpg",
        active: true,
        created_at: "2026-04-26T00:00:00.000Z",
        updated_at: "2026-04-26T00:00:00.000Z",
      },
    ];

    expect(CatalogCategoryListSchema.parse(payload)[0]?.slug).toBe("gowns");
  });

  it("parses normalized backend collection payloads", () => {
    const payload = [
      {
        id: 1,
        name: "Wedding Edit",
        title: "Wedding Edit",
        slug: "wedding-edit",
        sub_title: "Ceremony pieces",
        description: "Curated occasion wear",
        image: null,
        image_url: "",
        cloudinary_url: null,
        background_image: null,
        background_image_url: "",
        background_cloudinary_url: null,
        created_at: "2026-04-26T00:00:00.000Z",
        updated_at: "2026-04-26T00:00:00.000Z",
      },
    ];

    expect(CatalogCollectionListSchema.parse(payload)[0]?.title).toBe("Wedding Edit");
  });
});
