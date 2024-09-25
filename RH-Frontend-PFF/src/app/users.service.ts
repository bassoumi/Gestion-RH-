import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import User from './User';
import demande from './demande';
import formation from './formation';

import { AdminActionDemande } from './adminactionDemande';
import request from './request';
import interssee from './interssee';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url: string = "http://localhost:8000/api/users/"; 
/*   private searchUrl: string = "http://localhost:8000/api/search/"; */

  constructor(private http: HttpClient, private router: Router) {}
  isSuperUser: boolean = false;
  isAuthenticated: boolean = false;

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}${id}/`);
  }

 addUser(data: any): Observable<any> {
    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }
    return this.http.post<any>(this.url, formData);
  }

  

  private apiUrlDemande = 'http://localhost:8000/api/leave_requests/'; 
  addDemande(data: demande): Observable<any> {
    return this.http.post<demande>(this.apiUrlDemande, data).pipe(
      tap(response => {
        console.log('Demande response:', response); 
      }),
      catchError(error => {
        console.error('Failed to add demande', error);
        return throwError(error);
      })
    );
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const data = { old_password: oldPassword, new_password: newPassword };
    console.log(`Sending change password request with data: ${JSON.stringify(data)}`);
    return this.http.post<any>(`${this.apiUrl1}/change-password/`, data).pipe(
        catchError(error => {
            console.error('Change password request failed', error);
            return throwError(error);
        })
    );
      }

  getDemandes(): Observable<demande[]> {
    return this.http.get<demande[]>(this.apiUrlDemande);
  }
  getAllDemandes(username: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl1}/get_all_demandes/`, { username });
  }
  getAllDemandesAdmin(): Observable<AdminActionDemande[]> {
    return this.http.get<{ demandes: AdminActionDemande[] }>(`${this.apiUrl1}/get_all_demandes_admin/`).pipe(
      map(response => response.demandes)
    );
  }

  private apiUrlFormation = 'http://127.0.0.1:8000/api/add-formation/';
  addFormation(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrlFormation}`, formData);
  }
  getAllRequestAdmin(): Observable<request[]> {
    return this.http.get<{ demandes: request[] }>(`${this.apiUrl1}/get_all_request_admin/`).pipe(
      map(response => response.demandes)
    );
  }
 
  getAllInterssent(): Observable<interssee[]> {
    return this.http.get<interssee[]>(`${this.apiUrl1}/all-intersse/`);
  }
  getAllformationAdmin(): Observable<formation[]> {
    return this.http.get<formation[]>(`${this.apiUrl1}/admin-formations/`);
  }
  getAllformationUser(): Observable<formation[]> {
    return this.http.get<formation[]>(`${this.apiUrl1}/user-formations/`);
  }

  saveInterssee(username: string, title: string): Observable<any> {
    const body = { username: username, title: title };
    return this.http.post<any>(`${this.apiUrl1}/all-intersse/`, body);
  }

  deleteFormation(formationId: number): Observable<any> {
    const url = `${this.apiUrl1}/admin-formations/${formationId}/`;
    return this.http.delete(url);
}

  logAction(action: string, user: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/log_action/`, { action, user });
  }
  approuverDemande(demande: demande): Observable<any> {
    return this.http.post(`${this.apiUrl1}/demandes/approve/`, demande);
  }

 rejeterDemande(demande: demande): Observable<any> {
    return this.http.post(`${this.apiUrl1}/demandes/reject/`, demande);
  }
  updateUser(id: number, formData: FormData): Observable<User> {
    return this.http.put<User>(`${this.url}${id}/`, formData);
  }

  deleteUserById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}${id}/`);
  }

  searchUsers(phone: string, department: string): Observable<User[]> {
    let params = new HttpParams();
    if (phone) {
      params = params.set('phone', phone);
    }
    if (department) {
      params = params.set('department', department);
    }
    return this.http.get<User[]>(`${this.apiUrl1}/users/search`, { params });
  }

  private apiUrl = 'http://localhost:8000/api/token/';
/*   private logoutUrl = 'http://localhost:8000'; */
  private apiUrl1 = 'http://localhost:8000/api';

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      tap(response => {
        console.log('Login response:', response);  
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
        if (response.user_image) {
          localStorage.setItem('user_image', response.user_image); 
        }
      }),
      catchError(error => {
        console.error('Login failed', error);
        return throwError(error);
      })
    );
  }
  logout(refreshToken: string) {
    return this.http.post(`${this.apiUrl1}/logout/`, { refresh: refreshToken });
  }

  getToken(): string {
    return localStorage.getItem('access_token') || '';
  }

  private checkSuperUserUrl = 'http://localhost:8000/api/check_superuser/';


  checkSuperUser(): Observable<{ is_superuser: boolean }> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return throwError('Token not found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<{ is_superuser: boolean }>(this.checkSuperUserUrl, { headers }).pipe(
      tap(response => {
        this.isSuperUser = response.is_superuser;
      }),
      catchError(error => {
        console.error('Error checking superuser status:', error);
        return throwError(error);
      })
    );
  }
  deleteAllDemandes(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl1}/delete_all_demandes/`);
  }
  deleteDemande(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl1}/demandes/${id}/`);
  }
  checkAuthenticated(): Observable<void> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return of(undefined);
    }
    return this.http.get<{ is_superuser: boolean }>(this.checkSuperUserUrl)
      .pipe(
        map(response => {
          this.isSuperUser = response.is_superuser;
          this.isAuthenticated = true;
        }),
        catchError(() => {
          this.isAuthenticated = false;
          return of(undefined);
        })
      );
  }
  
}
