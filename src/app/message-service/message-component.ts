import { MessageService } from './message.service';
import { Message, MessageType } from './message';
import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'poa-messages',
  templateUrl: './message.component.html'
})

export class MessageComponent {

  public messageType = MessageType;

  public messages: Message[] = [];

  constructor(private messageService: MessageService) {
    this.messageService.msg.subscribe(m => this.addMessage(m));
  }

  private addMessage(message: Message): void {
    if (message.type === MessageType.CLEAR) {
      this.messages = [];
    } else {
      this.messages.push(message);
    }
  }
}

