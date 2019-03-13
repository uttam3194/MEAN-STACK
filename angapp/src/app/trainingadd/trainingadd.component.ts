import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TrainingService } from '../training.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trainingadd',
  templateUrl: './trainingadd.component.html',
  styleUrls: ['./trainingadd.component.css']
})
export class TrainingaddComponent implements OnInit {

  Days: Number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  todaydate: Date = new Date();

  trainingAddForm: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(256)])),
    topics: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(1000)])),
    days: new FormControl(null, Validators.required),
    startdate: new FormControl(null, Validators.compose([Validators.required])),
    enddate: new FormControl(null, Validators.required),
    trainer: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(100)])),
    sessions: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(1000)]))
  });

  constructor(private _router: Router, private _training: TrainingService,
              private _route: ActivatedRoute) { }

  ngOnInit() { }

  add() {
    if ( !this.trainingAddForm.valid ) {
      console.log('invalid form');
      return;
    }
    this._training.add(JSON.stringify(this.trainingAddForm.value))
                  .subscribe(
                    data => {console.log(data); },
                    error => console.error(error)
                  );
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

}
