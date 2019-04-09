import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from "./auth.service";
import * as firebase from 'firebase/app';
import { MessageComponent} from "../message/message.component";
import { Observable } from "rxjs";
import { ChatMessage } from "../models/chat.message.model";

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  user: firebase.User;
  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage;
  userName: string;
  constructor(private db: AngularFireDatabase, private afAuth:AngularFireAuth) {
    this.afAuth.authState.subscribe(auth => {
      if (auth != undefined && auth != null) {
        this.user = auth;
      }
      this.getUser().subscribe((a:any) => {
       this.userName = a.displayName;
      })
    });
  }

  sendMessage(msg:string) {
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      userName: this.userName,
      email: email
    });
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                (now.getUTCMonth() - 1) + '/' +
                 now.getUTCDate();
    const time = now.getUTCHours() + ':' +
                 now.getUTCMinutes() + ':' +
                 now.getUTCSeconds();

    return date + ' ' + time;

  }

  getMessages(): AngularFireList<ChatMessage>  {
    return this.db.list('messages');
  }

  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.db.object(path).valueChanges();
  }

  getUsers() {
    const path = '/users';
    return this.db.list(path);
  }
}
