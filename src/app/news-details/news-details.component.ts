import { Component, OnInit, AfterContentInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router,ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit,AfterContentInit {
  data:any=[]
  constructor(private http:HttpClient,private route:ActivatedRoute) { 
    
  }

  ngOnInit() {
   const nid= this.route.snapshot.params.nid;
   this.http.get('http://47.100.175.31:3000/news/'+nid).toPromise()
      .then((data:any)=>{
        this.data=data;
        document.getElementById('news_content').innerHTML=data.content;
      })
  }
  ngAfterContentInit(){
    
  }
}
