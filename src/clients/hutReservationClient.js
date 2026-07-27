import fetch from "node-fetch";

const BASE_URL = "https://www.hut-reservation.org";

async function getCsrfToken() {
  const response = await fetch(`${BASE_URL}/api/v1/csrf`, {
    headers: { Accept: "application/json" },
  });
  const cookies = response.headers.raw()["set-cookie"] || [];
  const xsrfCookie = cookies.find((c) => c.startsWith("XSRF-TOKEN="));
  const token = xsrfCookie
    ? decodeURIComponent(xsrfCookie.split(";")[0].split("=")[1])
    : null;
  const cookieHeader = cookies.map((c) => c.split(";")[0]).join("; ");
  return { token, cookieHeader };
}

async function getHutCategoryIds(hutId) {
  const response = await fetch(
    `${BASE_URL}/api/v1/reservation/hutInfo/${hutId}`,
    { headers: { Accept: "application/json" } }
  );
  const data = await response.json();
  return (data.hutBedCategories || []).map((c) => ({
    categoryId: c.categoryID,
    people: 0,
  }));
}

export async function checkAvailability(hutId, arrivalDate, departureDate) {
  try {
    const [{ token, cookieHeader }, peoplePerCategory] = await Promise.all([
      getCsrfToken(),
      getHutCategoryIds(hutId),
    ]);

    const body = JSON.stringify({
      arrivalDate,
      departureDate,
      numberOfPeople: 0,
      nextPossibleReservations: false,
      peoplePerCategory,
      isWaitingListAccepted: false,
      reservationPublicId: "",
    });

    const response = await fetch(
      `${BASE_URL}/api/v1/reservation/checkAvailability/${hutId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": token,
          Cookie: cookieHeader,
          Origin: BASE_URL,
          Referer: `${BASE_URL}/reservation/book-hut/${hutId}/wizard`,
        },
        body,
      }
    );

    return await response.json();
  } catch (error) {
    console.log(`Error checking availability for hut ${hutId}:`, error);
    return null;
  }
}
