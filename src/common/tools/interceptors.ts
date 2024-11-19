import {HttpInterceptorFn} from '@angular/common/http';
import {environment} from '../../environments/environment';

export const backendInterceptor: HttpInterceptorFn = (req, next) => {
  const url: string = req.url;
  if (url.startsWith("/")) req = req.clone({url: environment.API_URL + url})
  return next(req);
}



