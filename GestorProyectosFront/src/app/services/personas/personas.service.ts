import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(public http: HttpClient) { }
  private apiUrl = 'http://localhost:8082'; // La URL de tu servidor local

  getbyid(entity: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/personas/getbyid`,
      entity,
    );
  }

  getproyectobypersona(entity: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/personas/getproyectobypersona`,
      entity,
    );
  }

  getintegrantes(entity: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/personas/getintegrantes`,
      entity,
    );
  }
  CreateOrupdate(entity: any){
    return this.http.post(
      `${this.apiUrl}/api/personas/createorupdate`,
      entity
    );
  }

  addtoproyect(entity: any){
    return this.http.post(
      `${this.apiUrl}/api/personas/updateproyecto`,
      entity
    );
  }

  getall(){
    return this.http.get(
      `${this.apiUrl}/api/personas/getall`
    );
  }

}
