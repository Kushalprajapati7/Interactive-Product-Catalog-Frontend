import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/core/interfaces/productInterface';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductService } from 'src/app/core/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producut-list',
  templateUrl: './producut-list.component.html',
  styleUrls: ['./producut-list.component.scss']
})
export class ProducutListComponent implements OnInit {
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  productImageLink: string = 'http://localhost:3000';
  searchQuery: string = '';
  canAdmin: boolean = false;

  constructor(
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadProductDetails();
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
        console.log(data);
        
        this.filteredProducts = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  searchProducts(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
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
    this.router.navigate(['product/edit-product', product._id])
  }

  deleteProduct(product: IProduct): void {
    console.log(`Deleting ${product.name}`);
    if (!product._id) {
      throw new Error('Product not found')

    }
    this.productService.deleteProduct(product._id).subscribe(
      (response) => {
        this.products = this.products.filter((u) => u._id !== product._id);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Product Deleted Successfully",
          showConfirmButton: false,
          timer: 1000
        });
        this.router.navigate(['product/all-product']);
      },
      (error) => {
        console.error(error);
      })
  }
}
