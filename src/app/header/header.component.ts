import { Component, OnInit,DoCheck } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Router,NavigationEnd} from '@angular/router'
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,DoCheck {
  uname:any
  uid=null;
  CartList=[]
  urls='http://47.100.175.31/mfresh/'
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit() {
    if(JSON.parse(window.localStorage.getItem('user-info'))!=null){
      this.uid=JSON.parse(window.localStorage.getItem('user-info'))[0].uid
    }
    this.getCartList()
  }
  ngAfterViewInit(){
    // 监听路由变化
    this.router.events.pipe(
      filter((event:any) => event instanceof NavigationEnd)
    ).subscribe((event:NavigationEnd) => {
    
    // 加载数据方法
    if(JSON.parse(window.localStorage.getItem('user-info'))!=null){
      this.uid=JSON.parse(window.localStorage.getItem('user-info'))[0].uid
    }else{
      this.uid=null;
    }
    this.getCartList()
    });
  }
  getCartList(){
    this.http.get('http://47.100.175.31:3000/cart/select/'+this.uid)
        .toPromise()
          .then((data:any)=>{
            this.CartList=data.data
            
          })
  }
  ngDoCheck(): void {
    try{
      this.uname=JSON.parse(window.localStorage.getItem('user-info'))
      if(this.uname!=null){
        this.uid=this.uname[0].uid
      }
    }
    catch (err){
      console.log(err);
    }
    
  }
  signout(e){
    e.preventDefault();
    window.localStorage.clear()
    this.CartList=[]
  }
  
}
