import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs/operators';
import { domain } from 'src/environments/environment';
import { APIBaseService } from './api_base.service';

@Injectable({
  providedIn: 'root',
})
export class PublicApiService extends APIBaseService {
  namespace = 'api.php';
  async list(json) {
    const params = json || {};
    const options = { ...this.getHeader(), params };
    const url = `${domain}/${this.namespace}/list`;
    return this.http.get(url, options).pipe(
      map((results) => results),
      catchError((error) => {
        this.errorHandle(error);
        return Promise.resolve({ ok: false });
      })
    );
  }

  async add(data) {
    const url = `${domain}/${this.namespace}/add`;
    return this.http.post(url, data, this.getHeader()).pipe(
      map((results) => results),
      catchError((error) => {
        this.errorHandle(error);
        return Promise.resolve({ ok: false });
      })
    );
  }

  async login(data) {
    const url = `${domain}/${this.namespace}`;
    data['api'] = 'public/customer/login';
    return this.http.post(url, data).pipe(
      map((results) => results),
      catchError((error) => {
        this.errorHandle(error);
        return Promise.resolve({ ok: false });
      })
    );
  }

  async register(data) {
    const url = `${domain}/${this.namespace}`;
    data['api'] = 'public/customer/register';
    return this.http.post(url, data).pipe(
      map((results) => results),
      catchError((error) => {
        this.errorHandle(error);
        return Promise.resolve({ ok: false });
      })
    );
  }

  async get(id) {
    const url = `${domain}/${this.namespace}/${id}/get`;
    return this.http.get(url, this.getHeader()).pipe(
      map((results) => results),
      catchError((error) => {
        this.errorHandle(error);
        return Promise.resolve({ ok: false });
      })
    );
  }
}
