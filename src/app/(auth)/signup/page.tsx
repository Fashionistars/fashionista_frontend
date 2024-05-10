import Link from "next/link";

const page = () => {
  return (
    <div className="w-full h-full gap-12 flex flex-col items-center justify-center font-satoshi">
      <div className="flex flex-col place-items-center">
        <h2 className="font-satoshi font-medium text-3xl leading-10 text-black">
          Sign Up
        </h2>
        <p className="font-satoshi text-[15px] leading-5 text-[#282828]">
          Already have an account? <Link href="/login">Login </Link>
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <Link
          href="/vendor/sign-up"
          className="hover:bg-[#D9D9D9] bg-white p-4 hover:shadow-md"
        >
          <h3 className="font-medium text-xl leading-[27px] text-black">
            Vendor
          </h3>
          <p className="font-satoshi leading-[21.6px] text-[#282828]">
            Upload your work and fashion collections
          </p>
        </Link>
        <Link
          href="/client/sign-up"
          className="hover:bg-[#D9D9D9] bg-white p-4 hover:shadow-md"
        >
          <h3 className="font-medium text-xl leading-[27px] text-black">
            Client
          </h3>
          <p className="font-satoshi leading-[21.6px] text-[#282828]">
            Get your designed and tailored dress
          </p>
        </Link>
      </div>
    </div>
  );
};
export default page;
