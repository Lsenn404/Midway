import { useAtomValue } from "jotai";
import { midwayFirstAtom, midwaySecondAtom } from "../state";
import { useState, useEffect } from "react";

export default function AddressTracker() {
  const midwayFirst = useAtomValue(midwayFirstAtom);
  const midwaySecond = useAtomValue(midwaySecondAtom);

  return (
    <div className="about h-60vh w-full grid grid-cols-12 content-center italic font-fuzzy-bubbles ">
      <div className="col-span-5 w-full h-full bg-white bg-opacity-70 flex items-center justify-center rounded-2xl shadow-xl shadow-zinc-900">
        <div className="text-l text-left col-span-4 px-12 z-10 py-2">
          <h1 className="text-4xl">Addresses: </h1>
          <ul>
            {midwayFirst.formatted_address ? (
              <li>1. {midwayFirst.formatted_address}</li>
            ) : null}
            {midwaySecond.formatted_address ? (
              <li>2. {midwaySecond.formatted_address}</li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
}
