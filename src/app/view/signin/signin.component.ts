import { Component, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  showtext = true;
  signinForm = new FormGroup({
   
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])

  })
 
  constructor(private auth: Auth,
    private router: Router) {

  }

  ngOnInit(): void {
  }

  submit(){
    const {email, password} = this.signinForm.value;
    if (!this.signinForm.valid || !email || !password) {
      this.showtext = false;
      return;
  }
  signInWithEmailAndPassword(this.auth, email, password).then((user) => {
    if (user) {
      this.router.navigate(['/home']);
    }
  })
  .catch((error) => {
    alert("ไม่พบชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง")
  })
}

  
}