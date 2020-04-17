import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AccessibilityService } from '../accessibility.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver'
import * as URLParse from 'url-parse';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loadingStatus = false;
  error : any;
  loggedinUser$ = new BehaviorSubject({});
  response$ = new BehaviorSubject({});
  testRunsResponse$ = new BehaviorSubject([]);
  constructor(private accessibilityService: AccessibilityService, private userService: UserService, private router: Router) {
    this.loggedinUser$ = this.userService.loggedinUser$;
    this.response$ = this.accessibilityService.response$;
   }

  ngOnInit(): void {
    this.loadingStatus = true;
    this.validateTestRunDataInSessionStorage(this.loggedinUser$.value['email']);
  }

  viewDetails(rowid : number,runid : number){
    this.response$.next(this.testRunsResponse$.value[rowid]);
    this.router.navigateByUrl('/report');
    this.router.navigate(['report',runid]);
  }
  downloadreport(runid : number,urlCount : number,url : string){
    const options = {
      downloadMultiReport : true,
      runId : runid,
      email : this.loggedinUser$.value['email'],

    }
    this.accessibilityService.downloadReport(options).subscribe({
      next : (response : any) =>{
        let blob = new Blob([response],{type: 'application/octet-stream'});
        let file : File ;
        if(urlCount === 1 &&  url !== null &&  url.length > 0){
          file = new File([blob], URLParse(url).hostname + '.xlsx',{type: 'application/octet-stream'});
        }else {
          file = new File([blob],'REPORT.xlsx',{type: 'application/octet-stream'});
        }
        saveAs(file);
      }
    });
  }

  getTestRunsData(){
    this.accessibilityService.getTestRunsData(this.loggedinUser$.value['email']).subscribe({
      next : response => {
        this.testRunsResponse$.next(response);
        this.saveTestRunDataInSessionStorage(response,this.loggedinUser$.value['email']);
        this.loadingStatus = false;
      },
      error : err => {
        this.setErrorData(err);
      }
    })
  }

  getTestRunDataCount(){
    this.accessibilityService.getTestRunsCount(this.loggedinUser$.value['email']).subscribe({
      next : response => {
        if(parseInt(response) !== this.testRunsResponse$.value.length){
          this.getTestRunsData();
        }else {
          this.loadingStatus = false;
        }

      },
      error : err => {
        this.setErrorData(err);
      }
    })
  }

  setErrorData(err :any){
    if (!err.status) {
      this.error = { networkStatus: 'Disconnected' };
    } else if (err.status === 500) {
      this.error = { errorCode500: true };
    } else {
      this.error = { unknownError: true };
    }
    this.loadingStatus = false;
  }

  saveTestRunDataInSessionStorage(response : any,email : string){
    sessionStorage.setItem('testrundata',JSON.stringify(response));
    sessionStorage.setItem('useremail',this.loggedinUser$.value['email']);
    sessionStorage.setItem('testrundatastoredtime', Date.now().toString());
  }

  validateTestRunDataInSessionStorage(email : string){
    let dataSavedTime = sessionStorage.getItem('testrundatastoredtime');
    let timeNow = Date.now();
    let userEmail = sessionStorage.getItem('useremail');
    if( dataSavedTime !== undefined && userEmail === email) {

      let timeDifference =((Date.now() - Date.parse(dataSavedTime))/1000)/60;
      if(timeDifference >=10){
        this.getTestRunsData();
      }else {
        let testRunsData = JSON.parse(sessionStorage.getItem('testrundata'));
        this.testRunsResponse$.next(testRunsData);
        this.getTestRunDataCount();
      }

    }else {
      this.getTestRunsData();
    }
  }

}
