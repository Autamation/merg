import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTwitter, faFacebook, faInstagram, faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(library: FaIconLibrary) {
    library.addIcons(faTwitter);
    library.addIcons(faFacebook);
    library.addIcons(faLinkedin);
    library.addIcons(faYoutube);
    library.addIcons(faInstagram);
  }

  ngOnInit(): void {
  }

}
