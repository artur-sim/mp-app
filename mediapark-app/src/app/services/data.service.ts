import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DataInfo } from '../models/data.model';
import { Router } from '@angular/router';
import { isArray, isObject } from 'util';

@Injectable()

export class DataComponentService {

    changedData = new Subject<any>();
    //private data: DataInfo[];
    dataUrl = 'http://localhost:3000/data';


    constructor(private httpClient: HttpClient, private router: Router) { }

    ngOnInit() {

    }

    getData() {
        return this.httpClient.get<DataInfo[]>(this.dataUrl).subscribe((responseData) => {
            console.log(responseData)
            // this.data = responseData;
            this.changedData.next(responseData)

        })
    }

    getSingleItem(id: string) {
        return this.httpClient.get<any>(`${this.dataUrl}/edit/${id}`)

    }

    postItem(newItem) {
        return this.httpClient.post<any>(`${this.dataUrl}/post`, newItem).subscribe((responseData) => {
            console.log('added');
            this.changedData.next([this.getData()]);
        })
    }

    getDataUpdate() {
        return this.changedData.next();
    }


    updateItem(id: string, newItem: DataInfo) {
        this.httpClient.put<any>(`${this.dataUrl}/edit/${id}`, newItem).subscribe(() => {
            console.log('item updated')
            this.changedData.next([this.getData()])
        });

    }

    deleteItem(id) {
        this.httpClient.delete<any>(`${this.dataUrl}/delete/${id}`).subscribe((resData) => {
            console.log('item deleted')
            this.changedData.next([this.getData()]);
        })
    }

    // addNewcolumn(colomnName, value) {
    //     let body = {
    //         column: colomnName,
    //         value: value
    //     }
    //     this.httpClient.post<any>(`${this.dataUrl}/new/column`, body).subscribe((resData) => {

    //         // this.changedData.next([this.getData()]);
    //     })
    // }


}