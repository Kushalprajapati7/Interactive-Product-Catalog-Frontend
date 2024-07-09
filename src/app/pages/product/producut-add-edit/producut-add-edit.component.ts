import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { CategoryService } from 'src/app/core/services/category.service'; 
import { IProduct } from 'src/app/core/interfaces/productInterface';
import { ICategory } from 'src/app/core/interfaces/categoryInterface'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producut-add-edit',
  templateUrl: './producut-add-edit.component.html',
  styleUrls: ['./producut-add-edit.component.scss']
})
export class ProducutAddEditComponent implements OnInit {
  productForm!: FormGroup;
  selectedFile: File | null = null;
  productId: string | null = null;
  isEditing: boolean = false;
  categories: ICategory[] = []; 

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadCategories(); 

    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if (this.productId) {
        this.isEditing = true;
        this.loadProductDetails(this.productId);
      }
    });
  }

  initializeForm() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: [null, Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required] 
    });
  }

  submitForm(): void {
    if (this.productForm.valid) {
      if (this.isEditing) {
        this.updateProduct();
      } else {
        this.addProduct();
      }
    }
  }

  addProduct(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('image', this.selectedFile);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('category', this.productForm.get('category')?.value);

      this.productService.addProduct(formData as any).subscribe(
        response => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Product Added Successfully",
            showConfirmButton: false,
            timer: 1000
          });
          this.router.navigate(['product/all-product']);
        },
        error => {
          console.error('Error adding Product:', error);
        }
      );
    }
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      this.selectedFile = target.files[0];
    }
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.productForm.controls[controlName].touched && this.productForm.controls[controlName].hasError(errorName);
  }

  updateProduct(): void {
    if (this.productId && this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('category', this.productForm.get('category')?.value);

      formData.append('image', this.selectedFile);

      this.productService.updateProduct(this.productId, formData as any).subscribe(
        response => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Product Updated Successfully",
            showConfirmButton: false,
            timer: 1000
          });
          this.router.navigate(['product/all-product']);
        },
        error => {
          console.error('Error updating Product:', error);
        }
      );
    }
  }

  loadProductDetails(productId: string): void {
    this.productService.getProductById(productId).subscribe(
      (product: IProduct) => {
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category 
        });
        this.selectedFile = null;
      },
      (error) => {
        console.error('Error loading Product details:', error);
      }
    );
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (categories: ICategory[]) => {
        this.categories = categories;        
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }
}
