import {Component, OnChanges, OnInit} from '@angular/core';
import { ChatService } from "../services/chat.service";
import { ChatMessage } from "../models/chat.message.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
  feed: Observable<ChatMessage[]> ;

  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.feed = this.chat.getMessages().valueChanges();
  }

  ngOnChanges() {
    this.feed = this.chat.getMessages().valueChanges();
  }
}
