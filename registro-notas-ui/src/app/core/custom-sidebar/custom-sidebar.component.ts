import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-sidebar',
  templateUrl: './custom-sidebar.component.html',
  styleUrls: ['./custom-sidebar.component.scss']
})
export class CustomSidebarComponent implements OnInit {

  @Input("opened") opened : boolean = false; 
  @Output("changeOpen") close : EventEmitter<boolean> = new EventEmitter<boolean>();
  //opened : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.opened = !this.opened;
    this.close.emit();
  }

}
