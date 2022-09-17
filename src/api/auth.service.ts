import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseHelper } from 'src/helper/baseHelper';
import { GlobalProvider } from 'src/helper/global';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    url = environment.url;

    constructor(
        public http: HttpClient,
        public g: GlobalProvider,
        private b: BaseHelper
    ) { }
    turfLogin(data) {
        return this.http.post<any>(this.url + '/user/login', data);
    }

    turfRegister(data) {
        return this.http.post<any>(this.url + '/user/register', data);
    }
}