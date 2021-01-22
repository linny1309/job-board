import { Component, OnInit, HostListener } from '@angular/core';
import { Post } from '../../posts/post.model'

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

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
  }

}
