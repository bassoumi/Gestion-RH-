import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from './users.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private authService: UsersService, private router: Router) {}

  canActivate(): Observable<boolean> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.router.navigate(['/']);
      return of(false);
    }

    return this.authService.checkSuperUser().pipe(
      map(() => true),
      catchError(() => {
        this.router.navigate(['/']);
        return of(false);
      })
    );
  }
}
