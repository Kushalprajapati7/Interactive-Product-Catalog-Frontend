import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';

const routes: Routes = [
  {
    path:'',
    component: NavbarComponent,
    loadChildren:()=>import('./pages/page.module').then(m=>m.PageModule)
  },
  {
    path:'auth',
    loadChildren:()=>import('./authentication/authentication.module').then(m=>m.AuthenticationModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
