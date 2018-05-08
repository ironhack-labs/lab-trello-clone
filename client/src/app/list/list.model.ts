import * as _ from 'lodash';

import { SortableItem } from './../shared/interfaces';
import { Card } from './../card/card.model';

export class List implements SortableItem {
    _id: string;
    title: string;
    position: number;
    cards: Array<Card> = [];

    constructor ({
        _id, title, position, cards
    }) {
        this._id = _id;
        this.title = title;
        this.position = position;
        this.cards = cards.map((card) => new Card(card));
    }

    update(list) {
        this.title = list.title;
        this.position = list.position;
    }

    addCard(card: Card): Array<Card> {
        this.cards.push(card);
        this.sortCards();
        return this.cards;
    }

    private sortCards() {
        this.cards = _.orderBy(this.cards, ['position', 'title']);
        return this.cards;
    }
}
