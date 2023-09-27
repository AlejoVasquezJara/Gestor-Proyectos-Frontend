import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ProyectosService} from "../../../services/proyectos/proyectos.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import Swal from "sweetalert2";


@Component({
  selector: 'app-addproyect',
  templateUrl: './addproyect.component.html',
  styleUrls: ['./addproyect.component.css']
})

export class AddproyectComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              public fb: FormBuilder,
              public service: ProyectosService) {
              this.form.patchValue({
                idproyecto: this.data
              });

  }

  form = this.fb.group({
    idproyecto: [''],
    dsproyecto:['', [Validators.required]],
    descripcion: ['', [Validators.required]],
  });

  save(){

    Swal.fire({
      title: '¿Desea Crear este Proyecto?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Crear',
      denyButtonText: `No Crear`,
    }).then((result) => {
      if (result.isConfirmed) {

        this.service.CreateOrupdate({
          idunicproyecto:this.form.get('idproyecto')!.value,
          dsproyecto: this.form.get('dsproyecto')!.value,
          descripcion: this.form.get('descripcion')!.value,
        }).subscribe((result) => {

        });

        Swal.fire('Creado!', '', 'success')
        this.dialog.closeAll();
      } else if (result.isDenied) {
        Swal.fire('Los cambios no han sido guardados', '', 'info')
        this.dialog.closeAll();
      }
    })

  }

}
