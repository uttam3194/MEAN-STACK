import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

  username: String = '';
  email: String = '';
  id: String = '';

  userData = {
    id: String,
    email: String,
    username: String,
    password: String,
    creation_dt: Date
  };

  constructor(private _user: UserService, private _router: Router) {
    this._user.user()
        .subscribe(
          data => this.addName(data),
          error => this._router.navigate(['/login'])
        );
  }

  addName(data) {
    this.userData.username = data.username;
    this.userData.email = data.email;
    this.userData.id = data._id;
    /*this.userData.password = data.password;
    this.userData.creation_dt = data.creation_dt;*/
  }
  ngOnInit() {
  }

  logout() {
    this._user.logout()
        .subscribe(
          data => {console.log(data);
                    this._router.navigate(['/login']); },
          error => console.error(error)
        );
  }

  update() {
    this._router.navigate(['/edit/', this.userData.id]);
  }

  trainings() {
    this._router.navigate(['/user/trainings/']);
  }

  view() {
    this._router.navigate(['/user/trainings/view/']);
  }

}
