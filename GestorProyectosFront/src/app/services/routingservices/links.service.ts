import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  id: any;
  secondid: any;


  constructor() {
  }

  getId(): any {
    return this.id;
  }

  setId(value: any) {
    this.id = value;
  }

  getSecondid(): any {
    return this.secondid;
  }

  setSecondid(value: any) {
    this.secondid = value;
  }



}
