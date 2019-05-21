import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Router} from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register={
    uname:"",
    upwd:'',
    phone:'',
    upwd2:''
  }
  message=""
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit() {
  }
  onSubmit(){
    this.http.post('http://47.100.175.31:3000/user/register',this.register).toPromise()
        .then((data:any)=>{
          console.log(data);
          if(data.code==200){
            this.router.navigate(['/index/login'])
          }else if(data.code==400){
            this.message="用户名已存在"
          }
        }).catch(err=>{
          console.log(err);
        })
  }
}
