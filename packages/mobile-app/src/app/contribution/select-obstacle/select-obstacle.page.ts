import { Component, OnInit } from '@angular/core';
import { ObservationsService } from 'src/app/services/observations.service';
import { StatusCode } from 'src/app/models/status-code.model';


@Component({
  selector: 'app-select-obstacle',
  templateUrl: './select-obstacle.page.html',
  styleUrls: ['./select-obstacle.page.scss'],
})
export class SelectObstaclePage implements OnInit {
  public obstacles: {};
  public statusCode: StatusCode
  
  constructor(
    private observationService: ObservationsService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.observationService.getObstacles().subscribe({
      next: obstacles => this.obstacles = obstacles,
      error: (err) => this.statusCode = new StatusCode().deserialize(err.error)
    });
  }
}
