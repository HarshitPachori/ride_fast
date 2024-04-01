import React from "react";

function CardVideoSection() {
  return (
    <div className="mt-10 sm:mt-32">
      <h1 className="text-3xl sm:text-5xl font-bold my-10 text-center">
        India's most ambition car
      </h1>
      <div className="">
        <video
          style={{ width: "100%", height: "30%" }}
          // controls
          autoPlay
          loop
          muted
        >
          <source
            src="https://s3-ap-southeast-1.amazonaws.com/ola-prod-website/banner-video-mob.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
}

export default CardVideoSection;
