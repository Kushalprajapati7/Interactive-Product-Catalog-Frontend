import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProducutListComponent } from './producut-list/producut-list.component';
import { ProducutAddEditComponent } from './producut-add-edit/producut-add-edit.component';
import { ProducutDetailsComponent } from './producut-details/producut-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all-product',
    pathMatch: 'full'
  },
  {
    path: 'all-product',
    component: ProducutListComponent
  },
  {
    path: 'add-product',
    component: ProducutAddEditComponent
  },
  {
    path: 'product-Details/:id',
    component: ProducutDetailsComponent
  },
  {
    path: 'edit-product/:id',
    component: ProducutAddEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
