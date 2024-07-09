import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/core/interfaces/productInterface';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductService } from 'src/app/core/services/product.service';
import { CategoryService } from 'src/app/core/services/category.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-producut-list',
  templateUrl: './producut-list.component.html',
  styleUrls: ['./producut-list.component.scss']
})
export class ProducutListComponent implements OnInit {
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  categories: any[] = [];
  selectedCategory: string = '';
  productImageLink: string = 'http://localhost:3000';
  searchQuery: string = '';
  canAdmin: boolean = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadProductDetails();
    this.loadCategories();
    const role = this.authService.getRole();
    this.canAdmin = role === 'admin';
  }

  

  getSafeUrl(path: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(`http://localhost:3000/${path}`);
  }

  loadProductDetails(): void {
    this.productService.getAllProducts().subscribe(
      (data: IProduct[]) => {
        this.products = data;
        this.filteredProducts = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (data: any[]) => {
        this.categories = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  searchProducts(): void {
    this.filterProducts();
  }

  filterByCategory(): void {
    this.filterProducts();
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesCategory = this.selectedCategory === '' || product.category._id === this.selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  deleteProduct(product: IProduct): void {
    const prodId = product._id;
    if (!prodId) {
      throw new Error('Product not found');
    }
    this.productService.deleteProduct(prodId).subscribe(
      (response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Product Deleted Successfully",
          showConfirmButton: false,
          timer: 1000
        });
        this.loadProductDetails();
      },
      (error) => {
        console.error(error);
      });
  }

  

  addToWishlist(product: IProduct): void {
    console.log(`${product.name} added to wishlist`);
  }

  addToCart(product: IProduct): void {
    console.log(`${product.name} added to cart`);
  }

  viewProductDetails(product: IProduct): void {
    this.router.navigate(['product/product-Details', product._id]);
  }

  navigateToAddProduct(): void {
    this.router.navigate(['/product/add-product']);
  }

  editProduct(product: IProduct): void {
    console.log(`Updating ${product.name}`);
    this.router.navigate(['product/edit-product', product._id]);
  }
}
