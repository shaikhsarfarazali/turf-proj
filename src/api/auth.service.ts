import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseHelper } from 'src/helper/baseHelper';
import { GlobalProvider } from 'src/helper/global';
import { environment } from 'src/environments/baseEnv';
import * as $ from "jquery";
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

    verifyToken(data) {
        return this.http.post<any>(this.url + '/user/verify-email', data);
    }

    userRegister(data) {
        var form = new FormData();
        form.append("email", data.email);
        form.append("password", data.password);
        form.append("name", data.name);
        form.append("mobile_no", data.mobile_no);

        var settings: any = {
            "url": this.url + '/user/register',
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    }

    adminLogin(data) {
        return this.http.post<any>(this.url + 'turf/user/login', data);
    }

    adminRegister(data) {
        return this.http.post<any>(this.url + 'turf/user/register', data);
    }
}