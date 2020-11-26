import { Component, EventEmitter, Output, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { PostsService } from '../post.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ["./post-create.component.css"],
  providers: [DatePipe],
})

export class PostCreateComponent implements OnInit {

  constructor(public postsService: PostsService, public route: ActivatedRoute, public datePipe: DatePipe) {}

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
  isLoading = false;

  @Output() postCreated = new EventEmitter<Post>();

  post: Post = {
    id: "",
    firstName: "",
    lastName: "",
    dob: new Date("01/01/1975"),
    state: "",
    city: "",
    zip: "",
    institution: "",
    degree: "",
    gradYear: new Date("06/01/1997"),
    major: "",
    minor: "",
    org: "",
    position: "",
    jobStart: new Date("09/01/1997"),
    jobEnd : new Date("01/01/2000"),
  };

  onSavePost( enteredFirstName, enteredLastName, enteredDOB, enteredState, enteredCity, enteredZip, enteredInstitution, enteredDegree, enteredGradYear, enteredMajor, enteredMinor, enteredOrg, enteredPosition, enteredYearStart, enteredYearFinished) {
    console.log(this.post.id);
    if(this.mode === 'create') {
      const post: Post = {
        id: null,
        firstName: this.enteredFirstName,
        lastName: this.enteredLastName,
        dob: new Date(this.enteredDOB),
        state: this.enteredState,
        city: this.enteredCity,
        zip: this.enteredZip,
        institution: this.enteredInstitution,
        degree: this.enteredDegree,
        gradYear: new Date(this.enteredGradYear),
        major: this.enteredMajor,
        minor: this.enteredMinor,
        org: this.enteredOrg,
        position: this.enteredPosition,
        jobStart: new Date(this.enteredYearStart),
        jobEnd: new Date(this.enteredYearFinished)
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
        this.isLoading = true;
        console.log(this.postId);
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
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
