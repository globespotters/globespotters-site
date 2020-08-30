import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { MapRoutingModule } from './map-routing.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    MapComponent,
    TimelineComponent,
    TutorialComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [ MapRoutingModule ]
})
export class MapModule {}
