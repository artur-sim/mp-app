import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataInfo } from 'src/app/models/data.model';
import { DataComponentService } from 'src/app/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-data-detail',
  templateUrl: './data-detail.component.html',
  styleUrls: ['./data-detail.component.css']
})
export class DataDetailComponent implements OnInit {

  newItemForm: FormGroup;

  constructor(private dataComponentService: DataComponentService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.newItemForm = new FormGroup({
      'product': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'brand': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'remainder': new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{1,}$/)]),
    })
  }

  onSubmitNewForm() {

    const newItem = new DataInfo(this.newItemForm.value['product'], this.newItemForm.value['brand'], this.newItemForm.value['remainder'])

    this.dataComponentService.postItem(newItem);

    this.newItemForm.reset()


  }
  onCancelEdit() {
    this.router.navigate(['/data'])
  }
}
