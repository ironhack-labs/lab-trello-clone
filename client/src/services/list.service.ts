import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { IronTrelloGenericResponse, SortableItem } from '../interfaces';
import { Card } from '../models/card.model';
import { CardService } from './card.service';
import { List } from '../models/list.model';
import { catchError, map } from 'rxjs/operators';

import {environment} from "../environments/environment";
const {baseURL} = environment;

@Injectable()
export class ListService {
  LIST_ROUTE = '/api/list';
  lists: Array<SortableItem> = [];

  constructor(public cardService: CardService, public http: Http) {
  }

  get(): Observable<SortableItem[]> {
    return this.http.get(`${baseURL}${this.LIST_ROUTE}`).pipe(
      map((res) => res.json()),
      map((res) => {
        
        for (const list of res) {
          this.lists.push(new List(list));
        }

        this.lists = this.sortItems(this.lists);
        return this.lists;
      }),
      catchError((err) => Observable.throw(err))
    );
  }

  private getNextPosition(): number {
    if (this.lists.length !== 0) {
      const pos = _.last(this.lists).position;
      return pos + 1000;
    } else {
      return 0;
    }
  }

  /**
   * Re-arrange a sortable array by position and title
   * @params items: Array<SortableItem> - The array to sort
   * @returns items: Array<SortableItem> - The sorted array
   */
  private sortItems(items: Array<SortableItem>): Array<SortableItem> {
    return _.orderBy(items, ['position', 'title']);
  }

  /**
   * Create a new list
   * @params list
   * @returns Observable<Array<SortableItem>>
   */
  create(list): Observable<Array<SortableItem>> {
    list.position = this.getNextPosition();

    return this.http.post(`${baseURL}${this.LIST_ROUTE}`, list).pipe(
      map((res) => res.json()),
      map((newList) => {
        this.lists.push(new List(newList));
        this.lists = this.sortItems(this.lists);
        return this.lists;
      }),
      catchError((err) => {
        return Observable.throw(err.json());
      })
    );
  }

  /**
   * Create a new card and assign it to the current list
   * @params card
   * @params listId: string
   * @returns Observable<Array<SortableItem>>
   */
  createCard(card, listId: string): Observable<Array<SortableItem>> {
    return this.cardService.create(card).pipe(
      map((newCard: Card) => {
        const list = (_.find(this.lists, { _id: listId })) as List;
        return list.addCard(newCard);
      })
    );
  }

  /**
   * Edit a list
   * @params list: SortableItem
   * @returns Observable<IronTrelloGenericResponse>
   */
  edit(list: SortableItem): Observable<IronTrelloGenericResponse> {
    return this.http.put(`${baseURL}${this.LIST_ROUTE}/${list._id}`, list).pipe(
      map((res) => res.json()),
      catchError((err) => Observable.throw(err.json()))
    );
  }

  /**
   * Delete a list (and all its cards)
   * @params list: SortableItem
   * @returns Observable<IronTrelloGenericResponse>
   */
  remove(list: SortableItem): Observable<IronTrelloGenericResponse> {
    return this.http.delete(`${baseURL}${this.LIST_ROUTE}/${list._id}`).pipe(
      map((res) => res.json()),
      catchError((err) => Observable.throw(err.json()))
    );
  }

  shiftCard(sourceList, targetList, cardId): void {
    const sList = _.find(this.lists, { _id: sourceList }) as List;
    const tList = _.find(this.lists, { _id: targetList }) as List;
    const _index = _.findIndex(tList.cards, { _id: cardId }) as number;
    const _el = _.find(tList.cards, { _id: cardId }) as Card;

    if (_index !== -1) {
      if (_index === 0) {
        if (tList.cards.length > 1) {
          _el.position = tList.cards[1].position - 1000;
        } else {
          _el.position = 0;
        }
      } else {
        if (tList.cards[_index - 1] && tList.cards[_index + 1]) {
          _el.position = (tList.cards[_index - 1].position + tList.cards[_index + 1].position) / 2;
        } else {
          _el.position = tList.cards[_index - 1].position + 1000;
        }
      }

      // Update with the latest list id
      _el.setList(tList._id);

      if (sourceList === targetList) {
        const subscription = this.cardService.edit(_el).subscribe(
          (res) => console.log('Card position updated', res),
          (err) => console.log('Update card error', err)
        );
      } else {
        const subscription = this.cardService.transfer(_el, sourceList, targetList).subscribe(
          (res) => console.log('Card position updated', res),
          (err) => console.log('Update card error', err)
        );
      }
    }

    tList.cards = this.sortItems(tList.cards) as Card[];
  }

  shiftList(listId): void {
    const _index = _.findIndex(this.lists, { _id: listId });
    const _el = _.find(this.lists, { _id: listId }) as List;

    if (_index !== -1) {
      if (_index === 0) {
        if (this.lists.length > 1) {
          _el.position = this.lists[1].position - 1000;
        } else {
          _el.position = 0;
        }
      } else {
        if (this.lists[_index - 1] && this.lists[_index + 1]) {
          _el.position = (this.lists[_index - 1].position + this.lists[_index + 1].position) / 2;
        } else {
          _el.position = this.lists[_index - 1].position + 1000;
        }
      }

     const subscription = this.edit(_el).subscribe(
        (res) => console.log('Update list position', res),
        (err) => console.log('Update list error', err)
      );
    }
  }
}