import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PersonasService} from "../../../services/personas/personas.service";
import {UsersService} from "../../../services/usuarios/users.service";
import Swal from 'sweetalert2'
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private servicepersonas: PersonasService,
              private userservice: UsersService,
              public dialog: MatDialog,) {
  }

  FormPersonasandUsers = new FormGroup({
    dtcedula: new FormControl('',Validators.required),
    dtcorreo:    new FormControl('',Validators.required),
    dtdsnombre : new FormControl('', Validators.required),
    dtfenacimiento : new FormControl('',Validators.required),
    dtuser:    new FormControl('',Validators.required),
    dtpassword:    new FormControl('',Validators.required),
  });

  savedata() {
    this.servicepersonas.CreateOrupdate({
      idunicpersona: this.FormPersonasandUsers.get('dtcedula')!.value,
      dsnombre: this.FormPersonasandUsers.get('dtdsnombre')!.value,
      fenacimiento: this.FormPersonasandUsers.get('dtfenacimiento')!.value,
      }).subscribe((results) => {
        this.userservice.CreateOrupdate({
            idpersona: this.FormPersonasandUsers.get('dtcedula')!.value,
            correo: this.FormPersonasandUsers.get('dtcorreo')!.value,
            user: this.FormPersonasandUsers.get('dtuser')!.value,
            password: this.FormPersonasandUsers.get('dtpassword')!.value,
          }).subscribe((results) => {
          Swal.fire('Guardado!', '', 'success')
        });
      this.dialog.closeAll();
    });
  }

  close() {
    this.dialog.closeAll();
  }
}
