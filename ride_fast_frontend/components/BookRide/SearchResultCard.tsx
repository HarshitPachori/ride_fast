"use client";
import React from "react";
import LocationIcon from "@mui/icons-material/LocationOn";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
interface SearchCardProps {
  item: any;
  areaKey: string;
  setActiveField: string;
  latitude_key: string;
  longitude_key: string;
}
function SearchResultCard({
  item,
  areaKey,
  setActiveField,
  latitude_key,
  longitude_key,
}: SearchCardProps) {
  // const pickupLatitude = 23.452;
  // const destinationLatitude = 83.951;
  // const pickupLongitude = 123.562;
  // const pickupArea = "Delhi";
  // const destinationLongitude = 173.352;

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const handleSelect = () => {
    const params = new URLSearchParams(searchParams);
    params.set(latitude_key, item?.lat);
    params.set(longitude_key, item?.lon);
    params.set(areaKey, item?.display_name);

    router.replace(pathName + "?" + params.toString());
  };

  return (
    <div
      onClick={handleSelect}
      className="flex items-center py-2 z-10 bg-white cursor-pointer"
    >
      <div className="pr-5">
        <LocationIcon />
      </div>
      <div>
        <p className="font-semibold">{item?.display_name.split(" ")[0]}</p>
        <p className="font-semibold opacity-60">{item?.display_name}</p>
      </div>
    </div>
  );
}

export default SearchResultCard;
