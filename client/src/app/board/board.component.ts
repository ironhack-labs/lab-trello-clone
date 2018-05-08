import { DragulaHandler } from './../shared/dragula.service';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as _ from 'lodash';

import { List } from './../list/list.model';
import { Card } from './../card/card.model';
import { ListService } from './../shared/list.service';
import { CardService } from './../shared/card.service';

@Component({
  selector: 'trello-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  lists: Array<List> = [];
  cards: Array<Card> = [];

  toggleCreateList = false;

  @ViewChild('confirmModal') confirmModal;
  @ViewChild('newlist') newlist;

  constructor(
    private vcr: ViewContainerRef,
    private listService: ListService,
    private cardService: CardService,
    private modalService: NgbModal,
    private dragulaService: DragulaHandler,
    public toastr: ToastsManager
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.fetchLists();
    this.dragulaService.listenTo();
  }

  toggleAddList() {
    this.toggleCreateList = !this.toggleCreateList;
  }

  fetchLists() {
    this.listService.get()
      .subscribe(
        (lists: Array<List>) => {
          this.lists = lists
        },
        (err) => this.onError(err.message)
      );
  }

  onListEdit(list) {
    this.listService.edit(list)
      .subscribe(
        (response) => {
          this.onSuccess(response.message);
          list.update(response.list);
        },
        (err) => this.onError(err.message)
      );
  }

  onListRemove(list) {
    this.modalService
      .open(this.confirmModal)
      .result.then((result) => {
        this.removeList(list);
      });
  }

  removeList(list) {
    this.listService.remove(list)
      .subscribe(
        (response) => {
          this.onSuccess(response.message);
          this.lists.splice(this.lists.indexOf(list), 1);
        },
        (err) => this.onError(err.message)
      );
  }

  addList(title) {
    this.listService.create({ title })
      .subscribe(
        (newLists: Array<List>) => this.lists = newLists,
        (err) => this.onError(err.message)
      );
  }

  onSuccess(message: string) {
    this.toastr.success(message, 'Yayy!');
  }

  onError(error: string) {
    this.toastr.error(error, 'Oops :(');
  }
}
