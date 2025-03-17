import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, setDoc } from '@angular/fire/firestore';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { doc } from '@firebase/firestore';


export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('cfpassword')?.value;

    if (password && confirmPassword && (password !== confirmPassword)) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})


export class SignupComponent implements OnInit {

  showtext = true;

  userForm = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    cfpassword: new FormControl('', [Validators.required, Validators.minLength(6)])

  },
    { validators: passwordsMatchValidator() }
  )
  constructor(private auth: Auth,
    private firestore: Firestore,
    private router: Router) { }

  ngOnInit(): void {
  }
  submit() {

    let values = this.userForm.value;


    const { fname, lname, email, password } = this.userForm.value;
    if (!this.userForm.valid || !fname || !lname || !email || !password) {
      this.showtext = false;
      return;
    }
   createUserWithEmailAndPassword(this.auth, email, password).then(
    (userCredential) => {
      const ref = doc(this.firestore, 'users', userCredential.user.uid);
      setDoc(ref, {
        fname,
        lname,
        email,
        uid: userCredential.user.uid,
      }).then(() => {
        this.router.navigate(['/home']);
      })
    }

   )

  }

}
