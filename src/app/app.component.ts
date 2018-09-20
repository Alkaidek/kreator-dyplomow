import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'app';
  disp = 'none';
  err = 'inline-block';
  ngOnInit() {
    const value = '; ' + document.cookie;
    console.log (document.referrer);
    if ((value.search('mac-cookie') !== -1) /*&& (document.referrer.search('localhost') !== -1)*/) {
      this.disp = 'inline-block';
      this.err = 'none';
    }
  }
}
