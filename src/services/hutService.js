import { checkAvailability } from "./../clients/hutReservationClient.js";

export async function getHutsAvailabilities(hutsToWatch, datesToWatch) {
  const availabilities = await Promise.all(
    hutsToWatch.map((hut) => getAvailability(hut, datesToWatch))
  );
  return availabilities;
}

async function getAvailability(hut, datesToWatch) {
  const availableBeds = [];

  for (const date of datesToWatch) {
    const result = await checkAvailability(hut.id, date, nextDay(date));
    if (!result || !result.availabilityPerDayDTOs) continue;

    for (const day of result.availabilityPerDayDTOs) {
      if (day.freePlaces > 0 && datesToWatch.includes(day.day)) {
        availableBeds.push({
          reservationDate: day.day,
          freeRoom: day.freePlaces,
        });
      }
    }
  }

  if (!availableBeds.length) return null;

  return { hutName: hut.name, availableBeds };
}

function nextDay(dateStr) {
  const [day, month, year] = dateStr.split(".").map(Number);
  const d = new Date(year, month - 1, day + 1);
  return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
}
