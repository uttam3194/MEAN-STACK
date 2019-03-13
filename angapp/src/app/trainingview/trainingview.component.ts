import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import Training from '../Training';

@Component({
  selector: 'app-trainingview',
  templateUrl: './trainingview.component.html',
  styleUrls: ['./trainingview.component.css']
})
export class TrainingviewComponent implements OnInit {

  trainings: Training[];

  constructor(private _training: TrainingService) { }

  ngOnInit() {
    this._training.getData()
                  .subscribe((data: Training[]) => {
                    this.trainings = data;
                  });
  }

  deleteTraining(id) {
    this._training.deleteTraining(id)
                  .subscribe(res => {
                    console.log('Deleted');
                  });
    location.reload();
  }

}
