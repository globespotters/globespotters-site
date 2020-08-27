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

/**
 * This class makes it easy to group asynchronous requests to the Wikipedia API together.
 *
 * Using it is pretty simple. A piece of code calls the getLocationFromArticle function of this class, and the function returns a Promise.
 * The thing that is different here is that the call to the API will not be made straight away. It will instead wait that a certain number of
 * calls (5 by default) to getLocationFromArticle have been made. Once that number of calls has been made, the requests are grouped together
 * and than sent. Once the response arrives, it is used to resolve each pending Promise. All of this happens automatically in the background.
 *
 * **IMPORTANT**: Once you know you'll no longer have any requests that you'll make, please call the flushRequests function. This function
 * sends the remaining pending requests, no matter how many are left.
 */
export class GroupedLocationGetter {
  private readonly groupNumber: number;

  // This function holds an array of objects containing the article name and the function to resolve the pending promise associated with
  // that request
  private pendingRequests = new Array<{articleName: string, resolve: (value: Coordinates|null) => void}>();

  /**
   * @param groupNumber Number of requests to group together when making calls to the Wikipedia API
   */
  constructor(groupNumber: number = 5) {
    this.groupNumber = groupNumber;
  }

  async getLocationFromArticle(articleName: string) {
    return new Promise<Coordinates|null>(((resolve, reject) => {
      this.pendingRequests.push({ articleName, resolve });

      if (this.pendingRequests.length >= this.groupNumber) {
        this.flushRequests();
      }
    }));
  }

  flushRequests() {
    // Save the pending requests that we will complete
    const requests = [...this.pendingRequests];

    // Remove these requests from the pending ones
    this.pendingRequests = []

    const articleNames = requests.map((i) => i.articleName);

    getLocationsFromArticleList(articleNames).then((results) => {
      for (const request of requests) {
        request.resolve(<Coordinates|null>results.get(request.articleName));
      }
    });
  }
}
