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
  private initial_coords = new mapboxgl.LngLat(-123.9749, 40.7736);
  private STYLE_LIGHT: string = 'mapbox://styles/guyinfridge/ckee54njf0kqu19mna1jgz8z1';
  private STYLE_DARK: string = 'mapbox://styles/guyinfridge/ckedd8l2n1n4c19mlyapazlqu';

  constructor(public showTimelineService: ShowTimelineService) { }

  ngOnInit(): void {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.STYLE_LIGHT,
      zoom: 13,
      center: [this.initial_coords.lng, this.initial_coords.lat]
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    let marker = new mapboxgl.Marker({color : '#FA8072', draggable: true})
      .setLngLat([this.initial_coords.lng, this.initial_coords.lat])
      .addTo(this.map);

    // Marker on-click functionality
    marker.getElement().addEventListener('click', () => {
      this.showTimelineService.toggleTimeline()
    });

  }

}
