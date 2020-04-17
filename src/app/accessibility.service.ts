import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AccessibilityService {
  rootUrl = "http://119.82.97.217:9091/equalitylabs";
  //rootUrl = "http://localhost:8080/equalitylabs";

  response$ = new BehaviorSubject({});
  constructor(private httpClient: HttpClient) {}

  testSingleUrl = (req: any) => {
    return this.httpClient.post(this.rootUrl + "/testpage", req).pipe(
      map(response => {
        this.response$.next(response);
      })
    );
  };

  testMultipleUrl = (req: any) => {
    return this.httpClient.post(this.rootUrl + "/testpages", req).pipe(
      map(response => {
        if (response != null) {
          this.response$.next(response);
        }
      })
    );
  };


  getTestRunsData = (email : string) => {
    return this.httpClient.post<[]>(this.rootUrl + '/testruns', {email});
  }

  getTestRunsCount = (email : string) => {
    return this.httpClient.post<string>(this.rootUrl + '/testrunscount',{email});
  }
}
