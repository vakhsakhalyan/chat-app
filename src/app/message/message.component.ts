import {Component, Input, OnInit} from '@angular/core';
import { ChatMessage } from "../models/chat.message.model";
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() messageChat: ChatMessage;
  userName: string;
  userEmail: string;
  messageContent:string;
  timeStamp: string;

  constructor() { }

  ngOnInit(messageChat = this.messageChat) {
    this.messageContent = messageChat.message;
    this.timeStamp = messageChat.timeSent;
    this.userName = messageChat.userName;
    this.userEmail = messageChat.email;
  }

}
