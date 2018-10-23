import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  result: any;

  constructor(private _http: Http) { }
  getSportImg(n) {
    return this._http.get('/api/emocje/' + n).pipe(map(result => this.result = result.json().data));
  }
  getGeografiaImg(n) {
    return this._http.get('/api/geografia/' + n).pipe(map(result => this.result = result.json().data));
  }
  getLiteraturaImg(n) {
    return this._http.get('/api/literatura/' + n).pipe(map(result => this.result = result.json().data));
  }
  getMatematykaImg(n) {
    return this._http.get('/api/matematyka/' + n).pipe(map(result => this.result = result.json().data));
  }
  getMuzykaImg(n) {
    return this._http.get('/api/muzyka/' + n).pipe(map(result => this.result = result.json().data));
  }
  getPolskaImg(n) {
    return this._http.get('/api/polska/' + n).pipe(map(result => this.result = result.json().data));
  }
  getRoslinyImg(n) {
    return this._http.get('/api/rosliny/' + n).pipe(map(result => this.result = result.json().data));
  }
  getSport2Img(n) {
    return this._http.get('/api/sport/' + n).pipe(map(result => this.result = result.json().data));
  }
  getSwietaImg(n) {
    return this._http.get('/api/swieta/' + n).pipe(map(result => this.result = result.json().data));
  }
  getSzachyImg(n) {
    return this._http.get('/api/szachy/' + n).pipe(map(result => this.result = result.json().data));
  }
  getZwierzetaImg(n) {
    return this._http.get('/api/zwierzeta/' + n).pipe(map(result => this.result = result.json().data));
  }
  getBase64Img() {
    return this._http.get('/api/base64Img').pipe(map(result => this.result = result.json().data));
  }
  getTemplates() {
    return this._http.get('/api/templates').pipe(map(result => this.result = result.json().data));
  }
  getFont() {
    return this._http.get('/api/font').pipe(map(result => this.result = result.json().data));
  }
  testMongo() {
    return this._http.get('/api/testMongo').pipe(map(result => this.result = result.json().data));
  }
}
