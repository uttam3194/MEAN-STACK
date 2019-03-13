import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://127.0.0.1:3000/users';

  constructor(private _http: HttpClient) { }

  register(body: any) {
    return this._http.post(`${this.uri}/register`, body, { // 'http://127.0.0.1:3000/users/register'
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  login(body: any) {
    return this._http.post(`${this.uri}/login`, body, { // 'http://127.0.0.1:3000/users/login'
      observe: 'body',
      withCredentials: true, // To add cookies in browser cache
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  user() {
    return this._http.get(`${this.uri}/user`, { // 'http://127.0.0.1:3000/users/user'
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  logout() {
    return this._http.get(`${this.uri}/logout`, { // 'http://127.0.0.1:3000/users/logout'
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  editUserData(id) {
    return this
            ._http
            .get(`${this.uri}/edit/${id}`);
  }

  update(data) {
    const obj = JSON.parse(data);
    const newObj = {'email': obj.email, 'username': obj.username, 'password': obj.password, 'creation_dt': obj.creation_dt};
    const id = obj._id;

    return this._http.post(`${this.uri}/updat/${id}`, newObj, { // 'http://127.0.0.1:3000/users/update'
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  applyTraining(body: any) {
    return this._http.post(`${this.uri}/apply/training`, body, { // 'http://127.0.0.1:3000/users/update'
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
