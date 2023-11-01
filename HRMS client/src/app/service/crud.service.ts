import { Injectable } from '@angular/core';
import { Employee } from './Employee';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class CrudService {

  // Node/Express API
  REST_API: string = "https://hrmsserver.onrender.com/employees" || 'http://localhost:4000/employees';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) {}

  // Add
  AddEmployee(data: Employee): Observable<any> {
    let API_URL = `${this.REST_API}/add-employee`;
    return this.httpClient
      .post(API_URL, data)
      .pipe(catchError(this.handleError));
  }

  // Get all objects
  GetEmployees() {
    return this.httpClient.get(`${this.REST_API}`);
  }

  // Get single object
  GetEmployee(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/read-employee/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Update
  updateEmployee(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/update-employee/${id}`;
    return this.httpClient
      .put(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }
  // Delete
  deleteEmployee(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-employee/${id}`;
    return this.httpClient
      .delete(API_URL, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}