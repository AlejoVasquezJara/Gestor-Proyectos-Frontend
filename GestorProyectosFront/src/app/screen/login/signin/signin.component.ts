import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../../services/usuarios/users.service";
import {Router} from "@angular/router";
import {PersonasService} from "../../../services/personas/personas.service";
import {LinksService} from "../../../services/routingservices/links.service";
import {UserlistComponent} from "../../proyectos/userlist/userlist.component";
import {MatDialog} from "@angular/material/dialog";
import Swal from "sweetalert2";
import {IntegrantesviewComponent} from "../../proyectos/integrantesview/integrantesview.component";
import {LiderviewComponent} from "../../proyectos/liderview/liderview.component";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{


  constructor(public dialog: MatDialog,
              private service: UsersService,
              private personasservice: PersonasService,
              private link : LinksService,
              private router: Router) {
  }

  ngOnInit(): void {
  }


  FormUsers = new FormGroup({
    nmcorreo : new FormControl('', Validators.required),
    password : new FormControl('',Validators.required)
  });

  getinfo(){
    this.service.login({correo: this.FormUsers.get('nmcorreo')!.value,
                              password: this.FormUsers.get('password')!.value}
    ).subscribe((data) => {
      this.link.setId(data.data.idpersona)

      if(data.code == 0){
        this.personasservice.getbyid(data.data.idpersona).subscribe((results) => {
              if(results.data.role == 'ADMIN'){
                this.router.navigate(['/adminlist']);
              }
              else if(results.data.role == 'INTEGRANTE'){
                const dialogRef = this.dialog.open(IntegrantesviewComponent,
                  {width: '1920px',
                    height: '1000px',
                    disableClose: false,
                    data: results.data.idproyecto});
                dialogRef.afterClosed().subscribe(result => {

                });
                // this.router.navigate(['/list']);
              } else if(results.data.role == 'LIDER'){
                this.router.navigate(['/liderlist']);
                this.link.setSecondid(results.data.idproyecto)
                // const dialogRef = this.dialog.open(LiderviewComponent,
                //   {width: '1280px',
                //     height: '600px',
                //     disableClose: false,
                //     data: results.data.idproyecto});
                // dialogRef.afterClosed().subscribe(result => {
                //
                //
              }
        });
      }
    });
  }


}
