import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  uri = 'http://127.0.0.1:3000/users';

  constructor(private _http: HttpClient) { }

  add(body: any) {
    return this._http.post(`${this.uri}/add`, body, { // 'http://127.0.0.1:3000/users/register'
                      observe: 'body',
                      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  getData() {
    return this._http.get(`${this.uri}/view`);
  }

  deleteTraining(id) {
    return this._http.delete(`${this.uri}/delete/${id}`);
  }

  editTrainingData(id) {
    return this
            ._http
            .get(`${this.uri}/training/edit/${id}`);
  }

  update(data) {
    const obj = JSON.parse(data);
    const newObj = {'title': obj.title,
                    'topics': obj.topics,
                    'days': obj.days,
                    'startdate': obj.startdate,
                    'enddate': obj.enddate,
                    'trainer': obj.trainer,
                    'sessions': obj.sessions};
    const id = obj._id;

    return this._http.put(`${this.uri}/training/update/${id}`, newObj, { // 'http://127.0.0.1:3000/users/update'
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  getUserTraining(userId) {
    return this._http.get(`${this.uri}/user/training/view/${userId}`);
  }

  deleteUserTraining(userId, trainingId) {
    return this._http.delete(`${this.uri}/delete/user/training/${userId}/${trainingId}`);
  }

  getTrainingUsers(trainingId) {
    return this._http.get(`${this.uri}/training/users/${trainingId}`);
  }
}
