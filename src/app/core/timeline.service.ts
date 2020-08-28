import { Injectable } from '@angular/core';
import { initial_LngLat } from "../map/map/map.component";

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  public timeline_translate: string = 'translateX(-100%)';

  constructor() { }

  /**
   * Toggle a string between two values to aid with timeline sliding in horizontally
   */
  toggleTimeline() {
    this.timeline_translate = this.timeline_translate === 'translateX(0%)' ? 'translateX(-100%)' : 'translateX(0%)';
  }
}
