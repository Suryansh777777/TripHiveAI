export const fetchLocations = async (query: string) => {
  const response = await fetch(
    `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
      query
    )}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
  );
  return await response.json();
};
