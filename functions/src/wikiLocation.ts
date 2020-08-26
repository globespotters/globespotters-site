import { Semaphore } from 'async-mutex';
const got = require('got');

// Maximum number of allowed pending requests to the Wikipedia API
const MAX_CONCURRENT_CONNECTIONS = 5;

interface WikiCoordinates {
  lat: number,
  lon: number,
  primary: string,
  globe: string,
}

interface WikiPageResult {
  pageid: number,
  ns: number,
  title: string,
  coordinates: Array<WikiCoordinates>
}

interface WikiQueryResult {
  batchcomplete: string,
  query: { pages: Map<number, WikiPageResult> }
}

//TODO: Use a central coordinate interface
interface Coordinates {
  lat: number,
  lng: number
}


const semaphore = new Semaphore(MAX_CONCURRENT_CONNECTIONS);
/**
 * From a Wikipedia article name, uses the Wikipedia API to get the coordinates of the article, if available. If no coordinates are available,
 * null will be returned.
 *
 * Note that to prevent spamming the Wikipedia API, this function will limit itself automatically to not have too many concurrent requests.
 * The number of concurrent requests is managed by the MAX_CONCURRENT_CONNECTIONS constant.
 * @param articleName The name of the Wikipedia article
 */
export async function getLocationFromArticle(articleName: string): Promise<Coordinates|null> {
  const [, release] = await semaphore.acquire(); //The function will block at this line if too many request are made at once

  const responseBody: WikiQueryResult = (await got('https://en.wikipedia.org/w/api.php', {
    headers: {
      'user-agent': 'globespotters/1.0 (http://globespotters.web.app)'
    },
    searchParams: {
      'action': 'query',
      'prop': 'coordinates',
      'format': 'json',
      'titles': articleName
    },
    responseType: 'json',
  })).body;

  let coordinates = null;
  for (const result of Object.values(responseBody.query.pages)) {
    if (result.title === articleName && 'coordinates' in result) {
      coordinates = {lng: result.coordinates[0].lon, lat: result.coordinates[0].lat};
    }
  }

  release();
  return coordinates;
}

