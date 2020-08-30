import { Injectable } from '@angular/core';
import { initial_LngLat } from '../map/map/map.component';
import { LngLat } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  public timeline_translate: string = 'translateX(-100%)';
  public marker_LngLat: LngLat = initial_LngLat;

  constructor() { }

  /**
   * Toggle a string between two values to aid with timeline sliding in horizontally
   */
  toggleTimeline() {
    this.timeline_translate = this.timeline_translate === 'translateX(0%)' ? 'translateX(-100%)' : 'translateX(0%)';
  }

  /**
   * Sets marker longitude/latitude object
   */
  setMarkerLngLat(newLngLat: LngLat) {
    this.marker_LngLat = newLngLat;
  }

  /**
   * Gets current marker longitude/latitude object
   */
  getMarkerLngLat() {
    return this.marker_LngLat;
  }
}
