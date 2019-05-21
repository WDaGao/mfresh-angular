import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Router} from '@angular/router'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  uid:number
  CartList=[]
  urls='http://47.100.175.31/mfresh/';
  Cart={

  }
  constructor(private http:HttpClient) { }

  ngOnInit() {
    if(JSON.parse(window.localStorage.getItem('user-info'))!=null){
      this.uid=JSON.parse(window.localStorage.getItem('user-info'))[0].uid;
      console.log(this.uid);
      this.getCartList()
    }
  }
  getCartList(){
    this.http.get('http://47.100.175.31:3000/cart/select/'+this.uid).toPromise()
      .then((data:any)=>{
        console.log(data.data);
        this.CartList=data.data
      })
  }
  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    console.log(this.CartList);
  }
  deleteCart(did){
    this.http.get('http://localhost:3000/cart/delete/'+did).toPromise()
      .then((data:any)=>{
        if(data.code==200){
          alert('删除成功')
          this.getCartList()
        }
      })
  }
  //修改总数
  countCart(tj,i,did,pid){
    if(tj){
      if(this.CartList[i].count==1) return
      let count=--this.CartList[i].count;
      this.updateCart(did,pid,count)
    }else{
      let count=++this.CartList[i].count
      this.updateCart(did,pid,count)
    }
  }
  updateCart(did,pid,count){
    let cart={
      did:did,
      pid:pid,
      count:count
    }
    this.http.put('http://47.100.175.31:3000/cart/update',cart).toPromise()
        .then(data=>{

        })
  }
}
