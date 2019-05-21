import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContentComponent } from './content/content.component';
import { AboutComponent } from './about/about.component';
import { NewsComponent } from './news/news.component';
import { ProductComponent } from './product/product.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path:"",redirectTo:"index",pathMatch:"full"},
  {path:"index",component:ContentComponent,
    children:[
      {path:'',component:HomeComponent},
      {path:'home',component:HomeComponent},
      {path:'about',component:AboutComponent},
      {path:'news',component:NewsComponent},
      {path:'product/:type',component:ProductComponent},
      {path:'contact',component:ContactComponent},
      {path:'cart',component:CartComponent},
      {path:'news_details/:nid',component:NewsDetailsComponent},
      {path:'product_details/:pid',component:ProductDetailsComponent},
      {path:'login',component:LoginComponent},
      {path:'register',component:RegisterComponent}
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
