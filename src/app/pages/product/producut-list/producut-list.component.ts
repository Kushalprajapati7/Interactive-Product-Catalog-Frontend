import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/core/interfaces/productInterface';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-producut-list',
  templateUrl: './producut-list.component.html',
  styleUrls: ['./producut-list.component.scss']
})
export class ProducutListComponent implements OnInit {
  products:IProduct[] = [];
  productImageLink:string = 'http://localhost:3000';

  constructor(
    private productService:ProductService,
    private sanitizer: DomSanitizer,
    private router:Router

  ){}


  ngOnInit(): void {
    this.loadProductDetails();
  }
  getSafeUrl(path: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(`http://localhost:3000/${path}`);
  }


  loadProductDetails(){
    this.productService.getAllProducts().subscribe(
      (data:IProduct[])=>{
        this.products = data;
        console.log(this.products);
      },
      (error) => {
        console.error(error);
      }
    )
  }

  addToWishlist(product: IProduct): void {
    console.log(`${product.name} added to wishlist`);
  }

  addToCart(product: IProduct): void {
    console.log(`${product.name} added to cart`);
  }

  viewProductDetails(product:IProduct){
    this.router.navigate(['product/product-Details',product._id])
  }

  navigateToAddProduct(): void {
    this.router.navigate(['/product/add-product']);
  }



}
