import { Component, OnInit } from '@angular/core';
import { DataComponentService } from '../services/data.service';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params, } from '@angular/router';
import { DataInfo } from '../models/data.model';
import { UserAuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  columnName: string;
  id: string;
  editMode = false;
  editItemForm: FormGroup;
  dataInfo: DataInfo[] = [];
  private dataSubscription: Subscription;



  clicked = false;

  constructor(private userAuthService: UserAuthService, private dataComponentService: DataComponentService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataComponentService.getData()

    this.dataSubscription = this.dataComponentService.getDataUpdate()
      .subscribe((data: DataInfo[]) => {
        this.dataInfo = data;
      });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    })
  }

  onSort() {
    this.clicked = !this.clicked;
  }
  onEditItem(id) {
    this.router.navigate(['edit', id], { relativeTo: this.route })
  }
  onAddColumn() {
    this.router.navigate(['new', 'column'], { relativeTo: this.route })

  }
  addNewItem() {
    this.router.navigate(['new'], { relativeTo: this.route })


  }

  onSaveNewItem() {
    console.log('test')
    // new item form should be submitted here

    // (<FormArray>this.recipeForm.get('ingridients')).push(new FormGroup({
    //   'name': new FormControl(null, Validators.required),
    //   'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
    // }))
  }

  onLogOut() {
    this.userAuthService.LogOut();
  }

  sortBy(columnName) {
    return this.columnName = columnName
  }

  onDeleteItem(id) {

    this.dataComponentService.deleteItem(id)
  }

}
