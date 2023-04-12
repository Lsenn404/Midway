// @ts-nocheck

import SearchBar from "../components/SearchBar";
import AddressTracker from "../components/AddressTracker";
import { useAtomValue, useAtom } from "jotai";

export default function Search() {
  return (
    <div>
      <AddressTracker />
      <div className="bg-dark my-4">
        <div className="container">
          <h1 className="">Midway</h1>
        </div>
        <SearchBar />
      </div>
    </div>
  );
}
