import {Component, Inject, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProyectosService} from "../../../services/proyectos/proyectos.service";
import {Router} from "@angular/router";
import {PersonasService} from "../../../services/personas/personas.service";
import {LinksService} from "../../../services/routingservices/links.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit{
  ngOnInit(): void {
    this.sendSearch();
    this.getintegrantes();
  }

  dataSource: MatTableDataSource<any>;
  displayedColumns2: string[] = ['Nombre', 'role', 'Eliminar'];

  form = new FormGroup({
    nmproyecto: new FormControl('',Validators.required),
    descripcion:  new FormControl('',Validators.required),
    idproyecto: new FormControl('',Validators.required)
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              public fb: FormBuilder,
              public personasservice: PersonasService,
              private link : LinksService,
              private router: Router) {
    this.dataSource = new MatTableDataSource();
    console.log(data)
  }

  sendSearch() {
    this.personasservice.getproyectobypersona(this.link.getId()).subscribe((result) => {
      console.log(result.data)
      this.form.patchValue({
        idproyecto:this.data.idunicproyecto,
        descripcion:this.data.descripcion,
        nmproyecto: this.data.dsproyecto
      });

      const input1 = document.getElementById('input1') as HTMLInputElement;
      const input2 = document.getElementById('input2') as HTMLInputElement;

      input1.value = this.data.descripcion;
      input2.value = this.data.dsproyecto;

    });
  }

  getintegrantes() {
    this.personasservice.getintegrantes(this.data.idunicproyecto).subscribe((result2) => {
      this.dataSource = new MatTableDataSource(result2.data);
    });
  }

  Delete(element: any) {
    console.log(element)

    Swal.fire({
      title: '¿Esta seguro de Eliminar este Usuario?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire('Eliminado Correctamente!', '', 'success')
        this.personasservice.addtoproyect({
          idunicpersona: element.idunicpersona,
          idproyecto: null,
          role: null,
        }).subscribe((result) => {
            this.getintegrantes()
        });
      } else if (result.isDenied) {
        Swal.fire('Error al Eliminar', '', 'info')
      }
    })
    

  }
}
