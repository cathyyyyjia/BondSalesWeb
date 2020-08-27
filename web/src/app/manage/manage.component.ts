import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  oneUser: User = {
    name: null,
    pass: null
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  logout(): void {
    const url = 'http://192.168.0.100:8080/logout';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    this.http.post<User>(url, JSON.stringify(this.oneUser), httpOptions).subscribe(
      (res: any) => {
        console.log(res);
      }
    );
  }

}
