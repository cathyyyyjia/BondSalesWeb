import { User } from './../User';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  oneUser: User = {
    name: '',
    pass: ''
  };
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }

  loginSubmit(): void{
    const url = 'http://192.168.0.104:8080/login';
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

    console.log(this.oneUser);
    this.http.post<User>(url, JSON.stringify(this.oneUser), httpOptions).subscribe(
      (res: any) => {
        console.log(res);
        // if(res.status==true){
        //   this.router.navigate()
        // }
      }
    );
    }
  }
