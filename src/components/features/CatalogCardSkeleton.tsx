import React from "react";
import { Skeleton } from "../ui/common/Skeleton";
import { Card } from "../ui/common/Card";

type CatalogCardSkeletonType = {
  viewType?: "cards" | "rows";
};

const CatalogCardSkeleton: React.FC<CatalogCardSkeletonType> = ({ viewType = "cards" }) => {
  return (
    <Card className={viewType === "cards" ? "pb-[30] pt-[20] px-[20]" : "flex py-[24] pl-[16] pr-[30] gap-[20]"}>
      <div className={viewType === "cards" ? "flex justify-end gap-[10]" : "hidden"}>
        <Skeleton className="h-[40] w-[40] rounded-md" />
      </div>

      <div className="my-[10]">
        <Skeleton className={viewType === "cards" ? "h-[260] w-full" : "h-[200] w-[170]"} />
      </div>

      <div className={viewType === "cards" ? "" : "flex justify-between w-full gap-[20]"}>
        <div className={viewType === "cards" ? "" : "w-full"}>
          <div className={viewType === "cards" ? "hidden" : "flex justify-end mb-[10] gap-[10]"}>
            <Skeleton className="h-[40] w-[40] rounded-md" />
          </div>

          <Skeleton className={viewType === "cards" ? "h-[20] w-full mb-[16]" : "h-[20] w-[50%] mb-[16]"} />

          <Skeleton className="h-[16] w-[60%] mb-[4]" />
          <Skeleton className="h-[16] w-[90%] mb-[4]" />
          <Skeleton className="h-[16] w-[70%] mb-[4]" />
          <Skeleton className="h-[16] w-full mb-[4]" />
        </div>
      </div>

      <div className={viewType === "cards" ? "" : "flex flex-col justify-center border-l rounded-r-[5] pl-[20]"}>
        <Skeleton className="h-[24] w-[40%] mb-[16] mt-[24]" />

        <div className={viewType === "cards" ? "flex mt-auto" : "flex flex-col w-[230]"}>
          <div
            className={
              viewType === "cards"
                ? "flex items-center rounded-l-[5] gap-[4] w-[50%] mb-[16]"
                : "flex justify-between items-center rounded-l-[5] w-[100%] mb-[4]"
            }
          >
            <Skeleton className="h-[40] w-[30%]" />
            <Skeleton className="h-[40] w-[30%]" />
            <Skeleton className="h-[40] w-[30%]" />
          </div>

          <Skeleton
            className={
              viewType === "cards" ? "h-[40] w-full max-w-[50%] mb-[16]" : "h-[40] w-full max-w-[100%] mb-[16]"
            }
          />
        </div>
      </div>
    </Card>
  );
};

export default CatalogCardSkeleton;
