import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {SigninComponent} from "./screen/login/signin/signin.component";
import {RegisterComponent} from "./screen/login/register/register.component";
import {HomeComponent} from "./screen/home/home.component";
import {ListComponent} from "./screen/proyectos/list/list.component";
import {UserlistComponent} from "./screen/proyectos/userlist/userlist.component";
import {LiderviewComponent} from "./screen/proyectos/liderview/liderview.component";


const routes: Routes = [
  {path:'',component:SigninComponent},
  {path:'signup',component:RegisterComponent},
  {path:'home',component:HomeComponent},
  {path:'liderlist',component:LiderviewComponent},
  {path:'adminlist',component:ListComponent},
  {path:'list',component:UserlistComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
