import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpContext, HttpInterceptorFn} from '@angular/common/http';
import {AuthResponse} from './login/auth-response';
import {environment} from '../environments/environment';
import {User} from '../common/models/user';
import {BehaviorSubject, catchError, map, Observable, throwError} from 'rxjs';
import {CanActivateFn, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  useLocal: boolean = false;
  private currentResponse: BehaviorSubject<AuthResponse | undefined> = new BehaviorSubject<AuthResponse | undefined>(undefined)
  private AUTH_KEY = "AUTH_RESPONSE"
  private currentUser$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined)

  constructor(private http: HttpClient, private router: Router) {
    const sessionAuth = sessionStorage.getItem(this.AUTH_KEY) || localStorage.getItem(this.AUTH_KEY)
    if (sessionAuth) {
      const r: AuthResponse = JSON.parse(sessionAuth)
      this.currentResponse.next(r)
      this.currentUser$.next(r.users[0])
    }
    this.currentResponse.subscribe(response => {
      if (response) {
        (this.useLocal ? localStorage : sessionStorage).setItem(this.AUTH_KEY, JSON.stringify(response))
      } else {
        sessionStorage.clear()
        localStorage.clear()
      }
    })
  }

  get currentUser(): User | undefined {
    return this.currentUser$.value;
  }

  get token(): string | undefined {
    return this.currentResponse.value?.token
  }

  get isLogged(): boolean {
    return !!this.currentResponse.value
  }


  register(credentials: {email: string, username: string, password: string}) {
    return this.http.post(`${environment.API_URL}/auth/register`, credentials)
  }

  confirm(token: string, context?: HttpContext): Observable<void> {
    return this.http.get<void>(`/auth/activate-account?token=${encodeURIComponent(token)}`, { context });
  }

  login(credentials: {email: string, password: string}) {
    return this.http.post<AuthResponse>(`${environment.API_URL}/auth/authenticate`, credentials)
      .pipe(map(response => {
        response.users = response.users.map(user => {
          return user
        })
        this.currentResponse.next(response)
        this.currentUser$.next(response.users[0])
        this.router.navigate(['/home']).then(r => location.reload());
      }))
  }

  logout() {
    this.currentResponse.next(undefined)
    sessionStorage.clear()
    this.router.navigate(['/login'])
    location.reload();
  }

  decodeToken(token: string): any {
    try {
      let payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }
    const expirationDate = new Date(decoded.exp * 1000); // Convert seconds to milliseconds
    return expirationDate < new Date();
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
    if (err.status == 401) {
      service.logout()
    }
    return throwError(() => err)
  }));
};


export const authGuard: CanActivateFn = () => {
  let authService = inject(AuthService)
  let router = inject(Router)
  if (!authService.isLogged) {
    router.navigate(['/login'])
    return false
  }
  return authService.isLogged
}

