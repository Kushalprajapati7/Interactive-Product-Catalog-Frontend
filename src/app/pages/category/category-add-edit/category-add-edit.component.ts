import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/core/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-add-edit',
  templateUrl: './category-add-edit.component.html',
  styleUrls: ['./category-add-edit.component.scss']
})
export class CategoryAddEditComponent {
  categoryForm!: FormGroup;
  categoryId: string | null = null;
  isEditing: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('id');
      if (this.categoryId) {
        this.isEditing = true;
        this.loadEventDetails(this.categoryId);
      }
    });
  }

  initializeForm() {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.categoryForm.valid) {
      if (this.isEditing) {
        this.updateEvent();
      } else {
        this.addEvent();
      }
    }
  }

  addEvent(): void {
    this.isEditing = false
    const category: any = {
      name: this.categoryForm.get('name')?.value,
      description:this.categoryForm.get('description')?.value,
    }
    this.categoryService.addCategory(category).subscribe(
      response => {
        console.log(response,"event");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Event Added Successfully",
          showConfirmButton: false,
          timer: 1000
        });
        this.router.navigate(['category/all-category']);
      },
      error => {
        console.error('Error adding Event:', error);
      }
    );
  }

  loadEventDetails(categoryId: string): void {
    this.categoryService.getCategoryById(categoryId).subscribe(
      event => {
        this.categoryForm.patchValue({
          name: event.name,
          description: event.description,
        });
      },
      error => {
        console.error('Error loading Category details:', error);
      }
    );
  }

  updateEvent(): void {
    if (this.categoryId) {
      this.categoryService.updateCategory(this.categoryId, this.categoryForm.value).subscribe(
        response => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Category Updated Successfully",
            showConfirmButton: false,
            timer: 1000
          });
          this.router.navigate(['category/all-category']);
        },
        error => {
          console.error('Error updating Event:', error);
        }
      );
    }
  }

  

  hasError(controlName: string, errorName: string): boolean {
    return this.categoryForm.controls[controlName].touched && this.categoryForm.controls[controlName].hasError(errorName);
  }
}
