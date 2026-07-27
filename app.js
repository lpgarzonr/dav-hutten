import { getHutsAvailabilities } from "./src/services/hutService.js";
import { buildMessage } from "./src/services/notificationMessageBuilder.js";
import { huts } from "./src/models/huts.js";

const intervalToCheckInMins = 5;
console.log(`Starting to check every ${intervalToCheckInMins} mins...`);
checkHuts();

setInterval(async function () {
  await checkHuts();
}, 60 * 1000 * intervalToCheckInMins);

async function checkHuts() {
  const hutsToWatch = [
    huts.knorrHut,
    huts.reintalangerHut,
    huts.simonyHut,
    huts.olpererHut,
  ];

  // Format "DD.MM.YYYY"
  const datesToWatch = ["19.09.2026"];

  const availability = await getHutsAvailabilities(hutsToWatch, datesToWatch);

  const messageToPrint = buildMessage(availability);

  if (messageToPrint) {
    console.log(messageToPrint);
  } else {
    console.log(`[${new Date().toISOString()}] No availability found.`);
  }
}
