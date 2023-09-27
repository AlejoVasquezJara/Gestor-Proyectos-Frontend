import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public http: HttpClient) { }

  private apiUrl = 'http://localhost:8082'; // La URL de tu servidor local

  login(entity: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/usuarios/login`,
      entity,
    );
  }

  CreateOrupdate(entity: any){
    return this.http.post(
      `${this.apiUrl}/api/usuarios/register`,
      entity
    );
  }
}
