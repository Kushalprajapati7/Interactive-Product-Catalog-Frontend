import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryAddEditComponent } from './category-add-edit/category-add-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all-category',
    pathMatch: 'full'
  },
  {
    path: 'all-category',
    component: CategoryListComponent
  },
  {
    path: 'add-category',
    component: CategoryAddEditComponent
  },
  {
    path: 'edit-category/:id',
    component: CategoryAddEditComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
