import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Training App';
  username: String = '';
  loggedIn: Boolean = false;

  constructor(private _user: UserService, private _router: Router) {
    this._user.user()
        .subscribe(
          data => this.getData(data),
          error => {this.loggedIn = false; this._router.navigate(['/login']); }
        );
   }

  getData(data) {
    if ( !data.username ) {
      this.loggedIn = false;
    } else {
      this.username = data.username;
      this.loggedIn = true;
    }
  }

}
