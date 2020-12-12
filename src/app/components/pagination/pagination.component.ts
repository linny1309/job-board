import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input()
  postCount: number;

  currentPosition: number = 1;
  sectionAmount: number = 1;
  sectionPosition: number = 1
  pageInput: HTMLInputElement;


  constructor() { }

  changePageUp(perInput) {
    if((this.currentPosition+parseInt(perInput)) <= this.postCount) {
      this.sectionPosition = this.sectionPosition + parseInt(perInput);
      this.currentPosition+=parseInt(perInput);
      if(this.sectionPosition+parseInt(perInput) > this.postCount) {
        this.sectionPosition=this.postCount;
      }
    }
  }

  changePageDown(perInput) {
    var minus1 = this.currentPosition;
    if(this.currentPosition-parseInt(perInput) > 0 && (this.sectionPosition - parseInt(perInput) > 0)) {
      if(this.currentPosition < this.postCount) {
        this.currentPosition-=parseInt(perInput);
        this.sectionPosition = this.sectionPosition - parseInt(perInput);
      }
      else {
        this.currentPosition-=parseInt(perInput);
        this.sectionPosition--;
      }
      if((this.sectionPosition == this.currentPosition) && (this.sectionPosition == this.postCount)) {
        this.currentPosition = 1;
        this.sectionPosition = minus1;
      }
    }
    else if(minus1 != 1) {
      this.currentPosition = 1;
      this.sectionPosition = minus1;
    }
  }

  changePagination(perInput: any) {
    this.pageInput = <HTMLInputElement>document.getElementById("pageInput");
    if(parseInt(perInput) <= this.postCount) {
      this.sectionAmount = parseInt(perInput);
      this.sectionPosition = this.currentPosition + this.sectionAmount - 1;
      if(this.sectionAmount == 1 && parseInt(perInput) == 1) {
        this.sectionPosition == this.sectionAmount;
      }
      else if(this.sectionPosition > this.postCount) {
        this.sectionPosition = this.postCount;
      }
    }
    else {
      this.changePagination(this.postCount);
      this.pageInput.value = this.postCount.toString();
    }
  }

  ngOnInit(): void {
  }

}
