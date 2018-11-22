import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import * as socketIo from 'socket.io-client';
import { Observer, Observable } from 'rxjs';

@Injectable()
export class DataService {

  //private socket: Socket;
  observer: Observer<any>;

  getQuotes(): Observable<any> {
    const socket = socketIo('http://localhost:8080/');
    socket.on('data', response => {
      return this.observer.next(response.data);
    });
    return this.createObservable();
  }

  createObservable(): Observable<any> {
    return new Observable<any>(observer => {
      this.observer = observer;
    });
  }

  private handleError(error) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      let errMessage = error.error.message;
      return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'Socket.io server error');
  }

}