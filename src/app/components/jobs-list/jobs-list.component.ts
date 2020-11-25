import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {

  onToggleAccordion() {
    var acc : HTMLElement = document.getElementById("jobPanel");

    if (acc.style.display == "block") {
      acc.style.display = "none";
      document.getElementById("jobExpand").innerHTML = "expand_more";
    } else {
      acc.style.display = "block";
      document.getElementById("jobExpand").innerHTML = "expand_less";
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
