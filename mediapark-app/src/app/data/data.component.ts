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


  ngOnInit() {


  }


}
