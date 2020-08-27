import { Component, OnInit, Input } from '@angular/core';
import { SalesRecord } from '../salesRecord';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  public model: any;
  message: string;
  message1: string;
  message2: string;
  oneRecord1: SalesRecord = {
    id: null,
    bondName: '',
    saleName: '',
    amount: null,
    createdAt: null,
    updatedAt: null
  };
  oneRecord2: SalesRecord = {
    id: null,
    bondName: '',
    saleName: '',
    amount: null,
    createdAt: null,
    updatedAt: null
  };

  constructor(private http: HttpClient,) { }

  ngOnInit(): void {
  }

  groupByName(): void {
    this.message = '';
    // Check required input, alert if missing any
    if (this.oneRecord1.saleName == '') {
      this.message = '请输入销售姓名！Sales name required!';
      return;
    }

    const url = 'http://192.168.0.100:8080/BondSaleCtrl/ordersale';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    console.log(this.oneRecord1);
    this.http.post<SalesRecord>(url, JSON.stringify(this.oneRecord1), httpOptions).subscribe(
      (res: any) => {
        console.log(res);
        if (res != null) {
          this.message1 = 'Total Amount: ' + res;
        } else {
          this.message1 = '统计失败！Fail to count!';
        }
      }
    );
  }

  groupByCreateDate(): void {
    this.message = '';
    // Check required input, alert if missing any
    if (this.oneRecord2.createdAt == null || this.oneRecord2.createdAt == 'undefined-undefined-undefined') {
      this.message = '请输入起始日期！Create date required!';
      return;
    }

    // Convert date format
    let year = new String(this.oneRecord2.createdAt['year']);
    let month = new String(this.oneRecord2.createdAt['month']);
    let day = new String(this.oneRecord2.createdAt['day']);
    if (month.length === 1) {
      month = '0' + month;
    }
    if (day.length === 1) {
      day = '0' + day;
    }
    this.oneRecord2.createdAt = year + '-' + month + '-' + day;

    const url = 'http://192.168.0.100:8080/BondSaleCtrl/orderdate';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    console.log(this.oneRecord1);
    this.http.post<SalesRecord>(url, JSON.stringify(this.oneRecord2), httpOptions).subscribe(
      (res: any) => {
        console.log(res);
        if (res != null) {
          this.message2 = 'Total Amount: ' + res;
        } else {
          this.message2 = '统计失败！Fail to count!';
        }
      }
    );
  }

}
