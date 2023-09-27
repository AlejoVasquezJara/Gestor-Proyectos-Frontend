import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {ProyectosService} from "../../../services/proyectos/proyectos.service";
import {Router} from "@angular/router";
import {UserlistComponent} from "../userlist/userlist.component";
import {AddintegranteComponent} from "../addintegrante/addintegrante.component";
import {AddproyectComponent} from "../addproyect/addproyect.component";
import {RegisterComponent} from "../../login/register/register.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['nombreproyecto', 'Descripcion', 'Acciones'];
  constructor(public dialog: MatDialog,
              public fb: FormBuilder,
              public proyectoservice: ProyectosService,
              private router: Router) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.sendSearch();
  }

  sendSearch() {
    this.proyectoservice.getAll().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result.data);
    });
  }

  Delete(element: any) {
    this.proyectoservice.delete(element.idunicproyecto).subscribe((result) => {
      Swal.fire({
        title: '¿Esta seguro de Eliminar Proyecto?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
  
          Swal.fire('Eliminado Correctamente!', '', 'success')
          this.sendSearch()
        } else if (result.isDenied) {
          Swal.fire('Error al Eliminar', '', 'info')
        }
      })
      
    })
  }

  View(element: any) {
    const dialogRef = this.dialog.open(UserlistComponent,
      {width: '600px',
        height: '300px',
        disableClose: false,
        data: element});
    dialogRef.afterClosed().subscribe(result => {
      this.dialog.closeAll();
      this.sendSearch()
    });
  }

  crearusuarios() {
    const dialogRef = this.dialog.open(RegisterComponent,
      {width: '1280px',
        height: '640px',
        disableClose: false,
      });
    dialogRef.afterClosed().subscribe(result => {
      this.dialog.closeAll();
      this.sendSearch()
    });
  }

  closesesion(){
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

  create(element: any) {
    const dialogRef = this.dialog.open(AddintegranteComponent,
      {width: '600px',
        height: '300px',
        disableClose: false,
        data: element});
    dialogRef.afterClosed().subscribe(result => {
      this.dialog.closeAll();
      this.sendSearch()
    });
  }

  makeproyect() {
    const dialogRef = this.dialog.open(AddproyectComponent,
      {width: '600px',
        height: '300px',
        disableClose: false,
        });
    dialogRef.afterClosed().subscribe(result => {
      this.dialog.closeAll();
      this.sendSearch()
    });
  }
}
