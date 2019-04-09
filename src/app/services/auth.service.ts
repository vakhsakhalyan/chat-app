import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from "rxjs";
import { User } from "../models/user.model";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<firebase.User>;
  private authState: any;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
    this.user = afAuth.authState;
  }

  get currentUserId(): string {
    return this.authState !== null ? this.authState.user.uid : '';
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(resolve => {
        const status = 'online';
        this.setUserStatus(status);
      });
  }

  authUser() {
    return this.user;
  }

  singnUp(email, password, displayName) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.authState = user;
        const status = 'online';
        this.setUserData(email, displayName, status);
      }).catch(error => console.log(error));
  }

  setUserData(email: string, displayName: string, status: string): void {
    const path = `users/${this.currentUserId}`;
    const data = {
      email: email,
      displayName: displayName,
      status: status
    };
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  setUserStatus(status: string): void {
    const path = `user/${this.currentUserId}`;
    const data = {
      status: status
    };
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }
}
