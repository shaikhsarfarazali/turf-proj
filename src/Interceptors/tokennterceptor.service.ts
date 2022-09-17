import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class Tokeninterceptor implements HttpInterceptor {
    constructor(private router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = '2|x0spPHta02EuK13qjB7HZaYdcwZE5zvMejTuHrwu';
        req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });

        return next.handle(req).pipe(
            catchError((error) => {

                let handled: boolean = false;
                console.error(error);
                if (error instanceof HttpErrorResponse) {
                    if (error.error instanceof ErrorEvent) {
                        console.error("Error Event");
                    } else {
                        console.log(`error status : ${error.status} ${error.statusText}`);
                        switch (error.status) {
                            case 401:      //login
                                this.router.navigateByUrl("/home");
                                console.log(`redirect to login`);
                                handled = true;
                                break;
                            case 403:     //forbidden
                                this.router.navigateByUrl("/home");
                                console.log(`redirect to login`);
                                handled = true;
                                break;
                        }
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