import { User } from '../user';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string;
  oneUser: User = {
    name: '',
    pass: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
  }

  loginSubmit(): void{

    this.message = '';
    // Check required input, alert if missing any
    if (this.oneUser.name == '' || this.oneUser.pass == '') {
      this.message = '请完成所有输入栏！All fields required!';
      return;
    }

    const url = 'http://192.168.0.100:8080/login'; // TODO
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

    console.log(this.oneUser);
    this.http.post<User>(url, JSON.stringify(this.oneUser), httpOptions).subscribe(
      (res: any) => {
        console.log(res);
        if (res != null){
        // if (true){
          // console.log('ready');
          this.router.navigate(['manage']);
        } else {
          this.message = "登录失败！Login failed!";
        }
      }
    );
    // this.router.navigate(['manage']);
  }
}
