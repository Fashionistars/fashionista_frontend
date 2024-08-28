"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../../../../public/logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import menu from "../../../../../public/menu.svg";
import AdminTopBanner from "../../../components/AdminTopBanner";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  return (
    <div className="flex flex-col">
      <div className="p-[11px] w-full bg-[#F4F3EC]">
        <div className="flex items-center justify-between px-2.5 bg-[#EDE7D9] rounded-[5px] h-[50px] lg:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="w-[34px] h-[34px] flex justify-center  items-center bg-[#F4F3EC] border-[0.8px] border-black rounded-full"
          >
            <Image src={menu} alt="" />
          </button>
          <div className="flex items-center">
            <Image src={logo} alt="logo" className="w-[39px] h-[38px]" />
            <h2 className="font-bon_foyage px-3 text-[25px] leading-[25px] text-black">
              Fashionistar
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex justify-center items-center border border-[#282828] rounded-full bg-white">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.86878 8.61825C3.81367 9.66525 3.87702 10.7798 2.9416 11.4813C2.50623 11.8079 2.25 12.3203 2.25 12.8645C2.25 13.6131 2.83635 14.25 3.6 14.25H14.4C15.1637 14.25 15.75 13.6131 15.75 12.8645C15.75 12.3203 15.4938 11.8079 15.0584 11.4813C14.1229 10.7798 14.1863 9.66525 14.1312 8.61825C13.9876 5.88917 11.7329 3.75 9 3.75C6.26713 3.75 4.01241 5.88917 3.86878 8.61825Z"
                  stroke="#282828"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.875 2.34375C7.875 2.96507 8.3787 3.75 9 3.75C9.6213 3.75 10.125 2.96507 10.125 2.34375C10.125 1.72243 9.6213 1.5 9 1.5C8.3787 1.5 7.875 1.72243 7.875 2.34375Z"
                  stroke="#282828"
                />
                <path
                  d="M11.25 14.25C11.25 15.4927 10.2427 16.5 9 16.5C7.75732 16.5 6.75 15.4927 6.75 14.25"
                  stroke="#282828"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="w-8 h-8 flex justify-center items-center border border-[#282828] rounded-full bg-white">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 4.5L6.68477 7.43773C8.5962 8.52075 9.4038 8.52075 11.3152 7.43773L16.5 4.5"
                  stroke="#282828"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.51183 10.1067C1.56086 12.4059 1.58537 13.5554 2.43372 14.4071C3.28206 15.2586 4.46275 15.2882 6.82412 15.3476C8.27948 15.3842 9.72053 15.3842 11.1759 15.3476C13.5373 15.2882 14.7179 15.2586 15.5663 14.4071C16.4147 13.5554 16.4392 12.4059 16.4881 10.1067C16.504 9.36743 16.504 8.63258 16.4881 7.8933C16.4392 5.59415 16.4147 4.44457 15.5663 3.593C14.7179 2.74142 13.5373 2.71176 11.1759 2.65243C9.72053 2.61586 8.27947 2.61586 6.82411 2.65242C4.46275 2.71175 3.28206 2.74141 2.43371 3.59299C1.58537 4.44456 1.56085 5.59414 1.51182 7.8933C1.49605 8.63258 1.49606 9.36743 1.51183 10.1067Z"
                  stroke="#282828"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="w-[34px] h-[34px] flex justify-center items-center rounded-full bg-[#fda600]">
              <span className="font-medium text-white">G</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`w-full lg:left-0 md:w-[40%] lg:w-[25%] z-50 h-screen bg-[#141414] fixed top-0 transition-all duration-300 ${
          isOpen ? "left-0" : "left-[-100%]"
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className=" w-8 h-8 flex justify-center items-center absolute top-2 right-2 md:hidden"
        >
          <svg
            className="text-white "
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.8334 4.1665L4.16675 15.8332M4.16675 4.1665L15.8334 15.8332"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="flex items-center px-10 py-5 md:py-[30px] border-b-[1.2px] border-b-[#282828]">
          <Image src={logo} alt="logo" className="w-[55px] h-[54px]" />
          <h2 className="font-bon_foyage px-3 text-4xl leading-9 text-white">
            Fashionistar
          </h2>
        </div>

        <nav className="px-10 py-[30px] flex flex-col justify-between h-[86%]">
          <ul className="flex flex-col gap-8">
            <li>
              {" "}
              <Link
                href="/dashboard"
                className={`font-medium font-satoshi  flex items-center gap-4 ${
                  pathname == "/dashboard" ? "text-[#fda600]" : "text-[#bbb]"
                }`}
              >
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.01398 2.26909L2.42065 5.06909C1.82065 5.53576 1.33398 6.52909 1.33398 7.28243V12.2224C1.33398 13.7691 2.59398 15.0358 4.14065 15.0358H11.8607C13.4073 15.0358 14.6673 13.7691 14.6673 12.2291V7.37576C14.6673 6.56909 14.1273 5.53576 13.4673 5.07576L9.34732 2.18909C8.41398 1.53576 6.91398 1.56909 6.01398 2.26909Z"
                    stroke="#FDA600"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 12.3691V10.3691"
                    stroke="#FDA600"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Dashboard
              </Link>
            </li>
            <li>
              {" "}
              <Link
                href="/dashboard/get-measured"
                className={` font-medium font-satoshi  flex items-center gap-4 ${
                  pathname == "/dashboard/get-measured"
                    ? "text-[#fda600]"
                    : "text-[#bbb]"
                }`}
              >
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.00004 15.5416C4.04671 15.5416 0.833374 12.3283 0.833374 8.37492C0.833374 4.42159 4.04671 1.20825 8.00004 1.20825C11.9534 1.20825 15.1667 4.42159 15.1667 8.37492C15.1667 12.3283 11.9534 15.5416 8.00004 15.5416ZM8.00004 2.20825C4.60004 2.20825 1.83337 4.97492 1.83337 8.37492C1.83337 11.7749 4.60004 14.5416 8.00004 14.5416C11.4 14.5416 14.1667 11.7749 14.1667 8.37492C14.1667 4.97492 11.4 2.20825 8.00004 2.20825Z"
                    fill="currentColor"
                  />
                  <path
                    d="M8.00004 11.5416C6.25337 11.5416 4.83337 10.1216 4.83337 8.37492C4.83337 6.62825 6.25337 5.20825 8.00004 5.20825C9.74671 5.20825 11.1667 6.62825 11.1667 8.37492C11.1667 10.1216 9.74671 11.5416 8.00004 11.5416ZM8.00004 6.20825C6.80671 6.20825 5.83337 7.18159 5.83337 8.37492C5.83337 9.56825 6.80671 10.5416 8.00004 10.5416C9.19337 10.5416 10.1667 9.56825 10.1667 8.37492C10.1667 7.18159 9.19337 6.20825 8.00004 6.20825Z"
                    fill="#BBBBBB"
                  />
                  <path
                    d="M14.1134 6.20838C14.08 6.20838 14.04 6.20171 14.0067 6.19504C12.0467 5.76838 10.0667 5.76838 8.10669 6.19504C7.83335 6.25504 7.57335 6.08171 7.51335 5.81504C7.45335 5.54171 7.62669 5.28171 7.89335 5.22171C9.99335 4.76171 12.12 4.76171 14.22 5.22171C14.4867 5.28171 14.66 5.54838 14.6 5.81504C14.5534 6.04838 14.3467 6.20838 14.1134 6.20838Z"
                    fill="#BBBBBB"
                  />
                  <path
                    d="M5.69334 10.2082C5.55334 10.2082 5.41334 10.1482 5.31334 10.0349C3.92667 8.44155 2.87334 6.62155 2.17334 4.62155L2.63334 4.41488L3.10667 4.25488L3.12001 4.29488C3.77334 6.16822 4.76667 7.88155 6.07334 9.38155C6.25334 9.58822 6.23334 9.90822 6.02667 10.0882C5.92667 10.1682 5.80667 10.2082 5.69334 10.2082Z"
                    fill="#BBBBBB"
                  />
                  <path
                    d="M7.25339 15.5017C7.13339 15.5017 7.01339 15.4617 6.92006 15.3751C6.71339 15.1884 6.70006 14.8751 6.88672 14.6684C8.22006 13.2017 9.20672 11.5017 9.82006 9.61506C9.90672 9.35506 10.2001 9.18173 10.4601 9.26839C10.7201 9.35506 10.8734 9.60839 10.7934 9.86839C10.1201 11.9484 9.06006 13.7751 7.63339 15.3484C7.52672 15.4484 7.38672 15.5017 7.25339 15.5017Z"
                    fill="#BBBBBB"
                  />
                </svg>
                Measurement
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/orders"
                className={` font-medium font-satoshi  flex items-center gap-4 ${
                  pathname == "/dashboard/orders"
                    ? "text-[#fda600]"
                    : "text-[#bbb]"
                }`}
              >
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.66663 9.875C5.66663 11.155 6.71996 12.2083 7.99996 12.2083C9.27996 12.2083 10.3333 11.155 10.3333 9.875"
                    stroke="currentColor"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5.87329 1.70825L3.45996 4.12825"
                    stroke="currentColor"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10.1267 1.70825L12.54 4.12825"
                    stroke="currentColor"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1.33337 5.60824C1.33337 4.3749 1.99337 4.2749 2.81337 4.2749H13.1867C14.0067 4.2749 14.6667 4.3749 14.6667 5.60824C14.6667 7.04157 14.0067 6.94157 13.1867 6.94157H2.81337C1.99337 6.94157 1.33337 7.04157 1.33337 5.60824Z"
                    stroke="currentColor"
                  />
                  <path
                    d="M2.33337 7.04175L3.27337 12.8017C3.48671 14.0951 4.00004 15.0417 5.90671 15.0417H9.92671C12 15.0417 12.3067 14.1351 12.5467 12.8817L13.6667 7.04175"
                    stroke="currentColor"
                    stroke-linecap="round"
                  />
                </svg>
                Orders
              </Link>
              <ul
                className={`pl-4 pt-10 ${
                  pathname.includes("/dashboard/orders")
                    ? "inline-flex"
                    : "hidden"
                } `}
              >
                <li>
                  <Link
                    href="/dashboard/orders/track-order"
                    className={` font-medium font-satoshi  flex items-center gap-4 ${
                      pathname == "/dashboard/orders/track-order"
                        ? "text-[#fda600]"
                        : "text-[#bbb]"
                    }`}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.4126 10.7719V6.69336H18.7557V10.7719C18.7557 13.8076 18.7557 15.3255 17.8221 16.2685C16.8886 17.2116 15.386 17.2116 12.3809 17.2116H10.7873C7.78223 17.2116 6.2797 17.2116 5.34615 16.2685C4.4126 15.3255 4.4126 13.8076 4.4126 10.7719Z"
                        stroke="currentColor"
                        stroke-width="1.43431"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.4126 6.69396L5.10216 5.22288C5.63697 4.08197 5.90436 3.51152 6.44637 3.19033C6.98837 2.86914 7.68362 2.86914 9.07409 2.86914H14.0942C15.4847 2.86914 16.1798 2.86914 16.7219 3.19033C17.2639 3.51152 17.5313 4.08197 18.066 5.22288L18.7557 6.69396"
                        stroke="currentColor"
                        stroke-width="1.43431"
                        stroke-linecap="round"
                      />
                      <path
                        d="M10.1494 9.5625H13.018"
                        stroke="currentColor"
                        stroke-width="1.43431"
                        stroke-linecap="round"
                      />
                      <path
                        d="M11.584 19.6035V21.994M11.584 19.6035H6.80299M11.584 19.6035H16.365M6.80299 19.6035H4.41248C3.09224 19.6035 2.02197 20.6738 2.02197 21.994M6.80299 19.6035V21.994M16.365 19.6035H18.7555C20.0758 19.6035 21.1461 20.6738 21.1461 21.994M16.365 19.6035V21.994"
                        stroke="currentColor"
                        stroke-width="1.43431"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Track my Order
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              {" "}
              <Link
                href="/dashboard/address"
                className={` font-medium font-satoshi  flex items-center gap-4 ${
                  pathname == "/dashboard/address"
                    ? "text-[#fda600]"
                    : "text-[#bbb]"
                }`}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.80298 17.1676V13.3428"
                    stroke="currentColor"
                    strokeWidth="1.43431"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11.584 17.1675V7.60547"
                    stroke="currentColor"
                    strokeWidth="1.43431"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16.365 17.1679V11.4307"
                    stroke="currentColor"
                    strokeWidth="1.43431"
                    strokeLinecap="round"
                  />
                  <path
                    d="M2.5 12.3867C2.5 8.10447 2.5 5.96336 3.83031 4.63304C5.16063 3.30273 7.30173 3.30273 11.5839 3.30273C15.8661 3.30273 18.0072 3.30273 19.3376 4.63304C20.6679 5.96336 20.6679 8.10447 20.6679 12.3867C20.6679 16.6688 20.6679 18.81 19.3376 20.1403C18.0072 21.4706 15.8661 21.4706 11.5839 21.4706C7.30173 21.4706 5.16063 21.4706 3.83031 20.1403C2.5 18.81 2.5 16.6688 2.5 12.3867Z"
                    stroke="currentColor"
                    strokeWidth="1.43431"
                    strokeLinejoin="round"
                  />
                </svg>
                My Address
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/account-details"
                className={` font-medium font-satoshi  flex items-center gap-4 ${
                  pathname.includes("/account-details")
                    ? "text-[#fda600]"
                    : "text-[#bbb]"
                }`}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.4526 8.12725C14.4526 8.12725 14.9307 8.12725 15.4088 9.08346C15.4088 9.08346 16.9275 6.69295 18.2775 6.21484"
                    stroke="currentColor"
                    strokeWidth="1.43431"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21.146 7.64919C21.146 10.2897 19.0055 12.4302 16.365 12.4302C13.7245 12.4302 11.584 10.2897 11.584 7.64919C11.584 5.0087 13.7245 2.86816 16.365 2.86816C19.0055 2.86816 21.146 5.0087 21.146 7.64919Z"
                    stroke="currentColor"
                    strokeWidth="1.43431"
                    strokeLinecap="round"
                  />
                  <path
                    d="M21.8631 13.6201C21.8624 13.2239 21.5407 12.9034 21.1447 12.9042C20.7486 12.9049 20.4281 13.2265 20.4288 13.6226L21.8631 13.6201ZM8.77821 7.41281C9.17428 7.41057 9.49354 7.08768 9.4913 6.69162C9.48905 6.29555 9.16616 5.97629 8.7701 5.97853L8.77821 7.41281ZM13.0182 21.2754H10.1496V22.7097H13.0182V21.2754ZM10.1496 21.2754C8.33576 21.2754 7.03573 21.2743 6.0369 21.1615C5.05125 21.0501 4.45403 20.8381 4.00337 20.4822L3.11443 21.6078C3.86349 22.1994 4.76464 22.4612 5.8759 22.5867C6.97399 22.7107 8.36943 22.7097 10.1496 22.7097V21.2754ZM1.30469 14.3429C1.30469 16.0152 1.30332 17.3374 1.43628 18.3802C1.57178 19.4426 1.85624 20.3086 2.49323 21.0231L3.56384 20.0686C3.19414 19.6539 2.97525 19.1098 2.85907 18.1987C2.74036 17.2678 2.73899 16.0532 2.73899 14.3429H1.30469ZM4.00337 20.4822C3.84384 20.3563 3.69682 20.2178 3.56384 20.0686L2.49323 21.0231C2.68227 21.2352 2.89018 21.4308 3.11443 21.6078L4.00337 20.4822ZM20.4288 14.3429C20.4288 16.0532 20.4274 17.2678 20.3087 18.1987C20.1925 19.1098 19.9736 19.6539 19.604 20.0686L20.6745 21.0231C21.3115 20.3086 21.596 19.4426 21.7315 18.3802C21.8644 17.3374 21.8631 16.0152 21.8631 14.3429H20.4288ZM13.0182 22.7097C14.7984 22.7097 16.1937 22.7107 17.2919 22.5867C18.4032 22.4612 19.3043 22.1994 20.0534 21.6078L19.1644 20.4822C18.7137 20.8381 18.1165 21.0501 17.1308 21.1615C16.1321 21.2743 14.832 21.2754 13.0182 21.2754V22.7097ZM19.604 20.0686C19.4709 20.2178 19.324 20.3563 19.1644 20.4822L20.0534 21.6078C20.2776 21.4308 20.4855 21.2352 20.6745 21.0231L19.604 20.0686ZM2.73899 14.3429C2.73899 12.6326 2.74036 11.418 2.85907 10.4871C2.97525 9.57601 3.19414 9.0318 3.56384 8.61713L2.49323 7.66265C1.85624 8.37714 1.57178 9.24315 1.43628 10.3056C1.30332 11.3483 1.30469 12.6706 1.30469 14.3429H2.73899ZM3.11443 7.07791C2.89018 7.25501 2.68227 7.45061 2.49323 7.66265L3.56384 8.61713C3.69682 8.46797 3.84384 8.32952 4.00337 8.20354L3.11443 7.07791ZM21.8631 14.3429C21.8631 14.095 21.8635 13.8524 21.8631 13.6201L20.4288 13.6226C20.4292 13.8534 20.4288 14.0916 20.4288 14.3429H21.8631ZM8.7701 5.97853C7.42419 5.98615 6.32869 6.01715 5.43126 6.15877C4.52041 6.30253 3.76081 6.56743 3.11443 7.07791L4.00337 8.20354C4.39281 7.89598 4.89164 7.69599 5.65486 7.57555C6.43151 7.45298 7.42572 7.42046 8.77821 7.41281L8.7701 5.97853Z"
                    fill="currentColor"
                  />
                  <path
                    d="M9.67163 18.168H11.1059"
                    stroke="currentColor"
                    strokeWidth="1.43431"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.9744 18.168H17.3211"
                    stroke="currentColor"
                    strokeWidth="1.43431"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.5 11.4746H9.67153"
                    stroke="currentColor"
                    strokeWidth="1.43431"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Account Details
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/wallet"
                className={` font-medium font-satoshi  flex items-center gap-4 ${
                  pathname.includes("/wallet")
                    ? "text-[#fda600]"
                    : "text-[#bbb]"
                }`}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.9103 20.0804H18.379C19.4785 20.0804 20.353 19.5794 21.1382 18.879C23.133 17.0995 18.4439 15.2993 16.8431 15.2993M14.9307 5.80306C15.1478 5.76 15.3733 5.7373 15.6046 5.7373C17.3448 5.7373 18.7555 7.02163 18.7555 8.60592C18.7555 10.1902 17.3448 11.4745 15.6046 11.4745C15.3733 11.4745 15.1478 11.4519 14.9307 11.4087"
                    stroke="currentColor"
                    strokeWidth="1.43431"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4.39444 16.3614C3.26711 16.9655 0.311286 18.1991 2.11157 19.7427C2.991 20.4968 3.97046 21.0361 5.20187 21.0361H12.2286C13.46 21.0361 14.4395 20.4968 15.3189 19.7427C17.1192 18.1991 14.1634 16.9655 13.036 16.3614C10.3924 14.9447 7.03804 14.9447 4.39444 16.3614Z"
                    stroke="currentColor"
                    strokeWidth="1.43431"
                  />
                  <path
                    d="M12.5403 8.12755C12.5403 10.2399 10.8278 11.9524 8.71544 11.9524C6.60305 11.9524 4.89062 10.2399 4.89062 8.12755C4.89062 6.01516 6.60305 4.30273 8.71544 4.30273C10.8278 4.30273 12.5403 6.01516 12.5403 8.12755Z"
                    stroke="currentColor"
                    strokeWidth="1.43431"
                  />
                </svg>
                Wallet
              </Link>
            </li>
          </ul>

          {/* <button
            className={`text-xl leading-[27px] font-medium font-satoshi  flex items-center gap-4 text-[#fff]`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.3175 7.14139L20.8239 6.28479C20.4506 5.63696 20.264 5.31305 19.9464 5.18388C19.6288 5.05472 19.2696 5.15664 18.5513 5.36048L17.3311 5.70418C16.8725 5.80994 16.3913 5.74994 15.9726 5.53479L15.6357 5.34042C15.2766 5.11043 15.0004 4.77133 14.8475 4.37274L14.5136 3.37536C14.294 2.71534 14.1842 2.38533 13.9228 2.19657C13.6615 2.00781 13.3143 2.00781 12.6199 2.00781H11.5051C10.8108 2.00781 10.4636 2.00781 10.2022 2.19657C9.94085 2.38533 9.83106 2.71534 9.61149 3.37536L9.27753 4.37274C9.12465 4.77133 8.84845 5.11043 8.48937 5.34042L8.15249 5.53479C7.73374 5.74994 7.25259 5.80994 6.79398 5.70418L5.57375 5.36048C4.85541 5.15664 4.49625 5.05472 4.17867 5.18388C3.86109 5.31305 3.67445 5.63696 3.30115 6.28479L2.80757 7.14139C2.45766 7.74864 2.2827 8.05227 2.31666 8.37549C2.35061 8.69871 2.58483 8.95918 3.05326 9.48012L4.0843 10.6328C4.3363 10.9518 4.51521 11.5078 4.51521 12.0077C4.51521 12.5078 4.33636 13.0636 4.08433 13.3827L3.05326 14.5354C2.58483 15.0564 2.35062 15.3168 2.31666 15.6401C2.2827 15.9633 2.45766 16.2669 2.80757 16.8741L3.30114 17.7307C3.67443 18.3785 3.86109 18.7025 4.17867 18.8316C4.49625 18.9608 4.85542 18.8589 5.57377 18.655L6.79394 18.3113C7.25263 18.2055 7.73387 18.2656 8.15267 18.4808L8.4895 18.6752C8.84851 18.9052 9.12464 19.2442 9.2775 19.6428L9.61149 20.6403C9.83106 21.3003 9.94085 21.6303 10.2022 21.8191C10.4636 22.0078 10.8108 22.0078 11.5051 22.0078H12.6199C13.3143 22.0078 13.6615 22.0078 13.9228 21.8191C14.1842 21.6303 14.294 21.3003 14.5136 20.6403L14.8476 19.6428C15.0004 19.2442 15.2765 18.9052 15.6356 18.6752L15.9724 18.4808C16.3912 18.2656 16.8724 18.2055 17.3311 18.3113L18.5513 18.655C19.2696 18.8589 19.6288 18.9608 19.9464 18.8316C20.264 18.7025 20.4506 18.3785 20.8239 17.7307L21.3175 16.8741C21.6674 16.2669 21.8423 15.9633 21.8084 15.6401C21.7744 15.3168 21.5402 15.0564 21.0718 14.5354L20.0407 13.3827C19.7887 13.0636 19.6098 12.5078 19.6098 12.0077C19.6098 11.5078 19.7888 10.9518 20.0407 10.6328L21.0718 9.48012C21.5402 8.95918 21.7744 8.69871 21.8084 8.37549C21.8423 8.05227 21.6674 7.74864 21.3175 7.14139Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M15.5195 12C15.5195 13.933 13.9525 15.5 12.0195 15.5C10.0865 15.5 8.51953 13.933 8.51953 12C8.51953 10.067 10.0865 8.5 12.0195 8.5C13.9525 8.5 15.5195 10.067 15.5195 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            Logout
          </button> */}
          <div className="flex items-center gap-2">
            <Image
              src="/woman3.svg"
              alt=""
              height={50}
              width={50}
              className="rounded-full h-[45px] w-[45px] object-cover"
            />
            <div>
              <h2 className="font-satoshi font-medium text-sm text-[#BBBBBB]">
                Jennifer
              </h2>
              <span className="text-xs text-[#bbb] ">
                st.jennyandy@gmail.com
              </span>
            </div>
          </div>
        </nav>
      </div>
      <div className="lg:ml-[25%] bg-[#F4F3EC] min-h-screen flex flex-col">
        <AdminTopBanner />
        <div className="p-3 md:p-[30px] mt-1 lg:mt-[100px] bg-inherit space-y-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
