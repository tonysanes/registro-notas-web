import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Input() public message: string;
  @Output() action : EventEmitter<any> = new EventEmitter();
  
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  onCancel(){
    this.action.emit("close");
    this.activeModal.close("close");
  }
  onSubmit(){
    this.action.emit("save");
    this.activeModal.close("close");
  }

}
