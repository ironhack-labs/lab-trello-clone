import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';

@Component({
  selector: 'trello-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.scss']
})
export class PlaceholderComponent {

  @Input() placeholder: string;
  @Output() onSave = new EventEmitter<string>();

  isEditing = false;
  title: string;

  constructor() { }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  save() {
    console.log("papu")
    this.onSave.emit(this.title);
    this.title = '';
    this.isEditing = false;
  }
}
