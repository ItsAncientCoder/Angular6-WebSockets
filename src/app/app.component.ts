import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from './core/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  workInfo: WorkInfo = {
    changeId: "",
    desc: ""
  };
  sub: Subscription;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.sub = this.dataService.getQuotes()
      .subscribe(data => {
        this.workInfo = data;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

export class WorkInfo {
  changeId: string;
  desc: string;
}
