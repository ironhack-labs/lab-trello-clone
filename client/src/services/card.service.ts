import { IronTrelloGenericResponse } from '../interfaces';
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from "rxjs/operators";

import { Card } from '../models/card.model';

import {environment} from "../environments/environment";
const {baseURL} = environment;

@Injectable()
export class CardService {

  CARD_ROUTE = '/api/card';
  ENPOINT: string;
  cards: Array<Card> = [];

  constructor(public http: Http) {
  }

  /**
   * Create a new card
   * @param card: Card
   * @returns Observable<Card>
   */
  create(card): Observable<Card> {
    return this.http.post(`${baseURL}${this.CARD_ROUTE}`, card).pipe(
      map((res) => res.json()),
      map((newCard) => new Card(newCard)),
      catchError((err) => Observable.throw(err.json()))
    );
  }

  /**
   * Edit an existing card
   * @param card: Card
   * @returns Observable<Card>
   */
  edit(card: Card) {
    return this.http.put(`${baseURL}${this.CARD_ROUTE}/${card._id}`, card).pipe(
      map((res) => res.json().card),
      map((_card) => {
        card = new Card(_card);
        return card;
      }),
      catchError((err) => Observable.throw(err.json()))
    )
  }

  /**
   * Edit an existing card
   * @param card: Card
   * @param from: string - The source list's id
   * @param to: string - The destinantion list's id
   * @returns Observable<Card>
   */
  transfer(card: Card, from, to) {
    const body = {
      card,
      from,
      to
    };
    return this.http.put(`${baseURL}${this.CARD_ROUTE}/transfer/${card._id}`, body).pipe(
      map((res) => res.json()),
      catchError((err) => Observable.throw(err.json()))
    );
  }

  /**
   * Delete an existing card
   * @param card: Card
   * @returns Observable<I>
   */
  remove(card: Card): Observable<IronTrelloGenericResponse> {
    return this.http.delete(`${baseURL}${this.CARD_ROUTE}/${card._id}`).pipe(
      map((res) => res.json()),
      catchError((err) => Observable.throw(err.json()))
    );
  }
}