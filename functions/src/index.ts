//import * as functions from 'firebase-functions';
import { getLocationFromArticle, getLocationsFromArticleList } from './wikiLocation';

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
