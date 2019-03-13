import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {

  userData = {
    id: String,
    email: String,
    username: String,
    password: String,
    creation_dt: Date
  };

  data: any = {};

  editForm: FormGroup;

  constructor(private _userService: UserService,
    private _router: Router,
    private route: ActivatedRoute) {
      this.createForm();
    }

  createForm() {
    this.editForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      username: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this._userService.editUserData(params['id']).subscribe(res => {
        this.data = res;
      });
    });
  }

  update(userData) {
    if ( !this.editForm.valid ) {
      console.log('invalid form');
      return;
    }

   this._userService.update(JSON.stringify(userData))
        .subscribe(
          data => {console.log(data); this._router.navigate(['/userhome']); } ,
          error => console.error(error)
        );
  }

}
