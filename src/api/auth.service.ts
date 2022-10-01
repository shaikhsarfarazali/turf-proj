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
    userLogin(data) {
        return this.http.post<any>(this.url + '/user/login', data);
    }

    userRegister(data) {
        return this.http.post<any>(this.url + '/user/register', data);
    }

    adminLogin(data) {
        return this.http.post<any>(this.url + 'turf/user/login', data);
    }

    adminRegister(data) {
        return this.http.post<any>(this.url + 'turf/user/register', data);
    }
}