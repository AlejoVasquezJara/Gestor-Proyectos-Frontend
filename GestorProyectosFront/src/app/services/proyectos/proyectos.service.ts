import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(public http: HttpClient) { }

  private apiUrl = 'http://localhost:8082'; // La URL de tu servidor local

  getAll(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/api/proyectos/getall`
    );
  }

  CreateOrupdate(entity: any){
    return this.http.post(
      `${this.apiUrl}/api/proyectos/createorupdate`,
      entity
    );
  }

  delete(id: any){
    return this.http.delete(
      `${this.apiUrl}/api/proyectos/delete/${id}`,
    );
  }
}
