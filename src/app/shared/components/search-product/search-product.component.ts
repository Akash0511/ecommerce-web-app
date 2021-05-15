import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {

  @Output() searchText: EventEmitter<string> = new EventEmitter();

  searchForm!: FormGroup;

  searchNameControl!: FormControl;

  constructor() { }

  ngOnInit(): void {
    this.searchNameControl = new FormControl('', [Validators.minLength(1)]);

    this.searchForm = new FormGroup({
      searchName: this.searchNameControl
    });
  }

  getControlValidationClasses(control: FormControl): any {
    return {
      'is-invalid': control.touched && control.invalid,
      'is-valid': control.touched && control.valid
    };
  }

  searchProductByName(searchString: string): void {
    this.searchText.emit(searchString);
  }

  onSearchSubmit(): void {
    this.searchText.emit(this.searchForm.value.searchName);
  }

}
