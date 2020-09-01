import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from '../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { TimelineService } from '../../core/timeline.service';
import { TutorialComponent } from '../tutorial/tutorial.component';
import { initialLngLat } from './map.constants';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: [ './map.component.scss' ]
})
export class MapComponent implements OnInit {
  public map!: mapboxgl.Map;
  public STYLE_LIGHT: string = 'mapbox://styles/guyinfridge/ckee54njf0kqu19mna1jgz8z1';
  public STYLE_DARK: string = 'mapbox://styles/guyinfridge/ckedd8l2n1n4c19mlyapazlqu';
  bsModalRef!: BsModalRef;

  constructor(public timelineService: TimelineService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.bsModalRef = this.modalService.show(TutorialComponent)

    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.STYLE_LIGHT,
      zoom: 13,
      center: [ initialLngLat.lng, initialLngLat.lat ]
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    let marker = new mapboxgl.Marker({ color: '#FA8072', draggable: true })
      .setLngLat([ initialLngLat.lng, initialLngLat.lat ])
      .addTo(this.map);

    // Marker on-click functionality
    marker.getElement().addEventListener('click', () => {
      this.timelineService.toggleTimeline();
    });

    marker.on('dragend', () => this.timelineService.setMarkerLngLat(marker.getLngLat()));

  }

}
