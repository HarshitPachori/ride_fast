import React from "react";
import SearchResultCard from "./SearchResultCard";

interface SearchResultProps {
  areaKey: string;
  setActiveField: string;
  latitude_key: string;
  longitude_key: string;
}

function SearchResult({
  areaKey,
  setActiveField,
  latitude_key,
  longitude_key,
}: SearchResultProps) {
  return (
    <div className="absolute top-10 left-0 z-10 bg-white rounded-md p-2 border max-h-[50vh] w-full overflow-y-scroll shadow-md hide-scroll">
      {[
        { display_name: "hiii" },
        { display_name: "hiiii2" },
        { display_name: "hiiii3" },
        { display_name: "hiiii4" },
        { display_name: "hiiii5" },
        { display_name: "hiiii6" },
        { display_name: "hiiii7" },
      ].map((item) => (
        // <SearchResultCard item={item}/>
        <SearchResultCard
          key={item.display_name}
          item={item}
          areaKey={areaKey}
          latitude_key={latitude_key}
          longitude_key={longitude_key}
          setActiveField={setActiveField}
        />
      ))}
    </div>
  );
}

export default SearchResult;
