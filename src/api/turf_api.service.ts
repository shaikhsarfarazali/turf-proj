import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseHelper } from 'src/helper/baseHelper';
import { GlobalProvider } from 'src/helper/global';
import { environment } from 'src/environments/baseEnv';

@Injectable({
    providedIn: 'root',
})
export class TurfApiService {

    url = environment.url + '/public/fetch/';

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

    getBookingsById(id) {
        return this.http.get<any>(this.url + id + '/turf/booked/slots');
    }

    getAvailability(ev) {
        return this.http.post<any>(this.url + ev.turf_id + '/turf/available/' + ev.booked_date + '/' + ev.booked_from + '/' + ev.booked_to, null);
    }
}