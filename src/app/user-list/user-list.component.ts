import { Component, OnInit } from '@angular/core';
import { ChatService } from "../services/chat.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getUsers().valueChanges().subscribe((users) => {
      this.users = users;
    });
  }
}
