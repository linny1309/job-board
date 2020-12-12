import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PostsService } from "../../posts/post.service";
import { Post } from '../../posts/post.model'

@Component({
  selector: 'app-advanced-view',
  templateUrl: './advanced-view.component.html',
  styleUrls: ['./advanced-view.component.css']
})
export class AdvancedViewComponent implements OnInit {

  userCount: number = 0;
  private postsSub: Subscription;
  isLoading = false;
  post: Post[];

  constructor(public postsService: PostsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.userCount = 0;
        this.isLoading = false;
        this.post = posts;
        this.post.forEach((post, i) => {
          this.userCount++;
        })
      })
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}




