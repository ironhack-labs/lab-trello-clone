import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  providers: [ListService, CardService]
})
export class BoardComponent implements OnInit {

  lists: Array<object>;

  constructor(private listService: ListService) { }

  ngOnInit() {
    this.listService.get().subscribe(lists => this.lists = lists);
  }

  updateBoard(){
    this.listService.get().subscribe(lists => {this.lists = lists});
  }


}
