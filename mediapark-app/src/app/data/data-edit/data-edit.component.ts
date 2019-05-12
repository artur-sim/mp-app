import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataComponentService } from 'src/app/services/data.service';
import { Route, Params, ActivatedRoute, Router } from '@angular/router';
import { DataInfo } from 'src/app/models/data.model';

@Component({
  selector: 'app-data-edit',
  templateUrl: './data-edit.component.html',
  styleUrls: ['./data-edit.component.css']
})
export class DataEditComponent implements OnInit {
  id: string
  editMode = false;
  editItemForm: FormGroup;

  constructor(private dataComponentService: DataComponentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;

      this.initForm();
    })


  }

  private initForm() {
    let product = '';
    let brand = '';
    let remainder = '';


    if (this.editMode) {
      let item = this.dataComponentService.getSingleItem(this.id).subscribe(data => {
        console.log(data)
        product = data.product;
        brand = data.brand;
        remainder = data.remainder;

        this.editItemForm = new FormGroup({
          'product': new FormControl(product, [Validators.required, Validators.minLength(3)]),
          'brand': new FormControl(brand, [Validators.required, Validators.minLength(3)]),
          'remainder': new FormControl(remainder, [Validators.required]),
        })
      });
    }
  }

  onSubmitItemEdited() {
    console.log(this.editMode)
    const newItem = new DataInfo(this.editItemForm.value['product'], this.editItemForm.value['brand'], this.editItemForm.value['remainder'])
    if (this.editMode) {
      this.dataComponentService.updateItem(this.id, newItem);

      // console.log(this.id)
    }

    this.router.navigate(['../'], { relativeTo: this.route })
  }
  onCancelEdit() {
    this.router.navigate(['/data'])
  }
}
