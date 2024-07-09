import { Component, OnInit } from '@angular/core'
import { ICategory } from 'src/app/core/interfaces/categoryInterface';
import { IProduct } from 'src/app/core/interfaces/productInterface';
import { IUser } from 'src/app/core/interfaces/userInterface';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalUsers: number = 0;
  totalProduct: number = 0;
  totalCategory: number = 0;
  recentAddedProduct: any | null = ''
  recentAddedCategoty: any | null = ''
  constructor(
    private userService: UserService,
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }
  ngOnInit(): void {
    this.loadTotalUsers();
    this.loadTotalProducts();
    this.loadTotalCategory();
    this.loadRecentAddedProduct();
    this.loadRecentAddedCategory();
  }

  loadTotalUsers(): void {
    this.userService.allUser().subscribe(
      (users: IUser[]) => {
        this.totalUsers = users.length;
      },
      (error) => {
        console.error('Error loading total users:', error);
      }
    );
  }

  loadTotalProducts(): void {
    this.productService.getAllProducts().subscribe(
      (products: IProduct[]) => {
        this.totalProduct = products.length;
      },
      (error) => {
        console.error('Error loading total products:', error);
      }
    )
  }

  loadTotalCategory(): void {
    this.categoryService.getAllCategories().subscribe(
      (category: ICategory[]) => {
        this.totalCategory = category.length;
      },
      (error) => {
        console.error('Error loading total categories:', error);
      }
    )
  }


  loadRecentAddedProduct(): void {
    this.productService.getAllProducts().subscribe(
      (data: IProduct[]) => {
        this.recentAddedProduct = data.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.category).getTime();
        }).slice(0, 5);
        ;
        // console.log(this.recentAddedProduct);

      },
      (error) => {
        console.error('Error loading recent Product:', error);
      }
    );

  }

  loadRecentAddedCategory(): void {
    this.categoryService.getAllCategories().subscribe(
      (data: ICategory[]) => {
        this.recentAddedCategoty = data.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }).slice(0, 5);
      },
      (error) => {
        console.error('Error loading recent Category:', error);
      }
    )
  }



}
