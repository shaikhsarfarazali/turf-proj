import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable()

export class Tokeninterceptor implements HttpInterceptor {
    constructor(private router: Router, private storage: Storage) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.storage.create();
        let token: string = JSON.parse(localStorage.getItem('userToken'));
        req = req.clone({
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + token,
                // 'Content-Type': 'application/json',
                // 'accept': '*/*',
                // 'responseType': 'text',
                // 'observe': 'response'
            })
        });

        return next.handle(req).pipe(
            catchError((error) => {

                let handled: boolean = false;
                console.error(error);
                if (error instanceof HttpErrorResponse) {
                    if (error.error instanceof ErrorEvent) {
                        console.error("Error Event");
                    } else {
                        // console.log(`error status : ${error.status} ${error.statusText}`);
                        // switch (error.status) {
                        //     case 401:      //login
                        //         this.router.navigateByUrl("/home");
                        //         console.log(`redirect to login`);
                        //         handled = true;
                        //         break;
                        //     case 403:     //forbidden
                        //         this.router.navigateByUrl("/home");
                        //         console.log(`redirect to login`);
                        //         handled = true;
                        //         break;
                        // }
                    }
                }
                else {
                    console.error("Other Errors");
                }

                if (handled) {
                    console.log('return back ');
                    return of(error);
                } else {
                    console.log('throw error back to to the subscriber');
                    return throwError(error);
                }

            })
        )
    }
}