import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Router,ActivatedRoute} from '@angular/router'


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  pid:number
  product:any=[]
  user_info:any
  cartData={
    uid:0,
    pid:0
  }
  urls='http://47.100.175.31/mfresh/'
  constructor(private route:ActivatedRoute,
              private http:HttpClient,
              private router:Router) { }

  ngOnInit() {
    //console.log(this.route.snapshot.params.pid);
    this.pid=this.route.snapshot.params.pid
    this.cartData.pid=this.route.snapshot.params.pid;
    if(JSON.parse(window.localStorage.getItem('user-info'))!=null){
      this.cartData.uid=JSON.parse(window.localStorage.getItem('user-info'))[0].uid
    }
    this.user_info=window.localStorage.getItem('user-info')
    this.getProduct()
  }
  getProduct(){
    this.http.get('http://47.100.175.31:3000/product/'+this.pid).toPromise()
        .then((data:any)=>{
          this.product=data.data[0]
        })
  }
  //添加购物车
  addCart(){
    if(this.user_info){
      this.http.post('http://47.100.175.31:3000/cart/add',this.cartData).toPromise()
        .then((data:any)=>{
          console.log(data);
          if(data.code==200){
            alert('修改成功')
          }else if(data.code==300){
            alert('添加成功')
          }
        })
    } else{
      this.router.navigate(['index/login'])
    }
  }
}
