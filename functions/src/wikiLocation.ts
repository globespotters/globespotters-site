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
export async function getLocationFromArticle(articleName: string) {
  return <Coordinates|null>(await getLocationsFromArticleList([articleName])).get(articleName);
}

/**
 * From a list of Wikipedia article names, uses the Wikipedia API to get the coordinates of each article, if available. The data is returned
 * as a map, where the key is the article name, and the value is the coordinates. If the coordinates do not exist for an article, the value
 * will be null
 *
 * Note that to prevent spamming the Wikipedia API, this function will limit itself automatically to not have too many concurrent requests.
 * The number of concurrent requests is managed by the MAX_CONCURRENT_CONNECTIONS constant.
 * @param articleName The names of the Wikipedia articles
 */
export async function getLocationsFromArticleList(articleName: string[] ) {
  const [, release] = await semaphore.acquire(); //The function will block at this line if too many request are made at once

  const responseBody: WikiQueryResult = (await got('https://en.wikipedia.org/w/api.php', {
    headers: {
      'user-agent': 'globespotters/1.0 (http://globespotters.web.app)'
    },
    searchParams: {
      'action': 'query',
      'prop': 'coordinates',
      'format': 'json',
      'titles': articleName.join("|")
    },
    responseType: 'json',
  })).body;

  release();

  const coordinates = new Map<string, Coordinates|null>();
  for (const result of Object.values(responseBody.query.pages)) {
    if ('coordinates' in result) {
      coordinates.set(result.title, {lng: result.coordinates[0].lon, lat: result.coordinates[0].lat});
    } else {
      coordinates.set(result.title, null);
    }
  }

  return coordinates;
}
