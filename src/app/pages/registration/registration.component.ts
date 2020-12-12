import { Component, OnInit, HostListener } from '@angular/core';
import { Post } from '../../posts/post.model'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  host: {'(document:click)': 'onChange($event)'}
})
export class RegistrationComponent implements OnInit {

  constructor() { }

  posts: Post[] = [];

  onPostAdded(post) {
    this.posts.push(post);
  }

  onChange() {

  }

  ngOnInit(): void {
    document.getElementById("appLogo").style.marginLeft = "5.5px";
  }

}
