import { Component, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment";
import * as mapboxgl from 'mapbox-gl';
import { ShowTimelineService } from "../../core/show-timeline.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public map: mapboxgl.Map | undefined;
  private lat = 37.75;
  private lng = -122.41;
  private STYLE_LIGHT: string = 'mapbox://styles/guyinfridge/ckee54njf0kqu19mna1jgz8z1';
  private STYLE_DARK: string = 'mapbox://styles/guyinfridge/ckedd8l2n1n4c19mlyapazlqu';

  constructor(public showTimelineService: ShowTimelineService) { }

  ngOnInit(): void {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.STYLE_LIGHT,
      zoom: 13,
      center: [this.lng, this.lat]
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    let marker = new mapboxgl.Marker({color : '#FA8072', draggable: true})
      .setLngLat([this.lng, this.lat])
      .addTo(this.map);

    // Marker on-click functionality
    marker.getElement().addEventListener('click', () => this.showTimelineService.toggleTimeline());

  }

}
