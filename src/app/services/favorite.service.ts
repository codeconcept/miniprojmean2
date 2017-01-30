import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const favoriteUrl = '/api/v1/favorites';

@Injectable()
export class FavoriteService {

  constructor(private http: Http) { }

  // Read all faovrites
  getAllFavorites() {
    return this.http.get(favoriteUrl)
      .map(res => res.json());
  }

  createFavorite(formValue) {
    console.log(formValue);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(favoriteUrl, formValue)
      .map(res => res.json())
      .catch(this.handleError);

  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  deleteFavorite(favoriteId) {
    return this.http.delete(`${favoriteUrl}/${favoriteId}`)
      .map(res => res.json());
  }
}