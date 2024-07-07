import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/core/interfaces/productInterface';
import { ProductService } from 'src/app/core/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producut-details',
  templateUrl: './producut-details.component.html',
  styleUrls: ['./producut-details.component.scss']
})
export class ProducutDetailsComponent implements OnInit {
  product!: IProduct;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = params['id'];
      this.loadProductDetails(productId);
    });

  }

  loadProductDetails(productId: string) {
    this.productService.getProductById(productId).subscribe(
      (data: IProduct) => {
        this.product = data;
        console.log(this.product);

      },
      (error) => {
        console.error(error);
      }
    );

  }

  getSafeUrl(path: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(`http://localhost:3000/${path}`);
  }

  addToCart(product: IProduct): void {
    console.log(`${product.name} added to cart`);
    // Implement add to cart logic here
  }

  buyNow(product: IProduct): void {
    console.log(`Buying ${product.name} now`);
    // Implement buy now logic here
  }

  addToWishlist(product: IProduct): void {
    console.log(`${product.name} added to wishlist`);
    // Implement add to wishlist logic here
  }

  shareProduct(product: IProduct): void {
    console.log(`Sharing ${product.name}`);
    // Implement share product logic here
  }

  updateProduct(product: IProduct): void {
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
      }
    )
  }

}