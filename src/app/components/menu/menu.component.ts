import { Component, OnInit, Input, Output} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  @Input()
  customMenu: string[];
  @Input()
  customIcons: string[];

  @Output()
  menuValue: number;

  togglePage(n) {
    console.log(n);
    var x;
    var pages: HTMLCollectionOf<Element> = document.getElementsByClassName("page");
    for(x = 0; x < pages.length; x++) {
      if(n != x) {
        document.getElementById("page"+x).style.visibility = "hidden";
        document.getElementById("page"+x).style.display = "none";
      } else {
        document.getElementById("page"+x).style.visibility = "visible";
        document.getElementById("page"+x).style.display = "block";
        this.menuValue = x;
      }
    }
  }

  toggleTitle(title) {
    document.getElementById("headerTitle").innerHTML = title;
  }

  ngOnInit(): void {
  }

}
