import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TrainingService } from '../training.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trainingedit',
  templateUrl: './trainingedit.component.html',
  styleUrls: ['./trainingedit.component.css']
})
export class TrainingeditComponent implements OnInit {

  Days: Number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  todaydate: Date = new Date();

  data: any = {};

  trainingUpdateForm: FormGroup;

  constructor(private _router: Router, private _route: ActivatedRoute, private _training: TrainingService) {
     this.createForm();
  }

  createForm() {
    this.trainingUpdateForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      topics: new FormControl(null, Validators.required),
      days: new FormControl(null, Validators.required),
      startdate: new FormControl(null, Validators.required),
      enddate: new FormControl(null, Validators.required),
      trainer: new FormControl(null, Validators.required),
      sessions: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(1000)]))
    });
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this._training.editTrainingData(params['id']).subscribe(res => {
        this.data = res;
      });
    });
  }

  update(trainingData) {
    if ( ! this.trainingUpdateForm.valid ) {
      console.log('invalid form');
      return;
    }
    this._training.update(JSON.stringify(trainingData))
        .subscribe(
          data => {console.log(data); this._router.navigate(['/view']); } ,
          error => console.error(error)
        );
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

}
