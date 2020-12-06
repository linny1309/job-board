import { Component, OnInit, HostListener } from '@angular/core';
import { Post } from './../../posts/post.model'

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  constructor() {
    this.getScreenSize();
}

  screenHeight: number;
  screenWidth: number;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.screenHeight = window.innerHeight;
        this.screenWidth = window.innerWidth;
        console.log(this.screenHeight, this.screenWidth);
  }

  posts: Post[] = [];

  onPostAdded(post) {
    this.posts.push(post);
  }

  ngOnInit(): void {
    document.getElementById("appLogo").style.marginLeft = "5px";
    document.getElementById("appLogo").style.top = "50px";
  }

}
