import { Component} from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  email: string;
  password: string;
  displayName: string;
  errorMsg: string;

  constructor(private authService: AuthService, private router: Router) {}

  signUp() {
    const email = this.email,
          password = this.password,
          displayName = this.displayName;

    this.authService.singnUp(email, password, displayName)
      .then(() => this.router.navigate(['chat']))
      .catch(error => this.errorMsg = error.message);
  }
}
