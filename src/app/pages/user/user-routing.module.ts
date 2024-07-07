import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all-users',
    pathMatch: 'full'
  },
  {
    path: 'all-users',
    component: UserListComponent
  },
  {
    path: 'add-user',
    component: UserAddEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
