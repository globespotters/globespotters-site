export interface Location {
  lat: string;
  long: string;
  name: string;
}

export interface NewsArticle {
  title: string;
  summary: string; // Optional
  publisher: string; // Name only, not URL
  url: string;
  thumbnail: string; // URL
  location: Location; // See Map SDK for what the coordinates will look like
  // timestamp: Timestamp; // We could use Firestore's timestamp format or create our own
}
