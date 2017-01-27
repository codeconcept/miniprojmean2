import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FavoriteService {

  constructor(private http: Http) { }

  // Read all faovrites
  getAllFavorites() {
    return this.http.get('/api/v1/favorites')
      .map(res => res.json());
  }
}