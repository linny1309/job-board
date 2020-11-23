import { Component, OnInit } from '@angular/core';
import { Post } from '../posts/post.model'

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  constructor() { }

  posts: Post[] = [];

  onPostAdded(post) {
    this.posts.push(post);
  }

  ngOnInit(): void {
  }

}
