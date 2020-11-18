import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';

import { Post } from './post.model';


@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

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

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

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
    this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
    .subscribe((responseData) => {
      console.log(responseData.message)
    });
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }

  deletePost(postId: string) {
    this.http.delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        console.log("Deleted");
      })
  }
}
