import { Component, EventEmitter, Output, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model'
import { PostsService } from '../post.service'

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ["./post-create.component.css"],
})

export class PostCreateComponent implements OnInit {
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

  private mode = 'create';
  private postId: string;
  post: Post = {
    id: "",
    firstName: "",
    lastName: "",
    dob: "",
    state: "",
    city: "",
    zip: "",
    institution: "",
    degree: "",
    gradYear: "",
    major: "",
    minor: "",
    org: "",
    position: "",
    jobStart: "",
    jobEnd : ""
  };

  @Output() postCreated = new EventEmitter<Post>();

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}

  onSavePost( enteredFirstName, enteredLastName, enteredDOB, enteredState, enteredCity, enteredZip, enteredInstitution, enteredDegree, enteredGradYear, enteredMajor, enteredMinor, enteredOrg, enteredPosition, enteredYearStart, enteredYearFinished) {
    console.log(this.post.id);
    if(this.mode === 'create') {
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
    else {
      this.postsService.updatePost(
        this.postId,
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
      )
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        console.log(this.postId);
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.post = {
            id: this.postId,
            firstName: postData.firstName,
            lastName: postData.lastName,
            dob: postData.dob,
            state: postData.state,
            city: postData.city,
            zip: postData.zip,
            institution: postData.institution,
            degree: postData.degree,
            gradYear: postData.gradYear,
            major: postData.major,
            minor: postData.minor,
            org: postData.org,
            position: postData.position,
            jobStart: postData.jobStart,
            jobEnd: postData.jobEnd
          }
        });
      }
      else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
}
