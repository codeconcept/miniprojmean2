import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';

import { YoutubeService } from './youtube.service';

@Component({
  selector: 'youtube-search',
  templateUrl: './youtube-search.component.html',
  styleUrls: ['./youtube-search.component.css']
})
export class YoutubeSearchComponent implements OnInit {

  @ViewChild('searchterm') searchterm:ElementRef;

  results: any[];
  resultsFirstArray: any[];
  resultsSecondArray: any[];

  // player
  id = 'mOD2sGp4V8o';
  private player;
  private ytEvent;
  dangerousVideoUrl: string;
  videoUrl: any; //SafeResourceUrl;


  constructor(public yts:YoutubeService, 
                overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal, private sanitizer: DomSanitizer) {    
    overlay.defaultViewContainer = vcRef;  
  }

  ngOnInit() {
    this.updateVideoUrl(this.id);
  }

  ngAfterViewInit() {
    const eventObservable = Observable
                            .fromEvent(this.searchterm.nativeElement, 'input')
                            .do(data => console.log(data))
                            .debounceTime(700); 

    eventObservable.subscribe(
      ((data:any) => this.goSearch(data)),
      ((err:any) => console.error(err)),
      () => console.log('complete')
    )                               
  }
  
  goSearch(term:any){
    console.log('term', term);
    this.yts.search(term.target.value).subscribe((data) => {
      console.log(data);
      if(data.length > 3) {
        this.resultsFirstArray = data.slice(0,3);
        this.resultsSecondArray = data.slice(3);
      } else {
        this.resultsFirstArray = data;
      }
    });
  }

  onClick(videoId: string) {
    this.updateVideoUrl(videoId);
  }

  updateVideoUrl(id: string) {
    // Appending an ID to a YouTube URL is safe.
    // Always make sure to construct SafeValue objects as
    // close as possible to the input data so
    // that it's easier to check if the value is safe.
    this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + id;
    this.videoUrl =
        this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
  }


  openPopup() {
        this.modal.alert()
        .size('lg')
        .showClose(true)
        .title('un titre')
        .body(`
            <b>test !!!!!</b>
            <div>
                peut contenir du HTML
            </div>
            `)
        .open();
  }


}
