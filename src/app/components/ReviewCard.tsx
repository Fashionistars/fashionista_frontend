import Image from "next/image";
import React from "react";
interface ReviewProps {
  review: {
    comment: string;
    user: {
      name: string;
      image: string;
      role: string;
    };
  };
}

const ReviewCard = ({ review }: ReviewProps) => {
  return (
    <div className="flex flex-col gap-5">
      <p className="font-satoshi text-xl text-[#282828]">{review.comment}</p>

      <div className=" flex items-center gap-4">
        <div>
          <Image
            src={review.user.image}
            alt=""
            className="w-[49px] h-[49px] rounded-full object-cover"
          />
        </div>
        <div>
          <p className="font-satoshi font-medium text-black">
            {review.user.name}
          </p>
          <span className="font-satoshi text-[#282828] text-sm">
            {review.user.role}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
