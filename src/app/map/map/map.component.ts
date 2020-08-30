import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { TimelineService } from '../../core/timeline.service';

export const initial_LngLat = new mapboxgl.LngLat(-123.9749, 40.7736);

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: [ './map.component.scss' ]
})
export class MapComponent implements OnInit {
  public map: mapboxgl.Map | undefined;
  public STYLE_LIGHT: string = 'mapbox://styles/guyinfridge/ckee54njf0kqu19mna1jgz8z1';
  public STYLE_DARK: string = 'mapbox://styles/guyinfridge/ckedd8l2n1n4c19mlyapazlqu';

  constructor(public timelineService: TimelineService) { }

  ngOnInit(): void {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.STYLE_LIGHT,
      zoom: 13,
      center: [ initial_LngLat.lng, initial_LngLat.lat ]
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    let marker = new mapboxgl.Marker({ color: '#FA8072', draggable: true })
      .setLngLat([ initial_LngLat.lng, initial_LngLat.lat ])
      .addTo(this.map);

    // Marker on-click functionality
    marker.getElement().addEventListener('click', () => {
      this.timelineService.toggleTimeline();
    });

    marker.on('dragend', () => this.timelineService.setMarkerLngLat(marker.getLngLat()));

  }

}
