import { Component, OnInit } from '@angular/core';
import {TimelineService} from "../../core/timeline.service";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  constructor(public timelineService: TimelineService) { }

  ngOnInit(): void { }

}
