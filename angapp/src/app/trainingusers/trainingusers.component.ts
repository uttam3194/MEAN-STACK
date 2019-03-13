import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trainingusers',
  templateUrl: './trainingusers.component.html',
  styleUrls: ['./trainingusers.component.css']
})
export class TrainingusersComponent implements OnInit {

  trainingUsers: any = {};

  constructor(private _training: TrainingService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this._training.getTrainingUsers(params['trainingId']).subscribe(res => {
        this.trainingUsers = res;
      });
    });
  }

}
