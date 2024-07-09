import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/core/interfaces/categoryInterface';
import { AuthService } from 'src/app/core/services/auth.service';
import { CategoryService } from 'src/app/core/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories: ICategory[] = []; 
  isAdmin:boolean=false;
  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private authService:AuthService
  ){}

  ngOnInit(): void {
    this.loadCategoryDetails();
    const role = this.authService.getRole();
    this.isAdmin = role === 'admin';
  }

  loadCategoryDetails(){
    this.categoryService.getAllCategories().subscribe(
      (categories: ICategory[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }


  deleteCategory(category: ICategory) {
    const categoryId = category._id;
    if (!categoryId) {
      throw new Error('Category not found')
    }
    this.categoryService.deleteCategory(categoryId).subscribe(
      (response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Category Deleted Successfully",
          showConfirmButton: false,
          timer: 1000
        });
        this.categories = this.categories.filter((u) => u._id !== category._id);
      },
      (error) => {
        console.error(error);
      }
    )
  }

  navigateToAddCategoryAdd(){
    this.router.navigate(['category/add-category'])
  }
  navigateToAddCategoryEdit(category:ICategory){
    this.router.navigate(['category/edit-category',category._id])

  }
}
