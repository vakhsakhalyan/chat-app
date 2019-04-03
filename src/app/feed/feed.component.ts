import { Component, OnInit } from '@angular/core';
import { ChatService } from "../services/chat.service";
import { Observable} from "rxjs";
import {MessageComponent} from "../message/message.component";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  feed: any;

  constructor(private chat: ChatService) { }

  ngOnInit() {
  }


}
