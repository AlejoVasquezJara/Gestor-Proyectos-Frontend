import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PersonasService} from "../../../services/personas/personas.service";
import {LinksService} from "../../../services/routingservices/links.service";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {AddproyectComponent} from "../addproyect/addproyect.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liderview',
  templateUrl: './liderview.component.html',
  styleUrls: ['./liderview.component.css']
})
export class LiderviewComponent implements OnInit{


  constructor(
              public dialog: MatDialog,
              public fb: FormBuilder,
              public personasservice: PersonasService,
              private link : LinksService,
              private router: Router) {
    this.dataSource = new MatTableDataSource();
    console.log(this.link.getSecondid())
  }

  ngOnInit(): void {
    this.sendSearch();
    this.getintegrantes();
  }

  dataSource: MatTableDataSource<any>;
  displayedColumns2: string[] = ['Nombre', 'role'];

  form = new FormGroup({
    nmproyecto: new FormControl('',Validators.required),
    descripcion:  new FormControl('',Validators.required),
    idproyecto: new FormControl('',Validators.required)
  });
  getintegrantes() {
    this.personasservice.getintegrantes(this.link.getSecondid()).subscribe((result2) => {
      this.dataSource = new MatTableDataSource(result2.data);
    });
  }

  sendSearch() {
    this.personasservice.getproyectobypersona(this.link.getId()).subscribe((result) => {
      console.log(result.data[0])
      this.form.patchValue({
        idproyecto:result.data.idunicproyecto,
        descripcion:result.data.descripcion,
        nmproyecto:result.data.dsproyecto
      });

      const input1 = document.getElementById('input1') as HTMLInputElement;
      const input2 = document.getElementById('input2') as HTMLInputElement;

      input1.value = result.data[0].descripcion;
      input2.value = result.data[0].dsproyecto;

    });
  }

  closesesion() {
    Swal.fire({
      title: '¿Desea Cerrar Sesion?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire('Cerrado Exitosamente!', '', 'success')
        this.router.navigate(['']);
      } else if (result.isDenied) {
        Swal.fire('No se Pudo Cerrar Sesion', '', 'info')
      }
    })
  }


  editproyecto() {
    const dialogRef = this.dialog.open(AddproyectComponent,
      {width: '600px',
        height: '300px',
        disableClose: false,
        data: this.link.getSecondid()
      });
    dialogRef.afterClosed().subscribe(result => {
      this.dialog.closeAll();
      this.sendSearch()
      this.getintegrantes();
    });
  }
}
