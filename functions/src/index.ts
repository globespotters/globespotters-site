//import * as functions from 'firebase-functions';
import { getLocationFromArticle, getLocationsFromArticleList, GroupedLocationGetter } from './wikiLocation';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

getLocationFromArticle("Ottawa").then((coordinates) => {
  console.log(coordinates);
});

getLocationsFromArticleList(["Ottawa", "Toronto", "Hearst, Ontario", "Poutine"]).then((coordinates) => {
  console.log(coordinates);
});

// Next lines try to simulate a bit what will happen when we will request asynchronously a bunch of locations.
const locationGetter = new GroupedLocationGetter()
const articleList = ["Ottawa", "Toronto", "Hearst, Ontario", "Poutine", "Ottawa", "Dubai", "Canada"];

for (const article of articleList) {
  (async (a) => {
    const coordinates = await locationGetter.getLocationFromArticle(a);

    console.log(a, coordinates);
  })(article)
}

locationGetter.flushRequests();
