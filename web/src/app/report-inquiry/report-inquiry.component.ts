import { Component, OnInit } from '@angular/core';

// interface Country {
//   name: string;
//   flag: string;
//   area: number;
//   population: number;
// }

// const COUNTRIES: Country[] = [
//   {
//     name: 'Russia',
//     flag: 'f/f3/Flag_of_Russia.svg',
//     area: 17075200,
//     population: 146989754
//   },
//   {
//     name: 'Canada',
//     flag: 'c/cf/Flag_of_Canada.svg',
//     area: 9976140,
//     population: 36624199
//   }
// ];
interface Sales {
  id: number;
  sales_name: string;
  bond_name: string;
  amount: number;
  created_at: string;
  updated_at: string;
}
const SALES: Sales[] = [
  {
    id: 1,
    sales_name: 'Tom',
    bond_name: 'Bond A',
    amount: 10000,
    created_at: '2020-01-01',
    updated_at: '2020-01-02'
  }
];

@Component({
  selector: 'app-report-inquiry',
  templateUrl: './report-inquiry.component.html',
  styleUrls: ['./report-inquiry.component.css']
})
export class ReportInquiryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // countries = COUNTRIES;
  sales = SALES;

}
