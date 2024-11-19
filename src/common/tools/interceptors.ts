import {HttpInterceptorFn} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {inject} from '@angular/core';
import {AuthService} from '../../auth/auth.service';

export const backendInterceptor: HttpInterceptorFn = (req, next) => {
  const url: string = req.url;
  if (url.startsWith("/")) req = req.clone({url: environment.API_URL + url})
  return next(req);
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authResponse = sessionStorage.getItem('AUTH_RESPONSE');
  if (authResponse) {
    const authService = inject(AuthService)
    const { token } = JSON.parse(authResponse);
    if (authService.isTokenExpired(token)) {
      authService.logout()
      return new Observable();
    }
  }
  return next(req);
}



