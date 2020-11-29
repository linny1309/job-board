import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { Color, Label } from 'ng2-charts';

import { Post } from '../posts/post.model'
import { PostsService } from "../posts/post.service";

@Component({
  selector: 'app-visuals',
  templateUrl: './visuals.component.html',
  styleUrls: ['./visuals.component.css']
})
export class VisualsComponent implements OnInit {

  baseChart = "bar";
  post: Post[] = [];
  @Input() isDemo: boolean;
  title: string = "Data Visualizations";
  private postsSub: Subscription;
  isLoading = false;
  dobSet: string[] = [];
  dobSetInt: number[] = [];
  dobCount = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  genCount = [0,0,0,0]
  @ViewChild('fullScreen') divRef;

  constructor(public postsService: PostsService) { }

  public pieChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    title: {
      display: true,
      text: 'Applicants by Generation',
      fontSize: 20
    }
  }
  public pieChartLabels = ['Baby Boomers','Generation X','Millennials','Generation Z'];
  public pieChartType = 'pie';
  public pieChartLegend = true;
  public pieChartData = [
    {data: this.genCount, label: 'Users'},
  ];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    title: {
      display: true,
      text: 'Applicants by Decade',
      fontSize: 20
    }
  }
  public barChartLabels = [1890,1900,1910,1920,1930,1940,1950,1960,1970,1980,1990,2000,2010,2020];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: this.dobCount, label: 'Users'},
  ];

  public barChartColors: Color[] = [
    {
      borderColor: 'rgba(31, 58, 147, 1)',
      backgroundColor: 'rgba(31, 58, 147, 0.5)',
      borderWidth: 3
    },
  ];

  getGeneration(year: number) {
    if(year < 1965) {
      this.genCount[0]++;
      return 'Baby Boomers';
    }
    else if(year >= 1965 && year < 1980) {
      this.genCount[1]++;
      return 'Generation X';
    }
    else if(year >= 1980 && year < 1996) {
      this.genCount[2]++;
      return 'Millennials';
    }
    else {
      this.genCount[3]++;
      return 'Generation Z';
    }

  }

  openFullscreen() {
    // Use this.divRef.nativeElement here to request fullscreen
    const elem = this.divRef.nativeElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }

  getDobInt(arr: string[]) {
    var n = 0;
    var m = 0;
    for(n = 0; n < arr.length; n++) {
      this.dobSetInt.push(parseInt(arr[n]));
      console.log(this.dobSetInt[n]);
      for(m = 0; m < this.dobCount.length; m++) {
        if(parseInt(arr[n]) >= this.barChartLabels[m] && parseInt(arr[n]) < this.barChartLabels[m+1])
          this.dobCount[m]++;
      }
    }
  }

  checkPosts(posts: Post[]) {
    var n = 0;
    for(n = 0; n < posts.length; n++) {
      this.dobSet.push(posts[n].dob.toString());
      this.getGeneration(parseInt(this.dobSet[n]));
    }
    this.getDobInt(this.dobSet);
  }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.post = posts;
        this.checkPosts(this.post);
      });
      this.openFullscreen();
  }

}
