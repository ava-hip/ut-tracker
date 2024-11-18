import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpContext, HttpInterceptorFn} from '@angular/common/http';
import {AuthResponse} from './login/auth-response';
import {environment} from '../environments/environment';
import {User} from '../common/models/user';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: {email: string, password: string}) {
    return this.http.post<AuthResponse>(`${environment.API_URL}/auth/authenticate`, credentials)
  }

  register(credentials: {email: string, username: string, password: string}) {
    return this.http.post(`${environment.API_URL}/auth/register`, credentials)

  }

  set token(token: string) {
    localStorage.setItem('token', token);
  }

  get token(): string {
    return <string> localStorage.getItem('token')
  }

  set users(users: User[]) {
    localStorage.setItem('users', JSON.stringify(users))
  }

  get users(): User[] {
    const userData = localStorage.getItem('users');
    return userData ? JSON.parse(userData) : [];
  }

  get currentUser(): User | null {
    return this.users.length > 0 ? this.users[0] : null;
  }

  confirm(token: string, context?: HttpContext): Observable<void> {
    return this.http.get<void>(`/auth/activate-account?token=${encodeURIComponent(token)}`, { context });
  }

  logout() {
    return null
  }

}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const service = inject(AuthService);
  const token = service.token
  if (token && req.url.startsWith(environment.API_URL)) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }
  return next(req).pipe(catchError(err => {
    if (/*err.status == 401*/ err.error.message === "Erreur : jeton malformé !") {
      service.logout()
    }
    return throwError(() => err)
  }));
};
