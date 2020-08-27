import { Component, OnInit, Input } from '@angular/core';
import { SalesRecord } from '../salesRecord';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css'],
})
export class AddRecordComponent implements OnInit {

  message: string;
  oneRecord: SalesRecord = {
    id: null,
    bondName: '',
    saleName: '',
    amount: null,
    createdAt: '',
    updatedAt: '2021-01-01T00:00'
  };

  constructor(private http: HttpClient, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  addData(): void {
    this.message = '';
    // Check required input, alert if missing any
    if (this.oneRecord.saleName == '' || this.oneRecord.bondName == '' || this.oneRecord.createdAt == '' || this.oneRecord.createdAt == 'undefined-undefined-undefinedT00:00' || this.oneRecord.amount == null) {
      this.message = '请完成所有输入栏！All fields required!';
      return;
    }

    // Convert date format
    if (typeof this.oneRecord.createdAt != 'string') {
      let year = new String(this.oneRecord.createdAt['year']);
      let month = new String(this.oneRecord.createdAt['month']);
      let day = new String(this.oneRecord.createdAt['day']);
      if (month.length === 1) {
        month = '0' + month;
      }
      if (day.length === 1) {
        day = '0' + day;
      }
      this.oneRecord.createdAt = year + '-' + month + '-' + day + 'T00:00';
    }

    const url = 'http://192.168.0.100:8080/BondSaleCtrl/addRecord'; // TODO
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    console.log(this.oneRecord);
    this.http.post<SalesRecord>(url, JSON.stringify(this.oneRecord), httpOptions).subscribe(
      (res: any) => {
        console.log(res);
        if (res != null){
          const modalRef = this.modalService.open(ModalContent);
          modalRef.componentInstance.result = '数据录入成功！Record added successfully!';
        } else {
          this.message = '数据录入失败！Fail to add record!';
        }
      }
    );
  }
}
