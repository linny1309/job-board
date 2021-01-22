import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {

  jobs = ['BI Analyst','Front-End Dev','Backend Dev','Manager','FS Dev','Java Dev'];
  department = ['Data','Software','Software','Management','Software','Software'];
  level = ['Junior','Qualified','Qualified','Qualified','Expert','Junior'];
  salary = [50000,60000,70000,70000,80000,60000];

  onToggleAccordion(i) {
    var acc : HTMLElement = document.getElementById("jobPanel"+i);

    if (acc.style.display == "block") {
      acc.style.display = "none";
      document.getElementById("accJobIcon"+i).innerHTML = "expand_more";
    } else {
      acc.style.display = "block";
      document.getElementById("accJobIcon"+i).innerHTML = "expand_less";
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
