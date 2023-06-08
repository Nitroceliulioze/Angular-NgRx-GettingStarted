import { State, getCurrentProduct, getError, getProducts, getShowProductCode } from './../state/product.reducer';
import { Component, OnInit } from '@angular/core';



import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store } from '@ngrx/store';
import * as ProductActions from '../../products/state/product.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';  

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;


  constructor(
    private store: Store<State>,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    //TODO unsubscribe
    this.store.select(getCurrentProduct).subscribe(
      (currentProduct) => (this.selectedProduct = currentProduct)
    );

    this.errorMessage$ = this.store.select(getError);

    this.products$ = this.store.select(getProducts);

    this.store.dispatch(ProductActions.loadProduct());


    //TODO unsubscribe
    this.store
      .select(getShowProductCode)
      .subscribe((showProductCode) => (this.displayCode = showProductCode));
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.setCurrentProduct({ product }));
  }
}
