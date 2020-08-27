import { Component, OnInit, Input } from '@angular/core';
import { SalesRecord } from '../salesRecord';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface tableResult {
  id: number;
  bondName: string;
  saleName: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
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
  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-report-inquiry',
  templateUrl: './report-inquiry.component.html',
  styleUrls: ['./report-inquiry.component.css']
})
export class ReportInquiryComponent implements OnInit {

  public model1: any;
  public model2: any;
  message: string;
  oneRecord: SalesRecord = {
    id: null,
    bondName: '',
    saleName: '',
    amount: null,
    createdAt: null,
    updatedAt: '2021-01-01'
  };
  tableResult: tableResult[];

  constructor(private http: HttpClient, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  searchData(): void {
    this.message = '';
    // Check required input, alert if missing any
    if (this.oneRecord.saleName == '' || this.oneRecord.bondName == '' || this.oneRecord.createdAt == '' || this.oneRecord.createdAt == 'undefined-undefined-undefined') {
      // this.modalService.open(ModalContent);
      this.message = '请完成所有输入栏！All fields required!';
      return;
    }

    // Convert date format
    let year = new String(this.oneRecord.createdAt['year']);
    let month = new String(this.oneRecord.createdAt['month']);
    let day = new String(this.oneRecord.createdAt['day']);
    if (month.length === 1) {
      month = '0' + month;
    }
    if (day.length === 1) {
      day = '0' + day;
    }
    this.oneRecord.createdAt = year + '-' + month + '-' + day;

    const url = 'http://192.168.0.100:8080/BondSaleCtrl/queryBondByJson'; // TODO
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    console.log(this.oneRecord);
    this.http.post<SalesRecord>(url, JSON.stringify(this.oneRecord), httpOptions).subscribe(
      (res: any) => {
        console.log(res);
        if (res != null){
          this.tableResult = res;
          const modalRef = this.modalService.open(ModalContent);
          modalRef.componentInstance.result = '报告已生成！Report generated!';
        } else {
          this.message = '报告查询失败！Fail to retrieve report!';
        }
      }
    );
  }

}
