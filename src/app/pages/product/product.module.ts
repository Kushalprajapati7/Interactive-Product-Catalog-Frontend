import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProducutAddEditComponent } from './producut-add-edit/producut-add-edit.component';
import { ProducutDetailsComponent } from './producut-details/producut-details.component';
import { ProducutListComponent } from './producut-list/producut-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProducutAddEditComponent,
    ProducutDetailsComponent,
    ProducutListComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
