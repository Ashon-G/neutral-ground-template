import React from "react";

export function AIFeatureSection() {
  return (
    <div className="w-full bg-black text-white">
      <div className="mx-auto max-w-[980px] px-5 lg:px-0">
        <div className="h-[1697.5px] relative">
          <div className="h-full relative flex items-center justify-center bg-black">
            <div className="sticky top-0 z-[5] flex items-center h-[679px] bg-black pl-2.5 text-[50px] font-semibold">
              Introducing Hire Hub, the mobile app that connects university
              students with startups. Students earn academic credit and gain
              real-world experience, while startups enjoy free access to
              university talent. Experience seamless collaboration and growth
              with Hire Hub.
            </div>
            <div
              className="absolute inset-0 z-[10] block h-full"
              style={{
                backgroundImage:
                  "linear-gradient(rgb(0, 0, 0) 30%, rgb(53, 16, 115) 36%, rgb(201, 88, 222) 43%, rgb(251, 177, 247) 50%, rgb(201, 88, 222) 59%, rgb(53, 16, 115) 67%, rgb(0, 0, 0) 74%)",
                mixBlendMode: "darken",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}