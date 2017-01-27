import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  // eventObservable: Observable<any>;
  
  // results: Observable<any>;
  results: any[];
  resultsFirstArray: any[];
  resultsSecondArray: any[];


  constructor(public yts:YoutubeService) {      
  }

  ngOnInit() {
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

}
