import { Component, EventEmitter, Output } from "@angular/core";

import { Post } from '../post.model'
import { PostsService } from '../post.service'

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ["./post-create.component.css"],
})

export class PostCreateComponent {
  enteredFirstName = '';
  enteredLastName = '';
  enteredDOB = '';
  enteredState = '';
  enteredCity = '';
  enteredZip = '';
  enteredInstitution = '';
  enteredDegree = '';
  enteredGradYear = '';
  enteredMajor = '';
  enteredMinor = '';
  enteredOrg = '';
  enteredPosition = '';
  enteredYearStart = '';
  enteredYearFinished = '';

  @Output() postCreated = new EventEmitter<Post>();

  constructor(public postsService: PostsService) {}

  onAddPost(
    enteredFirstName,
    enteredLastName,
    enteredDOB,
    enteredState,
    enteredCity,
    enteredZip,
    enteredInstitution,
    enteredDegree,
    enteredGradYear,
    enteredMajor,
    enteredMinor,
    enteredOrg,
    enteredPosition,
    enteredYearStart,
    enteredYearFinished
    ) {
    const post: Post = {
      id: null,
      firstName: this.enteredFirstName,
      lastName: this.enteredLastName,
      dob: this.enteredDOB,
      state: this.enteredState,
      city: this.enteredCity,
      zip: this.enteredZip,
      institution: this.enteredInstitution,
      degree: this.enteredDegree,
      gradYear: this.enteredGradYear,
      major: this.enteredMajor,
      minor: this.enteredMinor,
      org: this.enteredOrg,
      position: this.enteredPosition,
      jobStart: this.enteredYearStart,
      jobEnd: this.enteredYearFinished
    }
    this.postsService.addPost(
        enteredFirstName,
        enteredLastName,
        enteredDOB,
        enteredState,
        enteredCity,
        enteredZip,
        enteredInstitution,
        enteredDegree,
        enteredGradYear,
        enteredMajor,
        enteredMinor,
        enteredOrg,
        enteredPosition,
        enteredYearStart,
        enteredYearFinished
      );
    this.postCreated.emit(post);
  }

}
