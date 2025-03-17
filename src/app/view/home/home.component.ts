import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { docData, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { doc } from '@firebase/firestore';
import { Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user = this.getCurrentUser();

  constructor(private auth: Auth, private firestore: Firestore, private router: Router) { }
  
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

  logout(){
    this.auth.signOut().then(()=>{
      this.router.navigate(['/signin'])
    })
  }
}
