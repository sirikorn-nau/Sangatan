import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { SigninComponent } from './view/signin/signin.component';
import { SignupComponent } from './view/signup/signup.component';
import { MonkuseComponent } from './view/monkuse/monkuse.component';
import { CustomComponent } from './view/custom/custom.component';
import { CartComponent } from './view/cart/cart.component';
import { OrdinationComponent } from './view/ordination/ordination.component';
import { PromotionComponent } from './view/promotion/promotion.component';
import { SangatanComponent } from './view/sangatan/sangatan.component';
import { ThankyouComponent } from './view/thankyou/thankyou.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { NavComponent } from './view/nav/nav.component';
import { SuccessComponent } from './view/success/success.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    MonkuseComponent,
    CustomComponent,
    CartComponent,
    OrdinationComponent,
    PromotionComponent,
    SangatanComponent,
    ThankyouComponent,
    NavComponent,
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
