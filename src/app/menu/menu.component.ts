import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input()
  customMenu: string[];

  togglePage(n) {
    var x;
    var pages: HTMLCollectionOf<Element> = document.getElementsByClassName("page");
    for(x = 0; x < pages.length; x++) {
      if(n != x) {
        document.getElementById("page"+x).style.visibility = "hidden";
      }
      else {
        document.getElementById("page"+x).style.visibility = "visible";
      }
    }
  }

  toggleTitle(title) {
    document.getElementById("headerTitle").innerHTML = title;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
