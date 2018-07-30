import { Component, OnInit, Input, Output } from '@angular/core';
import { List } from "../../models/list.model";
import { ListService } from '../../services/list.service';
import { observable } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ListService, CardService]
})
export class ListComponent implements OnInit {

  @Input() list:List;
  @Output() onCreateCard = new EventEmitter()


  title: string
  constructor(public lS: ListService, public cS: CardService) { }

  ngOnInit() {
  }

  getPosition(){
    if (this.list.cards.length==0){
      return 0;
    } else  {
      return this.list.cards.length++;
    }
  }

  addCard(){
      this.cS.create({title: this.title, position: this.getPosition(), list: this.list._id}).subscribe(list=>{
        this.onCreateCard.emit("");
        this.title = "";
    });
    

  }

}
