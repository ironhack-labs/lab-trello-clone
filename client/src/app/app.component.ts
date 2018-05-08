import { Component } from '@angular/core';

@Component({
  selector: 'trello-root',
  template: `
    <div class="trello-container">
      <trello-header></trello-header>
      <trello-board></trello-board>
    </div>
  `
})
export class AppComponent {
  title = 'app';
}
