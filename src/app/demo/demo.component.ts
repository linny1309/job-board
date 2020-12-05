import { Component, OnInit } from '@angular/core';
import { Post } from '././../posts/post.model'

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  constructor() { }

  posts: Post[] = [];

  onPostAdded(post) {
    this.posts.push(post);
  }

  ngOnInit(): void {
    document.getElementById("appLogo").style.marginLeft = "5px";
    document.getElementById("appLogo").style.top = "50px";
  }

}
