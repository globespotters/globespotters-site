import { Injectable } from '@angular/core';
import { initialLngLat } from '../map/map/map.constants';
import { LngLat } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  public timelineTranslate: string = 'translateX(-100%)';
  public markerLngLat: LngLat = initialLngLat;

  constructor() { }

  /**
   * Toggle a string between two values to aid with timeline sliding in horizontally
   */
  toggleTimeline() {
    this.timelineTranslate = this.timelineTranslate === 'translateX(0%)' ? 'translateX(-100%)' : 'translateX(0%)';
  }

  /**
   * Sets marker longitude/latitude object
   */
  setMarkerLngLat(newLngLat: LngLat) {
    this.markerLngLat = newLngLat;
  }

  /**
   * Gets current marker longitude/latitude object
   */
  getMarkerLngLat() {
    return this.markerLngLat;
  }
}
