# DAV Huts

Project to get notifications for DAV huts availability

I am lately into sleeping in the DAV huts, however I mostly spontaneously decide when and where to go based on multiple factors
like weather or simply my mood :)

The huts are usually full, specially on the weekend, but it's very likely that some customers cancel. The main idea of this project is to get notified when my favorite huts get free slots.

## How to run it

1. Install Node.js (>=14.16) and npm

2. Install dependencies

```sh
npm install
```

3. Run locally

```sh
npm run dev
```

The app checks availability every 5 minutes and prints any free slots to the console.

## Watched huts

The following huts are currently watched (all via [hut-reservation.org](https://www.hut-reservation.org)):

| Hut | ID | Region |
|-----|----|--------|
| Knorrhütte | 149 | Zugspitze |
| Höllentalangerhütte | 73 | Garmisch |
| Reintalangerhütte | 128 | Garmisch |
| Simony-Hütte | 219 | Dachstein |
| Olpererhütte | 119 | Zillertal |

## How to add more huts

Edit [`src/models/huts.js`](./src/models/huts.js) to add a hut. To find the ID, go to
[hut-reservation.org](https://www.hut-reservation.org), navigate to the hut's booking page,
and grab the number from the URL:

```
https://www.hut-reservation.org/reservation/book-hut/73/wizard
                                                        ^^
                                                        hut ID
```

Then add it to the `hutsToWatch` array in [`app.js`](./app.js).

## How to change watched dates

Edit the `datesToWatch` array in [`app.js`](./app.js). Dates use the format `DD.MM.YYYY`.

```js
const datesToWatch = ["19.09.2026"];
```
