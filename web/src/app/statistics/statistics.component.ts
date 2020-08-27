import { Component, OnInit, Input } from '@angular/core';
import { SalesRecord } from '../salesRecord';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface tableResult {
  key: string;
  value: number;
}

@Component({
  template: `
    <div class="modal-body">
      <p>{{result}}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">OK</button>
    </div>
  `
})
export class ModalContent {
  @Input() result;
  constructor(public activeModal: NgbActiveModal) { }
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
  messageUpload: string;
  oneRecord: SalesRecord = {
    id: null,
    bondName: '',
    saleName: '',
    amount: null,
    createdAt: null,
    updatedAt: null
  };
  uploadData: SalesRecord[];
  tableResult: tableResult[];
  field1: string;
  field2: string;
  fileUrl: string;
  private _jsonURL = 'assets/data.json';

  constructor(private http: HttpClient, private modalService: NgbModal) { }

  ngOnInit(): void { }

  uploadFile() {
    console.log(this.fileUrl);
    this.messageUpload = '';
    this.http.get(this._jsonURL).subscribe(data => {
      const url = 'http://192.168.0.100:8080/BondSaleCtrl/importData';
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

      console.log(data);
      this.http.post(url, data, httpOptions).subscribe((res:any) => {
        console.log(res);
        if (res == true) {
          // this.messageUpload = "导入成功！Success!";
          const modalRef = this.modalService.open(ModalContent);
          modalRef.componentInstance.result = '导入成功！Import Successfully!';
        }
      });
    }
    );
  }

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
