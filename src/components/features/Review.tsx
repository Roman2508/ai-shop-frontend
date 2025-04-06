import React from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";

import { Button } from "../ui/common/Button";
import getPhotoUrl from "@/utils/get-photo-url";
import { useCurrent } from "@/hooks/useCurrent";
import getProductTitle from "@/utils/getProductTitle";
import formatDateTime from "@/utils/format-date-time";
import { ReviewModel, useDeleteReviewMutation } from "@/graphql/generated/output";

interface IReviewProps {
  review: ReviewModel;
  type: "product" | "user";
}

const EMPTY_IMAGE = "https://www.shutterstock.com/image-vector/no-image-available-icon-template-600nw-1036735678.jpg";

const Review: React.FC<IReviewProps> = ({ review, type }) => {
  const { user } = useCurrent();

  const [deleteReview] = useDeleteReviewMutation();

  const onDeleteReview = (id: string) => {
    if (!window.confirm("Ви дійсно хочете видалити свій відгук?")) return;
    deleteReview({ variables: { id } });
  };

  return (
    <div className="mb-[10px] py-[10px] px-[15px]  border border-border rounded-[4px]">
      <div className="flex justify-between w-full">
        {type === "user" && (
          <div className="flex items-center gap-[10px]">
            <div className="w-[50px] h-[50px]">
              <img src={review.user.avatar ? getPhotoUrl(review.user.avatar, "users") : EMPTY_IMAGE} />
            </div>

            <h4 className="font-medium flex-1">{review.user.displayName}</h4>
          </div>
        )}

        {type === "product" && (
          <div className="flex items-center gap-[10px]">
            <div className="w-[50px] h-[50px]">
              <img
                className="object-cover w-full h-full"
                src={
                  review.product && review.product.images.length
                    ? getPhotoUrl(review.product.images[0], "products")
                    : EMPTY_IMAGE
                }
              />
            </div>

            <Link href={`/catalog/${review.product.id}`}>
              <h4 className="font-medium flex-1">{getProductTitle(review.product)}</h4>
            </Link>
          </div>
        )}

        <div className="flex items-center gap-[15px]">
          <p className="text-xs opacity-[0.7]">{formatDateTime(review.createdAt)}</p>

          {user?.id === review.user.id && (
            <Button size="icon" variant="icon" onClick={() => onDeleteReview(review.id)}>
              <Trash2 className="h-24 w-24 stroke-black opacity-[0.7]" />
            </Button>
          )}
        </div>
      </div>

      <div className="my-[10px]">{review.text}</div>
    </div>
  );
};

export default Review;
