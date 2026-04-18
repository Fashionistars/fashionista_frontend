import Image from "next/image";
import Link from "next/link";
interface CategoryProp {
  id: number;
  image: string;
  title: string;
}
const ShopByCategory = async () => {
  // Mock categories for development
  const mockCategories: CategoryProp[] = [
    { id: 1, image: "/minimalist.svg", title: "Minimalist" },
    { id: 2, image: "/gown.svg", title: "Gowns" },
    { id: 3, image: "/vintage.svg", title: "Vintage" },
  ];

  const getCategories = async () => {
    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const categoryList = await fetch(`${backendUrl}/api/v1/categories/`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!categoryList.ok) return mockCategories;
      const data = await categoryList.json();
      return ((data.results || data) as CategoryProp[]) || [];
    } catch {
      // Backend offline — show mock data silently
      return mockCategories;
    }
  };

  const data = (await getCategories()) || mockCategories;

  const list = data.map((item) => (
    <div
      key={item.id}
      style={{ boxShadow: "0px 4px 20px 0px #0000000D" }}
      className="w-[32%] md:w-[30%] lg:w-[25%] max-w-[250px] bg-white h-[157px] md:h-[262px] py-6 md:px-10 flex flex-col justify-between items-center border border-[#D9D9D9] rounded-[10px]"
    >
      {" "}
      <Image
        src={item.image}
        alt=""
        width={100}
        height={100}
        className="md:w-[150px] md:h-[150px] w-[55px] h-[55px] object-cover"
      />
      <p className="text-center px-5 text-[15px] leading-[17.6px] md:text-xl font-raleway text-black">
        {item.title}
      </p>
    </div>
  ));
  return (
    <div className="px-5 py-10 md:p-10 lg:p-20 space-y-5 md:space-y-10">
      <h2 className="font-bon_foyage text-[30px] text-center md:text-left md:text-5xl text-[#333333]">
        Shop by Category
      </h2>
      <div className="flex items-center flex-wrap gap-y-2 md:gap-3 lg:gap-5 justify-between">
        {list}
      </div>
      <div className="flex items-center justify-center">
        <Link
          href="/categories"
          className="px-10 py-5 rounded-[100px] bg-[#01454A] flex text-white font-raleway font-semibold text-xl"
        >
          More Categories
        </Link>
      </div>
    </div>
  );
};

export default ShopByCategory;
