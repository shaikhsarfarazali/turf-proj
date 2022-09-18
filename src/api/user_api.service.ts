import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseHelper } from 'src/helper/baseHelper';
import { GlobalProvider } from 'src/helper/global';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UserApiService {

    url = environment.url + '/user/';

    constructor(
        public http: HttpClient,
        public g: GlobalProvider,
        private b: BaseHelper
    ) { }

    bookTurf(ev) {
        return this.http.post<any>(this.url + 'book/turf', ev);
    }
}