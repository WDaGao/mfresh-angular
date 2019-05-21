import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Router,ActivatedRoute,NavigationEnd } from '@angular/router'
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  type:number = 1
  pageNum:number=1
  ProductList=[]
  pageSize=[];
  urls='http://47.100.175.31/mfresh/'
  initData: any;
  constructor(private http:HttpClient,
              private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit() {
    this.getProductList()
    this.type=this.route.snapshot.params.type
  }
  ngAfterViewInit(){
    // 监听路由变化
     
    this.router.events.pipe(
      filter((event:any) => event instanceof NavigationEnd)
    ).subscribe((event:NavigationEnd) => {
     
    // 加载数据方法
        this.type=this.route.snapshot.params.type
        this.qingkong();//可以用封装好的函数，地址发生变化，重新加载页面数据
    });
}
  getProductList(){
    this.http.get( `http://47.100.175.31:3000/product/list/${this.type}.${this.pageNum}`)
      .toPromise()
        .then((data:any)=>{
          this.ProductList=data.data
          for(var i=1;i<=data.pageCount;i++){
            this.pageSize.push(i)
          }
        })
  }
  //类型
  setType(tj){
    tj ? this.type=1:this.type=2;
    this.pageNum=1
    this.qingkong();
  }
  qingkong(){
    this.ProductList=[]
    this.pageSize=[];
    this.getProductList()
  }
  //分页
  setPage(i,e){
    e.preventDefault();
    this.pageNum=i
    this.qingkong()
  }
  handleClick(tj,e){
    e.preventDefault();
      if(tj){
        if(this.pageNum==this.pageSize.length) return
        this.pageNum++
      }else{
        if(this.pageNum<2) return
        this.pageNum--
      }
      this.qingkong()
  }
  //导航
  goProducteDetails(pid){
    this.router.navigate(['index/product_details',pid])
  }
}
