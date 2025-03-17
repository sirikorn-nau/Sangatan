import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { getDocs, Firestore, collection, addDoc, doc, docData } from '@angular/fire/firestore';
import { Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-sangatan',
  templateUrl: './sangatan.component.html',
  styleUrls: ['./sangatan.component.scss']
})
export class SangatanComponent implements OnInit {

  bdayList: any = [];
  ritualList: any = [];
  funeralList: any = [];
  medList: any = [];

  user = this.getCurrentUser();
  amount: number = 1;
  constructor(private firestore: Firestore,
    private auth: Auth) {
    this.getBday();
    this.getMed();
    this.getRitual();
    this.getFuneral();

  }

  ngOnInit(): void {
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
  getBday() {
    const firebase = collection(this.firestore, 'bday');
    getDocs(firebase).then((response) => {
      this.bdayList = [...response.docs.map((item) => {
        return { ...item.data(), id: item.id }
      })]

    })
  }

  getMed() {
    const firebase = collection(this.firestore, 'med');
    getDocs(firebase).then((response) => {
      this.medList = [...response.docs.map((item) => {
        return { ...item.data(), id: item.id }
      })]
    })
  }

  getRitual() {
    const firebase = collection(this.firestore, 'ritual');
    getDocs(firebase).then((response) => {
      this.ritualList = [...response.docs.map((item) => {
        return { ...item.data(), id: item.id }
      })]
    })
  }

  getFuneral() {
    const firebase = collection(this.firestore, 'funeral');
    getDocs(firebase).then((response) => {
      this.funeralList = [...response.docs.map((item) => {
        return { ...item.data(), id: item.id }
      })]
    })
  }

  addcart(dataadd: any) {
    if (this.user.subscribe((user) => {
      if (user) {
        const ref = collection(this.firestore, 'users', user.uid, 'carts');
        getDocs(ref).then((response) => {
          let isExist = false;
          response.docs.map((item) => {
            if (item.data()['product']['id'] === dataadd.id) {
              isExist = true;
              alert("สินค้ารายการนี้อยู่ในตะกร้าสินค้าแล้ว")
            }
          })
          if (isExist === false) {
            addDoc(ref, {
              product: dataadd,
              amount: this.amount
            })
            this.amount = 1;
            alert("เพิ่มสินค้าลงตะกร้าแล้ว")
            
          }
        })
      }
      else {
        alert('กรุณาเข้าสู่ระบบก่อนเพิ่มสินค้าลงในตะกร้า');
      }
    }))
      return;
  }

  minus() {
    this.amount--;
    if (this.amount <= 0) {
      this.amount = 1;
    }
  }

  plus() {
    this.amount++;
  }


}
