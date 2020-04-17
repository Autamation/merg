import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { UserService } from "src/app/user.service";
import { BehaviorSubject, pipe } from "rxjs";
import { Router } from "@angular/router";
import { AccessibilityService } from "src/app/accessibility.service";
import { saveAs } from  'file-saver'

@Component({
  selector: "app-trustmark-home",
  templateUrl: "./trustmark-home.component.html",
  styleUrls: ["./trustmark-home.component.css"]
})
export class TrustmarkHomeComponent implements OnInit {
  signedin$ = new BehaviorSubject(false);
  loggedinUser$ = new BehaviorSubject({});
  response$ = new BehaviorSubject({});
  error: any;
  loadingStatus = false;
  capacity = 0;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private accessibilityService: AccessibilityService
  ) {
    this.loggedinUser$ = this.userService.loggedinUser$;
    this.response$ = this.accessibilityService.response$;
  }

  path = "";
  srcResult = "";
  ngOnInit(): void {
    this.capacity = 0;
  }

  singleUrlForm = this.fb.group({
    url: "",
    email: ""
  });

  multiUrlForm = this.fb.group({
    file: "",
    email: this.loggedinUser$.value["email"]
  });

  singleUrlSubmit() {
    this.initProgressbar();
    this.error = "";
    this.loadingStatus = true;
    this.accessibilityService
      .testSingleUrl({
        url: this.singleUrlForm.get("url").value,
        email: this.loggedinUser$.value["email"]
      })
      .subscribe({
        next: response => {
          this.router.navigate(['/report',this.response$.value['id']]);
        },
        error: err => {
          if (!err.status) {
            this.error = { networkStatus: "Disconnected" };
          } else if (err.status === 500) {
            this.error = { errorCode500: true };
          } else {
            this.error = { unknownError: true };
          }
          this.loadingStatus = false;
        }
      });
  }

  multiUrlSubmit() {
    this.error = "";
    this.loadingStatus = true;
    const formData = new FormData();
    formData.append("file", this.multiUrlForm.get("file").value);
    formData.append("email", this.loggedinUser$.value["email"]);
    this.accessibilityService.testMultipleUrl(formData).subscribe({
      next: response => {
        this.router.navigate(['/report',this.response$.value['id']]);
      },
      error: err => {
        if (!err.status) {
          this.error = { networkStatus: "Disconnected" };
        } else if (err.status === 500) {
          this.error = { errorCode500: true };
        } else {
          this.error = { unknownError: true };
        }
        this.loadingStatus = false;
      }
    });
  }

  downloadTemplate(){

    this.accessibilityService.downloadReport({downloadTemplate : true}).subscribe({
        next : (response : any) =>{
          let blob = new Blob([response],{type: 'application/octet-stream'});
          let file = new File([blob],'URL_TEMPLETE_FILE.xlsx',{type: 'application/octet-stream'});
          saveAs(file);
        }
    });

  }

  onFileSelected() {
    const inputNode: any = document.querySelector("#file");
    const fileData = inputNode.files[0];
    this.multiUrlForm.get("file").setValue(fileData);
    this.path = inputNode.files[0].name;
  }

  initProgressbar() {
    const progress = setInterval(() => {
      this.capacity = this.capacity + 1;
      if (this.capacity >= 100) {
        clearInterval(progress);
      }
    }, 100);
  }
}
