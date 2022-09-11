import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseHelper } from 'src/helper/baseHelper';
import { GlobalProvider } from 'src/helper/global';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TurfApiService {

    url = environment.url + '/public/fetch/';

    credsUrl = environment.url;

    constructor(
        public http: HttpClient,
        public g: GlobalProvider,
        private b: BaseHelper
    ) { }

    getTurfList() {
        return this.http.get<any>(this.url + 'all/turf');
    }

    getTurfById(id) {
        return this.http.get<any>(this.url + id + 'turf');
    }

    getSearchedTurf(search) {
        return this.http.get<any>(this.url + 'turf/search/' + search);
    }

    getResourceById(id) {
        return this.http.get<any>(this.url + id + '/turf/graphics');
    }

    turfLogin(data) {
        return this.http.post<any>(this.credsUrl + '/user/login', data);
    }
}