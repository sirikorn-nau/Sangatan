import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { getDocs, Firestore, collection, addDoc, doc, docData, deleteDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  listcart: any = [];
  reset = false;
  total: number = 0;
  totalprice: number = 0;

  user = this.getCurrentUser();
  constructor(private firestore: Firestore,
    private auth: Auth,
    private router: Router) {

  }

  ngOnInit(): void {
    this.getCart(false);

  }

  getCurrentUser(): Observable<any> {
    return authState(this.auth).pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }
        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<any>;
      })
    );
  }


  getCart(reset: boolean) {
    if (this.user.subscribe((user) => {
      if (user) {
        if (reset === true) {
          this.total = 0;
          this.listcart = [];
          this.reset = false;
        }
        const ref = collection(this.firestore, 'users', user.uid, 'carts');
        getDocs(ref).then((response) => {
          response.docs.map((item) => {
            this.listcart.push(item.data());
            this.totalprice += item.data()['product']['price'] * item.data()['amount'];
            this.total += item.data()['amount'];
          })
        })

      }
    }))
      return;
  }

  pay(){
    this.user.subscribe((user) => {
      if (user) {
        const ref = collection(this.firestore, 'users', user.uid, 'orders');
        const deleteRef = collection(this.firestore, 'users', user.uid, 'carts');
        addDoc(ref, {
          totalprice: this.totalprice,
          listcart: this.listcart
          
        })
          
          getDocs(deleteRef).then((response) => {
            response.docs.map((i) => {
              deleteDoc(i.ref)
                .then(() => {

                  this.router.navigate(['/thankyou']);
                })
            })
          })
           
        
      }
    })
  }

  remove(item: any) {
    if (this.user.subscribe((user) => {
      if (user) {
        const ref = collection(this.firestore, 'users', user.uid, 'carts');
        getDocs(ref).then((response) => {
          response.docs.map((i) => {
            if (i.data()['product']['id'] === item.product.id) {
              deleteDoc(i.ref)
                .then(() => {
                  this.getCart(false)
               
                  location.reload();
                })


            }
          })
        })
      }
    }))
      return;
  }


}