import { Component, OnInit } from '@angular/core';
import { NgForm } from '../../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  constructor() { }

  onSubmit(form: NgForm) {
    let { name, capacity } = form.value;
    if (capacity <= 0) { capacity *= -1; }

  }
  ngOnInit() {
  }

}
