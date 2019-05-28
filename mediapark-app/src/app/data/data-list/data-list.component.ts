import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserAuthService } from 'src/app/services/auth.service';
import { DataComponentService } from 'src/app/services/data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { DataInfo } from 'src/app/models/data.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit, OnDestroy {
  columnName: string;
  id: string;
  editMode = false;
  editItemForm: FormGroup;
  dataInfo
  dataSubscription: Subscription;
  path: string[] = ['item'];
  order: number = 1;


  clicked = false;

  constructor(private userAuthService: UserAuthService,
    private dataComponentService: DataComponentService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {


    this.dataSubscription = this.dataComponentService.changedData.subscribe((resData: DataInfo[]) => {
      this.dataInfo = resData;
    });

    // this.route.params.subscribe((params: Params) => {
    //   this.id = params['id'];
    // })

    this.dataInfo = this.dataComponentService.getData();
    console.log(this.dataInfo)
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
  onaddNewItem() {
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

  sortBy(prop: string) {

    this.path = prop.split('.')
    this.order = this.order * (-1); // change order
    return false; // do not reload
  }

  onDeleteItem(id) {

    this.dataComponentService.deleteItem(id)

  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe()
  }

}
