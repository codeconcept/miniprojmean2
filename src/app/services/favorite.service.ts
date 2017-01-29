import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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
    return this.http.post(favoriteUrl, formValue)
      .map(res => res.json());
  }

  deleteFavorite(favoriteId) {
    return this.http.delete(`${favoriteUrl}/${favoriteId}`)
      .map(res => res.json());
  }
}