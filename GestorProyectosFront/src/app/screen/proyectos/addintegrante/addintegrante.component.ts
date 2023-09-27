import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {PersonasService} from "../../../services/personas/personas.service";
import {Personas} from "../../enviroments/Personas";
import {environment} from "../../enviroments/enviroment";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-addintegrante',
  templateUrl: './addintegrante.component.html',
  styleUrls: ['./addintegrante.component.css']
})
export class AddintegranteComponent implements OnInit{


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public fb: FormBuilder,
              public personasservice: PersonasService,
              public dialog: MatDialog,
              ) {
  }

  personas: Array<Personas> = [];
  roles:any = environment.ROLE;


  ngOnInit(): void {
    this.personasservice
      .getall()
      .subscribe((rta: any) => (this.personas = rta.data));

  }

  form = this.fb.group({
    idproyecto:['', [Validators.required]],
    idpersona: ['', [Validators.required]],
    role: ['', [Validators.required]],
  });


  save() {
    this.form.patchValue({
      idproyecto:this.data.idunicproyecto,
    });

    console.log(      {idunicpersona: this.form.get('idpersona')!.value,
      idproyecto: this.form.get('idproyecto')!.value,
      role: this.form.get('role')!.value,})

    this.personasservice.addtoproyect({
      idunicpersona: this.form.get('idpersona')!.value,
      idproyecto: this.form.get('idproyecto')!.value,
      role: this.form.get('role')!.value,
    }).subscribe((result) => {
      this.dialog.closeAll();
    });
  }
}
