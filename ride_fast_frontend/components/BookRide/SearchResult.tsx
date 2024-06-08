import React, { useState } from "react";
import SearchResultCard from "./SearchResultCard";

interface SearchResultProps {
  areaKey: string;
  setActiveField: string;
  latitude_key: string;
  longitude_key: string;
  item: any;
}

function SearchResult({
  areaKey,
  setActiveField,
  latitude_key,
  longitude_key,
  item,
}: SearchResultProps) {
  return (
    <div className="absolute top-10 left-0 z-10 bg-white rounded-md p-2 border max-h-[50vh] w-full overflow-y-scroll shadow-md hide-scroll">
      {
        <SearchResultCard
          key={item?.display_name}
          item={item}
          areaKey={areaKey}
          latitude_key={latitude_key}
          longitude_key={longitude_key}
          setActiveField={setActiveField}
        />
      }
    </div>
  );
}

export default SearchResult;
