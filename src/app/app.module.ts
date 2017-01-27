import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

import { AppComponent } from './app.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { FavoriteService } from './services/favorite.service';
import { HomeComponent } from './home/home.component';
import { YoutubeSearchComponent } from './youtube-search/youtube-search.component';
import { YoutubeService } from './youtube-search/youtube.service';
import { YoutubePlayerModule } from 'ng2-youtube-player';

const ROUTES = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'favorites',
    component: FavoriteListComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    FavoriteListComponent,
    HomeComponent,
    YoutubeSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    RouterModule.forRoot(ROUTES),
    YoutubePlayerModule
  ],
  providers: [ FavoriteService, YoutubeService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
