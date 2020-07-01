import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavParamsService } from '../../services/nav-params.service'

@Component({
  selector: 'app-take-picture',
  templateUrl: './take-picture.page.html',
  styleUrls: ['./take-picture.page.scss'],
})
export class TakePicturePage implements OnInit {
  obstacle = null;
  init = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private param: NavParamsService) { }

  ngOnInit() {
    this.obstacle = this.activatedRoute.snapshot.paramMap.get('obstacle');
  }

  onImagePicked(imageData: string) {
    this.param.image = imageData;
    this.param.obstacle = this.obstacle;
    this.router.navigate(['/contribution/obstacle-summary']);
  }

}
