import { Component, OnInit, Input, Output, ViewChild, HostListener } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { Color, Label } from 'ng2-charts';

import { Post } from '../posts/post.model'
import { PostsService } from "../posts/post.service";

@Component({
  selector: 'app-visuals',
  templateUrl: './visuals.component.html',
  styleUrls: ['./visuals.component.css'],
  host: {'(document:click)': 'onChange($event)'}
})
export class VisualsComponent implements OnInit {

  private postsSub: Subscription;

  baseChart = "bar";
  post: Post[] = [];
  @Input() isDemo: boolean;
  title: string = "Data Visualizations";
  isLoading = false;
  dobSet: string[] = [];
  dobSetInt: number[] = [];
  dobCount = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  genCount = [0,0,0,0]
  @ViewChild('fullScreen') divRef;
  decadeMode: number;
  dobGroup: number[] = [];
  avg: number;
  kpiScores: string[] = ['0','0'];
  visNum: number = 0;
  visName: string[] = ["Average Year of Birth of Applicants","Most Common Generation"]

  constructor(public postsService: PostsService) { }

  public pieChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    title: {
      display: true,
      text: 'Applicants by Generation',
      fontSize: 20
    },
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
      text: 'Applicants Year of Birth by Decade',
      fontSize: 20
    },
    scales: {
      yAxes: [{
        ticks: {
          fontSize: 17
        }
      }],
      xAxes: [{
        ticks: {
          fontSize: 17
        }
      }],
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

onChange(event) {
  if((event.target.id).substring(4,5) == "0" || (event.target.id).substring(4,5) == "1")
  this.visNum = (event.target.id).substring(4,5);
}

mode(array)
{
    if(array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
        var el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}

getGenerationMode(arr: number[]) {{
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
      console.log("For"+arr[i]);
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    console.log(maxIndex);
    if(maxIndex == 0) {
      return 'Baby Boomers';
    }
    else if(maxIndex == 1) {
      return 'Gen X';
    }
    else if(maxIndex == 2) {
      return 'Millennials';
    }
    else {
      return 'Gen Z';
    }
}
}

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
        this.dobGroup.push(this.dobSetInt[n]);
    }
    console.log(this.dobGroup);
    var total = 0;
    for(var i = 0; i < this.dobGroup.length; i++) {
        total += this.dobGroup[i];
    }
    this.avg = total / this.dobGroup.length;
    this.avg = Math.trunc(this.avg);
    this.kpiScores[0] = this.avg + '';
  }

  checkPosts(posts: Post[]) {
    var n = 0;
    for(n = 0; n < posts.length; n++) {
      this.dobSet.push(posts[n].dob.toString());
      this.getGeneration(parseInt(this.dobSet[n]));
    }
    console.log(this.mode(this.genCount));
    this.getDobInt(this.dobSet);
    this.kpiScores[1] = this.getGenerationMode(this.genCount) + '';
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
  }

}
