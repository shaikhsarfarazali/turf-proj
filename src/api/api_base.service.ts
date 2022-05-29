import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseHelper } from 'src/helper/baseHelper';
import { GlobalProvider } from 'src/helper/global';

@Injectable({
  providedIn: 'root',
})
export class APIBaseService {
  constructor(
    public http: HttpClient,
    public g: GlobalProvider,
    private b: BaseHelper
  ) { }

  getHeader(params = {}) {
    return {
      headers: new HttpHeaders({
        Authorization: this.g.jws,
      }),
      params,
    };
  }
  errorHandle(err) {
    this.b.loadLoading(false);
    let message = err.error ? err.error.message : err.message;
    if (!message) message = err.error ? err.error : 'unknown error';

    this.b.toast(`${err.status}: ${message}`, 5000, `danger`);
  }

}
export let Validator = {
  'name': /^[a-zA-Z\-]+$/,
  'email': /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}
