import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TutorialComponent } from './tutorial/tutorial.component';



@NgModule({
  declarations: [MapComponent, TimelineComponent, TutorialComponent],
  imports: [
    CommonModule
  ],
  exports: [MapComponent, TimelineComponent, TutorialComponent]
})
export class MapModule { }
