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
  @Input() isDemo: boolean;
  private postsSub: Subscription;
  dob: string[] = [];
  gradYear: string[] = [];
  jobStart: string[] = [];
  jobEnd: string[] = [];
  isLoading = false;
  userCount: number;

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

  formatDate(date: Date, dateType: string) {
    if(dateType === "dob") {
      this.dob.push(date.toString().substring(0,10));
    } else if(dateType === "gradYear") {
      this.gradYear.push(date.toString().substring(0,10));
    } else if(dateType === "jobStart") {
      this.jobStart.push(date.toString().substring(0,10));
    } else {
      this.jobEnd.push(date.toString().substring(0,10));
    }
  }

  ngOnInit() {
    this.userCount = 0;
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.userCount = 0;
        this.isLoading = false;
        this.post = posts;
        this.post.forEach((post, i) => {
          this.userCount++;
          this.formatDate(this.post[i].dob, "dob");
          this.formatDate(this.post[i].gradYear, "gradYear");
          this.formatDate(this.post[i].jobStart, "jobStart");
          this.formatDate(this.post[i].jobEnd, "jobEnd");
        })
      })
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
