export function buildMessage(availabilities) {
  const availableHutBeds = availabilities.filter((a) => !!a);
  const messageParts = [];

  if (availableHutBeds.length) {
    messageParts.push("Reserve!");

    availableHutBeds.forEach((hut) => {
      const datesMessage = hut.availableBeds
        .map(
          ({ freeRoom, reservationDate }) =>
            `on ${reservationDate} available beds -> ${freeRoom}`
        )
        .join("\n");
      messageParts.push(`${hut.hutName}: \n${datesMessage}\n\n`);
    });
  }

  return messageParts.join("\n");
}
