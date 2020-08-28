import { Component, OnInit, Input } from '@angular/core';
import { SalesRecord } from '../salesRecord';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface tableResult {
  key: string;
  value: number;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  public model: any;
  message: string;
  messageErr: string;
  oneRecord: SalesRecord = {
    id: null,
    bondName: '',
    saleName: '',
    amount: null,
    createdAt: null,
    updatedAt: null
  };
  tableResult: tableResult[];
  field1: string;
  field2: string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  groupByName(): void {
    this.message = '';

    const url = 'http://192.168.0.100:8080/BondSaleCtrl/ordersale';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    console.log(this.oneRecord);
    this.http.post<SalesRecord>(url, JSON.stringify(this.oneRecord), httpOptions).subscribe(
      (res: any) => {
        console.log(res);
        if (res != null) {
          this.field1 = "Sales Name";
          this.field2 = 'Amount';
          this.tableResult = res;
        } else {
          this.messageErr = '统计失败！Fail to count!';
        }
      }
    );
  }

  groupByCreateDate(): void {
    this.message = '';

    const url = 'http://192.168.0.100:8080/BondSaleCtrl/orderdate';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    console.log(this.oneRecord);
    this.http.post<SalesRecord>(url, JSON.stringify(this.oneRecord), httpOptions).subscribe(
      (res: any) => {
        console.log(res);
        if (res != null) {
          this.field1 = "Create Date";
          this.field2 = 'Amount';
          this.tableResult = res;
        } else {
          this.messageErr = '统计失败！Fail to count!';
        }
      }
    );
  }
}
