import { Component, OnInit } from '@angular/core';
import { AccessibilityService } from 'src/app/accessibility.service';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';
import * as URLParse from 'url-parse';

@Component({
  selector: 'app-report-home',
  templateUrl: './report-home.component.html',
  styleUrls: ['./report-home.component.css']
})
export class ReportHomeComponent implements OnInit {

  response$ = new BehaviorSubject({});
  loggedinUser$ = new BehaviorSubject({});
  runid = '';
  constructor(
    private accessibilityService: AccessibilityService, 
    private userService: UserService, 
    private router: Router,
    private route:ActivatedRoute
    ) {
    this.loggedinUser$ = this.userService.loggedinUser$;
    this.response$ = this.accessibilityService.response$;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.runid =params['id'];
    })
  }

  showreport(urlid: number) {
    this.router.navigate([this.router.url+'/details',urlid]);
  }

  downloadreport(){
    const options = {
      downloadMultiReport : true,
      runId : this.runid,
      email : this.loggedinUser$.value['email'],

    }
    this.accessibilityService.downloadReport(options).subscribe({
      next : (response : any) =>{
        let blob = new Blob([response],{type: 'application/octet-stream'});
        let urlCount = this.response$.value['urlCount'];
        let url = this.response$.value['url']; 
        let file : File;
        if(urlCount === 1 && url !== null &&  url.length > 0){
          file = new File([blob], URLParse(url).hostname + '.xlsx',{type: 'application/octet-stream'});
        }else {
          file = new File([blob],'REPORT.xlsx',{type: 'application/octet-stream'});
        }
        saveAs(file);
      }
    });
  }

}
