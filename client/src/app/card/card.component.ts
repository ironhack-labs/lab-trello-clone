import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SortableItem } from './../shared/interfaces/sortable-item.interface';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'trello-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card: SortableItem;
  @Output() onDelete = new EventEmitter<any>();

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {}

  openCardModal(card) {
    const modalInstance = this.modalService.open(ModalComponent);
    modalInstance.componentInstance.originalCard = card;

    modalInstance
      .result.then((reason) => {
          this.onDelete.emit(this.card._id);
        });
  }
}
