import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DataInfo } from '../models/data.model';
import { Router } from '@angular/router';

@Injectable()

export class DataComponentService {

    changedData = new Subject<DataInfo[]>();
    private data: DataInfo[] = [];
    dataUrl = 'http://localhost:3000/data';


    constructor(private httpClient: HttpClient, private router: Router) { }

    ngOnInit() {

    }

    getData() {
        return this.httpClient.get<[{ product: string, brand: string, remainder: number, }]>(this.dataUrl).subscribe((responseData) => {
            console.log(responseData)
            this.data = responseData;
            this.changedData.next([...this.data])
        })
    }

    getSingleItem(id: string) {
        return this.httpClient.get<any>(`${this.dataUrl}/edit/${id}`)

    }

    postItem(newItem) {
        return this.httpClient.post<any>(`${this.dataUrl}/post`, newItem).subscribe((responseData) => {
            console.log('added')
        })
    }

    getDataUpdate() {
        return this.changedData.asObservable();
    }


    updateItem(id: string, newItem: DataInfo) {
        this.httpClient.put<any>(`${this.dataUrl}/edit/${id}`, newItem).subscribe(() => {
            console.log('item updated')
        });


    }

    deleteItem(id) {
        this.httpClient.delete<any>(`${this.dataUrl}/delete/${id}`).subscribe(() => {

            const updatedData = this.data.filter(data => data._id !== id);
            this.data = updatedData;
            this.changedData.next([...this.data]);


        })
    }


}