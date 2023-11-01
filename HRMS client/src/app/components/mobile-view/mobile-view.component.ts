import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-mobile-view',
  templateUrl: './mobile-view.component.html',
  styleUrls: ['./mobile-view.component.css']
})
export class MobileViewComponent implements OnInit {

  isMobileView = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkIfMobile();
  }

  ngOnInit(): void {
    this.checkIfMobile();
  }

  private checkIfMobile(): void {
    console.log("checking Screen size")
    const screenWidth = window.innerWidth;
    if (screenWidth < 1024) { // Adjust this threshold as needed
      this.isMobileView = true;
    } else {
      this.isMobileView = false;
    }
    console.log("mobileView : "+this.isMobileView)
  }
}
