import { useAtom } from "jotai";
import { midwayFirstAtom, midwaySecondAtom } from "../state";
import { post } from "../api";
import { useState, useEffect } from "react";
import Checkmark from "./Checkmark";
import googleApi from "../utils/fetch";

//@ts-ignore
import polyline from "@mapbox/polyline";

export default function MidwaySearchBars() {
  const [midwayFirst, setMidwayFirst] = useAtom(midwayFirstAtom);
  const [midwaySecond, setMidwaySecond] = useAtom(midwaySecondAtom);
  const [firstAddress, setFirstAddress] = useState<string>("");
  const [secondAddress, setSecondAddress] = useState<string>("");

  const [firstAddressValid, setfirstAddressValid] = useState<boolean>(false);
  const [secondAddressValid, setsecondAddressValid] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [radius, setRadius] = useState<number>();
  const [encodedPolylineValue, setEncodedPolylineValue] = useState<string>("");
  const [midwayCoords, setMidwayCoords] = useState<any>([]);

  const handleSetFirstAddress = (event: any) => {
    setFirstAddress(event.target.value);
  };

  const handleSetSecondAddress = (event: any) => {
    setSecondAddress(event.target.value);
  };

  const handleFirstFormSubmit = async (event: any) => {
    event.preventDefault();
    let res = await getMidwayCoords(firstAddress, true);
    if (!res) {
      //handle what to do if there is no result
      return;
    }
  };

  const handleSecondFormSubmit = async (event: any) => {
    event.preventDefault();
    const res = await getMidwayCoords(secondAddress, false);
    if (!res) {
      //handle what to do if there is no result
      return;
    }

    //handle what to do once you got geocoding result
  };

  const handleDirections = (event: any) => {
    event.preventDefault();
    console.log("handleDirections");
    getDirections(midwayFirst.place_id, midwaySecond.place_id)
      .then((result) => {
        console.log(result, "HANDLE DIRECTIONS");
        console.log(encodedPolylineValue, "ENCODED POLYLINE VALUE");
        const decodedPolyline = polyline.toGeoJSON(encodedPolylineValue);
        console.log(decodedPolyline, "DECODED POLYLINE");
        let middleIndex = Math.floor(decodedPolyline.coordinates.length / 2);
        console.log(middleIndex, "MIDDLE INDEX");
        setMidwayCoords(decodedPolyline.coordinates[middleIndex]);
      })
      .then(() => {
        console.log(midwayCoords, "MIDWAY COORDS");
        setConfirmed(true);
      });
  };

  async function getDirections(
    originIDValue: string,
    destinationIDValue: string
  ) {
    try {
      const directionsData = await post("/api/address/directions", {
        originIDValue,
        destinationIDValue,
      });
      setEncodedPolylineValue(
        directionsData.data.routes[0].overview_polyline.points
      );
      return directionsData;
    } catch (err) {
      console.log(err);
    }
  }

  //will set the first or second atom depending on the boolean
  async function getMidwayCoords(userAddress: string, firstSecond: boolean) {
    const result = await googleApi.search(userAddress);
    console.log(result.status, "RESULT");
    if (result.status === "ZERO_RESULTS") {
      console.log("ZERO RESULTS");
      return false;
    } else if (result.status === "INVALID_REQUEST") {
      console.log("INVALID_REQUEST");
      return false;
    }

    if (firstSecond) {
      setMidwayFirst(result.results[0]);
      setfirstAddressValid(true);
    } else {
      setMidwaySecond(result.results[0]);
      setsecondAddressValid(true);
    }
    console.log(result.results, "result.results");
    return result.results;
  }

  function midwayParams() {
    const handleSetUserParams = (event: any) => {
      const { name, value } = event.target;
      return name === "radius"
        ? setRadius(value)
        : // : name === "type"
          // ? setType(value)
          setKeyword(value);
    };

    const handleFormSubmit = (event: any) => {
      event.preventDefault();
      console.log("handleFormSubmit");
      console.log(midwayCoords, "MIDWAY COORDS");
      console.log(keyword, "KEYWORD");
      console.log(radius, "RADIUS");
      let userParams = {
        type: "",
        keyword: keyword,
        radius: radius,
        coordinate: { lng: midwayCoords[0], lat: midwayCoords[1] },
        useNextPage: false,
      };

      getNearby(userParams).then((result) => {
        console.log(result, "NEARBY");
      });
      //call midway search here
    };

    async function getNearby(userParams: object) {
      const nearbyData = await post("/api/address/nearby", { userParams });
      return nearbyData;
    }

    return (
      <div>
        <form className="px-4 my-2 form">
          <input
            className="font-fuzzy-bubbles flex-grow px-4 py-2 ml-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
            value={radius}
            name="radius"
            onChange={handleSetUserParams}
            type="text"
            placeholder="radius (km)"
          />
          <input
            className="font-fuzzy-bubbles flex-grow px-4 py-2 ml-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
            value={keyword}
            name="keyword"
            onChange={handleSetUserParams}
            type="text"
            placeholder="keyword"
          />
          <button
            className="font-fuzzy-bubbles px-4 py-2 my-0 mx-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200"
            onClick={handleFormSubmit}
          >
            submit
          </button>
        </form>
      </div>
    );
  }

  return (
    <>
      <div>
        <form className="px-4 form">
          <div className="flex items-center justify-center my-2">
            <input
              className="font-fuzzy-bubbles flex-grow px-4 py-2 ml-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
              value={firstAddress}
              name="firstAddress"
              onChange={handleSetFirstAddress}
              type="text"
              placeholder="Enter address #1"
            />
            <button
              className="font-fuzzy-bubbles px-4 py-2 mx-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200"
              onClick={handleFirstFormSubmit}
            >
              Submit
            </button>
            {firstAddressValid ? <Checkmark></Checkmark> : null}
          </div>
          <div className="flex items-center justify-center my-2">
            <input
              className="font-fuzzy-bubbles flex-grow px-4 py-2 ml-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
              value={secondAddress}
              name="secondAddress"
              onChange={handleSetSecondAddress}
              type="text"
              placeholder="Enter address #2"
            />
            <button
              className="font-fuzzy-bubbles px-4 py-2 mx-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200"
              onClick={handleSecondFormSubmit}
            >
              Submit
            </button>
            {secondAddressValid ? <Checkmark></Checkmark> : null}
          </div>
          <div className="flex items-center justify-center my-2">
            {firstAddressValid && secondAddressValid ? (
              <button
                className="font-fuzzy-bubbles px-4 py-2 mx-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200"
                onClick={handleDirections}
              >
                Confirm Addresses
              </button>
            ) : null}
            {confirmed ? <Checkmark></Checkmark> : null}
          </div>
        </form>
      </div>
      {confirmed ? midwayParams() : null}
    </>
  );
}
