import { ListService } from './../shared/list.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { List } from './list.model';
import { Card } from '../card/card.model';
import { CardService } from './../shared/card.service';
import * as _ from 'lodash';

@Component({
  selector: 'trello-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() list: List;
  @Output() onListRemove = new EventEmitter<List>();
  @Output() onListEdit = new EventEmitter<List>();

  constructor(
    private cardService: CardService,
    private listService: ListService
  ) { }

  ngOnInit() { }

  removeList() {
    this.onListRemove.emit(this.list);
  }

  removeCard(cardId) {
    const card = _.find(this.list.cards, { _id: cardId });
    console.log(cardId, card);
    this.list.cards.splice(this.list.cards.indexOf(card), 1);
  }

  editList(title) {
    this.onListEdit.emit(this.list);
  }

  addCard(title) {
    console.log(title)
    this.listService.createCard({
        title: title,
        position: this.getNewPosition(),
        list: this.list._id
    }, this.list._id).subscribe(
      (cards: Array<Card>) => {
        console.log('cards', cards);
      },
      (err) => console.log('Card add error')
    );
  }

  private getNewPosition(): number {
    if (this.list.cards.length) {
      return this.list.cards[this.list.cards.length - 1].position + 1000;
    } else {
      return 0;
    }
  }
}
