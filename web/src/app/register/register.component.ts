import { User } from '../user';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  message: string;
  oneUser: User = {
    name: '',
    pass: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
  }

  registerSubmit(): void{

    this.message = '';
    // Check required input, alert if missing any
    if (this.oneUser.name == '' || this.oneUser.pass == '') {
      this.message = '请完成所有输入栏！All fields required!';
      return;
    }

    const url = 'http://192.168.0.100:8080/RegisterCtrl/register'; // TODO
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

    console.log(this.oneUser);
    this.http.post<User>(url, JSON.stringify(this.oneUser), httpOptions).subscribe(
      (res: any) => {
        console.log(res);
        if (res === 'success'){
          this.router.navigate(['login']);
        } else if (res === 'registered') {
          this.message = '注册重复！User already registered!';
        } else {
          this.message = '注册失败！Registration failed!';
        }
      }
    );
  }
}
