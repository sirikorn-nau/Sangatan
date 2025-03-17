import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './view/cart/cart.component';
import { CustomComponent } from './view/custom/custom.component';
import { HomeComponent } from './view/home/home.component';
import { MonkuseComponent } from './view/monkuse/monkuse.component';
import { OrdinationComponent } from './view/ordination/ordination.component';
import { PromotionComponent } from './view/promotion/promotion.component';
import { SangatanComponent } from './view/sangatan/sangatan.component';
import { SigninComponent } from './view/signin/signin.component';
import { SignupComponent } from './view/signup/signup.component';
import { SuccessComponent } from './view/success/success.component';
import { ThankyouComponent } from './view/thankyou/thankyou.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "signin",
    component: SigninComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "monkuse",
    component: MonkuseComponent
  },
  {
    path: "custom",
    component: CustomComponent
  },
  {
    path: "cart",
    component: CartComponent
  },
  {
    path: "ordination",
    component: OrdinationComponent
  },
  {
    path: "promotion",
    component: PromotionComponent
  },
  {
    path: "sangatan",
    component: SangatanComponent
  },
  {
    path: "thankyou",
    component: ThankyouComponent
  },
  {
    path: "success",
    component: SuccessComponent
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
