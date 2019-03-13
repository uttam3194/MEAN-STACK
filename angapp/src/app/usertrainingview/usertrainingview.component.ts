import { Component, OnInit } from '@angular/core';
import UserTraining from '../userTraining';
import { TrainingService } from '../training.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
// import { PassThrough } from 'stream';

@Component({
  selector: 'app-usertrainingview',
  templateUrl: './usertrainingview.component.html',
  styleUrls: ['./usertrainingview.component.css']
})
export class UsertrainingviewComponent implements OnInit {

  userTrainings: UserTraining[];

  constructor(private _training: TrainingService, private _user: UserService, private _router: Router) {
    this._user.user()
              .subscribe(
                data => this.getTrainings(data),
                error => {this._router.navigate(['/login']); }
              );
  }

  ngOnInit() {  }

  getTrainings(userData) {
    if (userData) {
      this._training.getUserTraining(userData._id)
                  .subscribe((data: UserTraining[]) => {
                    this.userTrainings = data;
                  });
    }
  }

  deleteuserTraining(userId, trainingId) {
    this._training.deleteUserTraining(userId, trainingId)
                  .subscribe(res => {
                    console.log('Deleted');
                  });
    location.reload();
  }

}
