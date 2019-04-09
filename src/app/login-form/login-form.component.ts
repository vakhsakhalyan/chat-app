import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent {
  email:  string;
  password: string;
  errorMsg: string;

  constructor(private auth: AuthService) { }

  login() {
    this.auth.login(this.email, this.password)
      .catch(error => {
        this.errorMsg = error.message;
      });
  }
}
