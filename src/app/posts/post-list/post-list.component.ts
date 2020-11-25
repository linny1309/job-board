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
  isLoading = false;

  onToggleAccordion(i) {
    var acc : HTMLElement = document.getElementById("panel"+i);

    if (acc.style.display == "block") {
      acc.style.display = "none";
      document.getElementById("accIcon"+i).innerHTML = "expand_more";
    } else {
      acc.style.display = "block";
      document.getElementById("accIcon"+i).innerHTML = "expand_less";
    }
  }

  onDelete(postId: string, postFirstName: string, postLastName: string)  {
    var txt;
    if (confirm("Are you sure you want to delete the document for " + postFirstName + " " + postLastName + "?")) {
      this.postsService.deletePost(postId);
    }
  }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.post = posts;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
