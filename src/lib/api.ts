import { venueType } from "./types";

export const BASE_URL = "https://v2.api.noroff.dev";

export enum ApiAuthEndpoints {
  login = "/auth/login",
  register = "/auth/register",
  apiKey = "/auth/create-api-key",
  bookings = "/bookings",
  venues = "/venues",
  profiles = "/profiles",
}

export async function getUserBookings(
  name: string,
  accessToken: string,
  apiKey: string
) {
  const res = await fetch(
    `${BASE_URL}/holidaze/profiles/${name}/bookings?_venue=true&_customer=true`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
    }
  );
  const data = await res.json();
  return data;
}

export async function getUserVenues(
  name: string,
  accessToken: string,
  apiKey: string
): Promise<{ data: venueType[] }> {
  const res = await fetch(`${BASE_URL}/holidaze/profiles/${name}/venues`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  });
  const data = await res.json();
  return data;
}

export async function getVenuesBySearch(
  searchParam: string = "",
  page: number
): Promise<any> {
  let res;
  if (searchParam === "") {
    res = await fetch(`${BASE_URL}/holidaze/venues?page=${page}`);
  } else {
    res = await fetch(
      `${BASE_URL}/holidaze/venues/search?q=${searchParam}&page=${page}`
    );
  }

  const data = await res.json();
  return data;
}

export async function createVenue(
  data: any,
  accessToken: string,
  apiKey: string
): Promise<any> {
  const res = await fetch(BASE_URL + "/holidaze" + ApiAuthEndpoints.venues, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(data),
  });
  const resData = await res.json();
  return resData;
}
