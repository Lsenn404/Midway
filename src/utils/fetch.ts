const googleApi = {
  search: async (address: string) => {
    const searchUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address.replace(
      " ",
      "+"
    )}&key=${import.meta.env.VITE_APIKEY}`;

    const res = await fetch(searchUrl);
    const data = await res.json();
    console.log(data, "LOGGING DATA")
    return data;
  },

  nearbySearch: async (params: {
    keyword: string;
    radius: number;
    coords: { lng: number; lat: number };
  }) => {
    const { keyword, radius, coords } = params;

    const nearbyUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
      coords.lat
    },${coords.lng}&radius=${radius*1000}&keyword=${keyword}&key=${
      import.meta.env.VITE_APIKEY
    }`;

    const res = await fetch(nearbyUrl);
    const data = await res.json();
    return data;
  },
};

export default googleApi;
