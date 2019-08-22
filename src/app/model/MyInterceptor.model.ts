import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable , of} from 'rxjs';
import 'rxjs/add/operator/do';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(req);
    return next.handle(req).do(evt => {
      if (evt instanceof HttpResponse) {
        console.log('---> status:', evt.status);
       // console.log('---> filter:', req.params.get('filter'));
      }
    });

  }
}
// export class MyInterceptor implements HttpInterceptor {
//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     const duplicate = req.clone({ params: req.params.set('filter', 'completed') });
// console.log(req+"------interceptor");
//     return next.handle(duplicate);
//   }
// }
