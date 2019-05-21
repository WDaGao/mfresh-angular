import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLogin={
    uname:'',
    pwd:''
  }
  message=""
  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit() {
  }
  onFocus(){
    this.message=""
  }
  onSubmit(){
    this.http.post('http://47.100.175.31:3000/user/login',this.userLogin).toPromise()
      .then((data:any)=>{
        if(data.code==400){
          this.message='用户名或者密码不正确'
        }else if(data.code==200){
          window.localStorage.setItem('user-info',JSON.stringify(data.data))
          this.router.navigate(['/'])
        }
      }).catch(err=>{

      })
  }
}
