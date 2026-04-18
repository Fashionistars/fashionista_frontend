import Link from "next/link";

/**
 * Wishlist Page
 *
 * FIX: Removed the axios.get("http://localhost:3000/wishlist") self-call
 * that was causing a recursive loop (server component calling itself = infinite hang).
 * Wishlist data will be loaded client-side via TanStack Query once the API endpoint
 * exists. For now renders a clean placeholder that does NOT hang.
 */
const WishlistPage = () => {
  // TODO: Replace with real API call via TanStack Query (client component)
  // const { data: wishlist } = useQuery({ queryKey: ['wishlist'], queryFn: fetchWishlist })
  const wishlist: Array<{ id: string; title: string; price: string; status: string }> = [];

  return (
    <div className="py-10 px-5 md:px-24 space-y-5">
      <div className="flex items-center justify-between">
        <div className="font-raleway font-medium text-[#475367]">
          <Link href="/" className="hover:text-[#fda600] transition-colors">Home</Link>
          {" "}&gt;{" "}
          <span className="text-[#fda600]">Wishlist</span>
        </div>
        <Link
          href="/get-measured"
          className="w-[9rem] h-[2.7rem] rounded-[100px] flex justify-center items-center bg-[#01454A] text-white text-[15px] leading-[17px] font-semibold font-raleway"
        >
          Get Measured
        </Link>
      </div>

      <div>
        <h2 className="font-raleway font-bold text-[2rem] leading-[43px] text-black flex items-center gap-2">
          Your Wishlist
          <span className="py-1.5 px-3 rounded-[40px] text-white bg-[#F56630] font-bold text-lg">
            {wishlist.length}
          </span>
        </h2>
        <p className="font-raleway text-2xl text-[#475367]">
          {wishlist.length === 0
            ? "Your wishlist is empty. Browse products and save your favourites!"
            : `Your Wishlist contains ${wishlist.length} product${wishlist.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-6">
          <div className="text-6xl">🛍️</div>
          <p className="font-raleway text-xl text-[#475367] text-center max-w-md">
            Nothing here yet! Find something you love and add it to your wishlist.
          </p>
          <Link
            href="/"
            className="px-8 py-3 rounded-full bg-[#01454A] text-white font-semibold font-raleway hover:bg-[#012e32] transition-colors"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between py-2">
            <p className="text-[#1D2329] font-bold text-2xl leading-10 py-2.5 pr-[30px] border-b-2 border-[#F56630]">
              Wishlist
            </p>
            <p className="text-[#586283] py-3 px-6 rounded-full border border-[#F0F2F5] bg-white shadow">
              see more &gt;
            </p>
          </div>
          <div>
            <table className="min-w-full divide-y divide-slate-300">
              <thead className="divide-y-2 divide-red-500">
                <tr>
                  <th className="font-raleway font-medium text-[#1D2329] text-left px-5 py-2.5">
                    Product&apos;s Name
                  </th>
                  <th className="font-raleway font-medium text-[#1D2329] text-left px-5 py-2.5">
                    Price
                  </th>
                  <th className="font-raleway font-medium text-[#1D2329] text-left px-5 py-2.5">
                    Status
                  </th>
                  <th className="font-raleway font-medium text-[#1D2329] text-left px-5 py-2.5">
                    Action
                  </th>
                  <th className="font-raleway font-medium text-[#1D2329] text-left px-5 py-2.5">
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody>
                {wishlist.map((item) => (
                  <tr key={item.id}>
                    <td className="px-5 py-3 font-raleway">{item.title}</td>
                    <td className="px-5 py-3 font-raleway">{item.price}</td>
                    <td className="px-5 py-3 font-raleway">{item.status}</td>
                    <td className="px-5 py-3">
                      <button className="px-4 py-1.5 bg-[#01454A] text-white rounded-full text-sm font-raleway">
                        Add to Cart
                      </button>
                    </td>
                    <td className="px-5 py-3">
                      <button className="px-4 py-1.5 text-[#F56630] border border-[#F56630] rounded-full text-sm font-raleway hover:bg-[#F56630] hover:text-white transition-colors">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
