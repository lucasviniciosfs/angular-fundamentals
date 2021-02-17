import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router : Router,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }

    this.loginForm = this.formBuilder.group(
      {
        username: ['',Validators.required],
        password: ['',Validators.required]
      }
    )

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(){
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(
      this.f.username.value,
      this.f.password.value
    ).pipe(first())
     .subscribe(
       data => {
         this.router.navigate([this.returnUrl]);
       },
       error => {
         this.error = error;
         this.loading = false;
       }
     )
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

}
