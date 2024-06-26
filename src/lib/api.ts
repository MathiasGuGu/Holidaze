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
  try {
    let res;
    if (searchParam === "") {
      res = await fetch(
        `${BASE_URL}/holidaze/venues?page=${page}&sort=created&sortOrder=desc`
      );
    } else {
      res = await fetch(
        `${BASE_URL}/holidaze/venues/search?q=${searchParam}&page=${page}&sort=created&sortOrder=desc`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function createVenue(
  data: any,
  accessToken: string,
  apiKey: string
): Promise<any> {
  try {
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
  } catch (error) {
    console.error(error);
  }
}

export async function editVenue({
  data,
  accessToken,
  apiKey,
  venueId,
}: {
  data: any;
  accessToken: string;
  apiKey: string;
  venueId: string;
}): Promise<any> {
  try {
    const res = await fetch(
      BASE_URL + "/holidaze" + ApiAuthEndpoints.venues + `/${venueId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify(data),
      }
    );
    const resData = await res.json();
    return resData;
  } catch (error) {
    console.error(error);
  }
}

export async function updateProfile(
  data: any,
  accessToken: string,
  apiKey: string,
  name: string
): Promise<any> {
  const res = await fetch(
    BASE_URL + "/holidaze" + ApiAuthEndpoints.profiles + `/${name}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
      body: JSON.stringify(data),
    }
  );
  const resData = await res.json();
  return resData;
}

export async function deleteVenue({ accessToken, apiKey, venueId }: any) {
  try {
    await fetch(`${BASE_URL}/holidaze/venues/${venueId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
    });
  } catch (error) {
    console.error(error);
  }
}
