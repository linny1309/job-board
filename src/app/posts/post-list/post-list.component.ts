import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model'
import { PostsService } from "../post.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {

  constructor(public postsService: PostsService) { }

  @Input() post: Post[] = [];
  private postsSub: Subscription;

  onToggleAccordion(i) {
    var acc : HTMLElement = document.getElementById("panel"+i);

    if (acc.style.display == "block") {
      acc.style.display = "none";
      document.getElementById("accIcon"+i).innerHTML = "expand_less";
    } else {
      acc.style.display = "block";
      document.getElementById("accIcon"+i).innerHTML = "expand_more";
    }
  }

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.post = posts;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
