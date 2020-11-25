import { Component, OnInit } from '@angular/core';
import { Post } from '../../posts/post.model'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor() { }

  posts: Post[] = [];

  onPostAdded(post) {
    this.posts.push(post);
  }

  ngOnInit(): void {
  }

}
