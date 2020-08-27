import { Component, OnInit } from '@angular/core';
import {ShowTimelineService} from "../../core/show-timeline.service";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  constructor(public showTimelineService: ShowTimelineService) { }

  ngOnInit(): void { }

}
