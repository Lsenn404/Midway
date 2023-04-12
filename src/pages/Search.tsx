// @ts-nocheck

import SearchBar from "../components/SearchBar";
import { useAtomValue, useAtom } from "jotai";


export default function Search() {
  return (
    <div>
      <div className="bg-dark my-4">
        <div className="font-fuzzy-bubbles container mx-auto grid grid-cols-12 h-16">
          <div className="flex items-center w-1/6"></div>
          <h1 className="col-span-2 col-start-6 text-6xl pb-2 tracking-widest">
            Midway
          </h1>
          <button
            className="col-start-10 mx-1 transition-all ease-out duration-300 pt-1 hover:scale-110 hover:bg-black hover:bg-opacity-10 border-1 rounded-t-lg text-2xl tracking-wide text-stone-800"
            onClick={() => {
              navigate("/");
            }}
          >
            home
          </button>
          <button
            className="pt-1 mx-1 transition-all ease-out duration-300 hover:scale-110 hover:bg-black hover:bg-opacity-10 border-1 rounded-t-lg text-2xl tracking-wide text-stone-800"
            onClick={() => {
              navigate("/search");
            }}
          >
            Anaxi
          </button>
          <button
            className="pt-1 mx-1 transition-all ease-out duration-300 hover:scale-110 hover:bg-black hover:bg-opacity-10 border-1 rounded-t-lg text-2xl tracking-wide text-stone-800"
            onClick={() => {
              navigate("/favorites");
            }}
          >
            favorites
          </button>

          
          
          
        </div>
      </div>


      <SearchBar />

      {/* <FavoriteList /> */}
    </div>
  );
}
