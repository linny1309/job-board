import { Component, EventEmitter, Output, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { Post } from '../post.model';
import { PostsService } from '../post.service';
import { mimeType } from './mime-type.validator'

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ["./post-create.component.css"],
  providers: [DatePipe],
})

export class PostCreateComponent implements OnInit {

  constructor(public postsService: PostsService, public route: ActivatedRoute, public datePipe: DatePipe) {}

  form: FormGroup;
  private mode = 'create';
  private postId: string;
  isLoading = false;
  imgPreview: string;
  pathEnd;

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
    imagePath: null
  };

  imageConfirm() {
    document.getElementById("imgPrev").style.opacity = "0";
    document.getElementById("imgPrev").style.visibility = "hidden";
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    console.log(file);
    console.log(this.form);
    const reader = new FileReader();
    reader.onload = () => {
      this.imgPreview = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  onSavePost() {
    console.log(this.post.id);
    this.isLoading = true;
    if(this.mode === 'create') {
      const post: Post = {
        id: null,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        dob: this.form.value.dob,
        state: this.form.value.state,
        city: this.form.value.city,
        zip: this.form.value.zip,
        institution: this.form.value.institution,
        degree: this.form.value.degree,
        gradYear: this.form.value.gradYear,
        major: this.form.value.major,
        minor: this.form.value.minor,
        org: this.form.value.org,
        position: this.form.value.position,
        jobStart: this.form.value.jobStart,
        jobEnd: this.form.value.jobEnd,
        imagePath: null
      }
      this.postsService.addPost(
        this.form.value.firstName,
        this.form.value.lastName,
        this.form.value.dob,
        this.form.value.state,
        this.form.value.city,
        this.form.value.zip,
        this.form.value.institution,
        this.form.value.degree,
        this.form.value.gradYear,
        this.form.value.major,
        this.form.value.minor,
        this.form.value.org,
        this.form.value.position,
        this.form.value.jobStart,
        this.form.value.jobEnd,
        this.form.value.image
        );
      this.postCreated.emit(post);
    }
    else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.firstName,
        this.form.value.lastName,
        this.form.value.dob,
        this.form.value.state,
        this.form.value.city,
        this.form.value.zip,
        this.form.value.institution,
        this.form.value.degree,
        this.form.value.gradYear,
        this.form.value.major,
        this.form.value.minor,
        this.form.value.org,
        this.form.value.position,
        this.form.value.jobStart,
        this.form.value.jobEnd,
        this.form.value.image
      )
    }
    this.form.reset();
  }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(2)] ,
        }),
      lastName: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(2)] ,
        }),
      dob: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(2)] ,
        }),
      state: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(2)] ,
        }),
      city: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(2)] ,
        }),
      zip: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(2)] ,
        }),
      institution: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(2)] ,
        }),
      degree: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(2)] ,
        }),
      gradYear: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(2)] ,
        }),
      major: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(2)] ,
        }),
      minor: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(2)] ,
        }),
      org: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(2)] ,
        }),
      position: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(2)] ,
        }),
      jobStart: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(2)] ,
        }),
      jobEnd: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(2)] ,
        }),
      image: new FormControl(null,
        {validators: [Validators.required], asyncValidators: [mimeType]
        })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        document.getElementById("appLogo").style.visibility = "hidden";
        console.log(this.postId);
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          document.getElementById("appLogo").style.visibility = "visible";
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
            jobEnd: postData.jobEnd,
            imagePath: postData.imagePath
          };
          this.form.setValue({
            firstName: this.post.firstName,
            lastName: this.post.lastName,
            dob: this.post.dob,
            state: this.post.state,
            city: this.post.city,
            zip: this.post.zip,
            institution: this.post.institution,
            degree: this.post.degree,
            gradYear: this.post.gradYear,
            major: this.post.major,
            minor: this.post.minor,
            org: this.post.org,
            position: this.post.position,
            jobStart: this.post.jobStart,
            jobEnd: this.post.jobEnd,
            image: this.post.imagePath
          });
        });
      }
      else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
}
