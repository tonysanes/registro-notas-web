import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit-persona',
  templateUrl: './edit-persona.component.html',
  styleUrls: ['./edit-persona.component.scss']
})
export class EditPersonaComponent implements OnInit {
  //Parametro de entrada alumo object
  @Input() inputAlumno: any;

  //Parametro de entrada y salida: flag
  @Input() showEditForm: any;
  @Output() showEditFormChange = new EventEmitter();
 
  constructor() { }

  ngOnInit() {
    console.log(this.inputAlumno);
  }
  close(){
    this.showEditForm = false;
    this.showEditFormChange.emit(this.showEditForm);
  }
}
