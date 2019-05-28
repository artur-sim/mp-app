import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataComponentService } from 'src/app/services/data.service';

@Component({
  selector: 'app-data-column',
  templateUrl: './data-column.component.html',
  styleUrls: ['./data-column.component.css']
})
export class DataColumnComponent implements OnInit {

  constructor(private route: ActivatedRoute, private dataComponentService: DataComponentService, private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
  }

  onCancelCol() {
    this.router.navigate(['../../'], { relativeTo: this.route })
  }


}
