"use client";
import React from "react";

const page = () => {
  const handleMeasurement = async () => {
    try {
      const res = await fetch("");
    } catch (error) {
      console.log(error);
    }
  };
  // const date = new Date();
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h3 className="font-satoshi font-medium text-2xl leading-10 text-[#1D2329]">
          Measurement
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#F0F2F5] flex justify-center items-center">
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.66666 0.833252C6.1269 0.833252 6.5 1.20635 6.5 1.66659V2.49992H11.5V1.66659C11.5 1.20635 11.8731 0.833252 12.3333 0.833252C12.7936 0.833252 13.1667 1.20635 13.1667 1.66659V2.49992H14C15.8409 2.49992 17.3333 3.9923 17.3333 5.83325V14.9999C17.3333 16.8409 15.8409 18.3333 14 18.3333H4C2.15905 18.3333 0.666664 16.8409 0.666664 14.9999V5.83325C0.666664 3.9923 2.15905 2.49992 4 2.49992H4.83333V1.66659C4.83333 1.20635 5.20643 0.833252 5.66666 0.833252ZM11.5 4.16659C11.5 4.62682 11.8731 4.99992 12.3333 4.99992C12.7936 4.99992 13.1667 4.62682 13.1667 4.16659H14C14.9205 4.16659 15.6667 4.91278 15.6667 5.83325V6.24992H2.33333V5.83325C2.33333 4.91278 3.07952 4.16659 4 4.16659H4.83333C4.83333 4.62682 5.20643 4.99992 5.66666 4.99992C6.1269 4.99992 6.5 4.62682 6.5 4.16659H11.5ZM15.6667 7.91658H2.33333V14.9999C2.33333 15.9204 3.07952 16.6666 4 16.6666H14C14.9205 16.6666 15.6667 15.9204 15.6667 14.9999V7.91658Z"
                fill="#344054"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs text-[#344054]">Today's date</p>
            <span className="font-bold font-raleway text-[#141414]">
              1st July, 2024
            </span>
            {/* <span>{date.toLocaleString()}</span> */}
          </div>
        </div>
      </div>

      {/* <h2 className="font-bon_foyage pb-3 border-b-[1.5px] border-[#D9D9D9] text-[40px] leading-10 md:text-7xl text-black">
        Measurement
      </h2> */}
      <div className="flex flex-col md:flex-row justify-between gap-5 py-5">
        <div className=" w-full md:w-[60%]  space-y-4">
          <p className="font-raleway text-2xl text-black">
            Watch video for guidelines on measurement taking
          </p>
          <div
            className="relative w-full h-[426px] rounded-2xl border-4 border-[#F4F5FB]"
            style={{ boxShadow: "0px 2px 2px 0px #00000040" }}
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-2xl"
              src={`https://www.youtube.com/embed/xI70E6SVmBQ`}
              title="How to take your measurement on Fashionistar"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="border border-[#d9d9d9] p-5 md:p-[30px] flex flex-col justify-between  rounded-[10px] max-w-[27rem] w-full min-h-[25rem] h-full md:h-[37.2rem]">
          <div className="space-y-5">
            <p className="font-raleway border-b-[1.5px] border-[#D9D9D9] py-3 text-2xl leading-10 font-medium text-black">
              Measurement
            </p>
            <p className="font-raleway font-medium text-xl text-black">
              {" "}
              Your measurement here
            </p>
            <p className="px-2 md:px-4 py-3 bg-[#F4F5FB] rounded-[14px] font-satoshi text-lg md:text-xl text-[#475367] flex-none grow">
              A token of #1000 will be deducted from your balance from each
              measurement your take
            </p>
          </div>
          <button
            onClick={handleMeasurement}
            className="w-full h-[3rem] rounded  text-white bg-[#fda600] font-bold font-satoshi flex items-center justify-center"
          >
            Take Your Measurement
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
