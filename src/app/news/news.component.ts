import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import {Router,ActivatedRoute} from '@angular/router'
 
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  pageNum:number=1;
  newList=[]
  pageSize=[];
  constructor(private http:HttpClient,
              private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit() {
    this.getNewList()
  }
  getNewList(){
    this.http.get('http://47.100.175.31:3000/news/list/'+this.pageNum).toPromise()
      .then((data:any)=>{
        
        this.newList=data.data
        for(var i=1;i<=data.pageCount;i++){
          this.pageSize.push(i)
        }
      })
  }
  qingkong(){
    this.newList=[]
    this.pageSize=[];
    this.getNewList()
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

}
