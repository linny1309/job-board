import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  customHeader: string[];

  constructor() { }
  toggleMenu() {
    if(document.getElementById("menu").style.visibility == "visible") {
      document.getElementById("menu").style.visibility = "hidden";
      document.getElementById("menu").style.opacity = "0";
      document.getElementById("shade").style.opacity = "0";
      document.getElementById("shade").style.visibility = "hidden";
    } else {
      document.getElementById("menu").style.visibility = "visible";
      document.getElementById("menu").style.opacity = "1";
      document.getElementById("shade").style.opacity = ".7";
      document.getElementById("shade").style.visibility = "visible";
    }
  }

  ngOnInit(): void {
    this.toggleMenu();
    this.toggleMenu();
  }

}
