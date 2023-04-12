// @ts-nocheck

import SearchBar from "../components/SearchBar";
import { useAtomValue, useAtom } from "jotai";

export default function Search() {
  return (
    <div>
      <div className="bg-dark my-4">
        <div className="container">
          <h1 className="">Midway</h1>
        </div>
        <SearchBar />
      </div>

      {/* <FavoriteList /> */}
    </div>
  );
}
