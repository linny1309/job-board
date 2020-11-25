import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  //Navigate away from page
  navigate(url: string[]) {
    this.router.navigate(url);
  }

  //Getting posts from backend API to be sent to the front-end

  getPosts() {
    this.http.get<{message: string, posts: any}>(
      'http://localhost:3000/api/posts'
      )
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            id: post._id,
            firstName: post.firstName,
            lastName: post.lastName,
            dob: post.dob,
            state: post.state,
            city: post.city,
            zip: post.zip,
            institution: post.institution,
            degree: post.degree,
            gradYear: post.gradYear,
            major: post.major,
            minor: post.minor,
            org: post.org,
            position: post.position,
            jobStart: post.jobStart,
            jobEnd: post.jobEnd,
          };
        });
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts])
      });
  }

  //Checks for a post update

  getPostUpdateListener() {
    console.log(this.postsUpdated.asObservable());
    return this.postsUpdated.asObservable();
  }

  //Gets posts given an id

  getPost(id: string) {
    return this.http.get<{
      id: string,
      firstName: string,
      lastName: string,
      dob: string,
      state: string,
      city: string,
      zip: string,
      institution: string,
      degree: string,
      gradYear: string,
      major: string,
      minor: string,
      org: string,
      position: string,
      jobStart: string,
      jobEnd: string,
    }>('http://localhost:3000/api/posts/' + id);
  }

  //For adding a new post

  addPost(
    firstName: string,
    lastName: string,
    dob: string,
    state: string,
    city: string,
    zip: string,
    institution: string,
    degree: string,
    gradYear: string,
    major: string,
    minor: string,
    org: string,
    position: string,
    jobStart: string,
    jobEnd: string,
    ) {

    const post: Post = {
      id: null,
      firstName: firstName,
      lastName: lastName,
      dob: dob,
      state: state,
      city: city,
      zip: zip,
      institution: institution,
      degree: degree,
      gradYear: gradYear,
      major: major,
      minor: minor,
      org: org,
      position: position,
      jobStart: jobStart,
      jobEnd: jobEnd,
    };
    this.http
    .post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
    .subscribe((responseData) => {
      const id = responseData.postId;
      post.id = id;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
      alert("You have successfully created your profile");
      this.navigate(["/jobs"]);
    });
  }

  //For updating an existing post

  updatePost(id: string, firstName: string, lastName: string, dob: string, state: string, city: string, zip: string, institution: string, degree: string, gradYear: string, major: string, minor: string, org: string, position: string, jobStart: string, jobEnd: string) {
    const post: Post = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      dob: dob,
      state: state,
      city: city,
      zip: zip,
      institution: institution,
      degree: degree,
      gradYear: gradYear,
      major: major,
      minor: minor,
      org: org,
      position: position,
      jobStart: jobStart,
      jobEnd: jobEnd
    }
    this.http
      .put("http://localhost:3000/api/posts/" + id, post)
      .subscribe(response => {
        console.log(response);
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        alert("You have successfully edited your profile");
        this.navigate(["/jobs"]);
      });
  }

  //For deleting an existing post

  deletePost(postId: string) {
    this.http.delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
