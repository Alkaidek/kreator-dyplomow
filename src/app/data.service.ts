import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  result: any;

  constructor(private _http: Http) { }
  getUser() {
    return this._http.get('/api/user').pipe(map(result => this.result = result.json().data));
  }
  getSportImg() {
    return this._http.get('/api/sport').pipe(map(result => this.result = result.json().data));
  }
}
