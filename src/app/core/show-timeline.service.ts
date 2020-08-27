import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowTimelineService {
  public timeline_translate: string = 'translateX(0%)';

  constructor() { }

  /**
   * Toggle a string between two values to aid with timeline sliding in horizontally
   */
  toggleTimeline() {
    this.timeline_translate = this.timeline_translate === 'translateX(0%)' ? 'translateX(-100%)' : 'translateX(0%)';
    return this.timeline_translate
  }
}
