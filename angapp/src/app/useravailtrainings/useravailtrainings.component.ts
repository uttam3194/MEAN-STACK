import { Component, OnInit } from '@angular/core';
import Training from '../Training';
import { TrainingService } from '../training.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-useravailtrainings',
  templateUrl: './useravailtrainings.component.html',
  styleUrls: ['./useravailtrainings.component.css']
})
export class UseravailtrainingsComponent implements OnInit {

  trainings: Training[];

  userTraining: any = {
    trainingId: String,
    userId: String,
    username: String,
    title: String,
    trainer: String,
    sessions: String
  };

  constructor(private _training: TrainingService,
              private _user: UserService,
              private _router: Router) {
                this._user.user()
                          .subscribe(
                            data => this.getData(data),
                            error => this._router.navigate(['/login'])
                );
  }

  getData(data) {
    this.userTraining.userId = data._id;
    this.userTraining.username = data.username;
  }

  ngOnInit() {
    this._training.getData()
                  .subscribe((data: Training[]) => {
                    this.trainings = data;
                  });
  }

  applyTraining(trainingId, title, trainer, sessions) {
    this.userTraining.trainingId = trainingId;
    this.userTraining.title = title;
    this.userTraining.trainer = trainer;
    this.userTraining.sessions = sessions;
    const userData = JSON.stringify(this.userTraining);
    this._user.applyTraining(userData)
              .subscribe(
                data => {console.log(data); },
                error => console.error(error)
              );
  }

}
