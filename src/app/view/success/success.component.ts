import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { collection, doc, docData, Firestore, getDocs } from '@angular/fire/firestore';
import { Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  user = this.getCurrentUser();
  listcart: any = [];

  reset = false;
  total: number = 0;
  totalprice: number = 0;
  constructor( private firestore: Firestore,
    private auth: Auth) {
     
     }

  ngOnInit(): void {
    this.getData(false);
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

  getData(reset: boolean){
    if (this.user.subscribe((user) => {
      if (user) {
        if (reset === true) {
          this.total = 0;
          this.listcart = [];
          this.reset = false;
        }
        const ref = collection(this.firestore, 'users', user.uid, 'orders');
        getDocs(ref).then((response) => {
          response.docs.map((item) => {
            this.listcart.push(item.data());
          })
        })

      }
    }))
      return;
  }
}
