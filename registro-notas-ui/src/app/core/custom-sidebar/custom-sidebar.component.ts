import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-custom-sidebar',
  templateUrl: './custom-sidebar.component.html',
  styleUrls: ['./custom-sidebar.component.scss']
})
export class CustomSidebarComponent implements OnInit {

  @Input("opened") opened : boolean = false; 
  @Input("filters") filters: any[] = [];
  @Input("openedFrom") openedFrom: string;
  @Output("closed") closed : EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output("changeFilters") changeFilters : EventEmitter<any[]> = new EventEmitter<any[]>();

  filterForm: FormGroup;

  niveles: any[]=[{value:"INICIAL",label:"Inicial"},{value:"PRIMARIA",label:"Primaria"},{value:"SECUNDARIA",label:"Secundaria"}];
  grados: any[] = [];
  generos: any[] = [{value:"M",label:"Masculino"},{value:"F",label:"Femenino"}];

  isAlumnoFilter = false;
  isProfesorFilter = false;

  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.filters);
    this.isAlumnoFilter = (this.openedFrom == "Alumnos");
    this.isProfesorFilter = (this.openedFrom == "Profesores");
    this.crearFormulario();
    this.inicializarFormulario();
  }

  toggleSidebar() {
    this.opened = !this.opened;
    this.closed.emit();
  }

  crearFormulario(){
    this.filterForm = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.minLength(6)]],
      genero: ['', Validators.required],
      direccion: ['', Validators.required],
      fechaNacimiento: ['', Validators.required]
    });

    if(this.isAlumnoFilter){
      this.filterForm.addControl("nivel", this.fb.control('', Validators.required));
      this.filterForm.addControl("grado", this.fb.control('', Validators.required));
      this.filterForm.addControl("seccion", this.fb.control('', Validators.required));
    }
    if(this.isProfesorFilter){
      this.filterForm.addControl("dni", this.fb.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]));
    }
  }

  prepareFilters(){
    this.filters = [];
    let nombres = this.filterForm.controls["nombres"].value;
    let apellidos = this.filterForm.controls["apellidos"].value;
    let email = this.filterForm.controls["email"].value;
    let telefono = this.filterForm.controls["telefono"].value;
    let direccion = this.filterForm.controls["direccion"].value;
    let fechaNacimiento = this.filterForm.controls["fechaNacimiento"].value;
    let genero = this.filterForm.controls["genero"].value;

    if(this.isAlumnoFilter){
      let nivel = this.filterForm.controls["nivel"].value;
      let grado = this.filterForm.controls["grado"].value;
      let seccion = this.filterForm.controls["seccion"].value;
      if( nivel != ""){
        this.filters.push({key: "nivel", value1: nivel, value2: "", operation: "EQUAL", display: "Nivel="+nivel});
      }
      if( grado != ""){
        this.filters.push({key: "grado", value1: grado, value2: "", operation: "EQUAL", display: "Grado="+grado});
      }
      if( seccion != ""){
        this.filters.push({key: "seccion", value1: seccion, value2: "", operation: "EQUAL", display: "Seccion="+seccion});
      }
    }

    if(this.isProfesorFilter){
      let dni = this.filterForm.controls["dni"].value;
      if( dni != ""){
        this.filters.push({key: "dni", value1: dni, value2: "", operation: "EQUAL", display: "DNI="+dni});
      }
    }

    if( nombres != ""){
      this.filters.push({key: "nombres", value1: nombres, value2: "", operation: "EQUAL", display: "Nombre="+nombres});
    }
    if( apellidos != ""){
      this.filters.push({key: "apellidos", value1: apellidos, value2: "", operation: "EQUAL", display: "Apellidos="+apellidos});
    }
    if( email != ""){
      this.filters.push({key: "email", value1: email, value2: "", operation: "EQUAL", display: "Email="+email});
    }
    if( telefono != ""){
      this.filters.push({key: "telefono", value1: telefono, value2: "", operation: "EQUAL", display: "Telefono="+telefono});
    }
    if( direccion != ""){
      this.filters.push({key: "direccion", value1: direccion, value2: "", operation: "EQUAL", display: "Direccion="+direccion});
    }
    if( fechaNacimiento != ""){
      this.filters.push({key: "fechaNacimiento", value1: fechaNacimiento, value2: "", operation: "EQUAL", display: "Nacimiento="+fechaNacimiento});
    }
    if( genero != ""){
      this.filters.push({key: "genero", value1: genero, value2: "", operation: "EQUAL", display: "Genero="+genero});
    }

  }

  inicializarFormulario(){
    this.filters.forEach(element => {
      this.filterForm.controls[element.key].setValue(element.value1);
      if(this.isAlumnoFilter && element.key == "nivel"){
        this.loadGradosByNivel(element.value1);
      }
    });

/*     this.filterForm.controls["nombres"].setValue(this.currentAlumno.nombres);
    this.filterForm.controls["apellidos"].setValue(this.currentAlumno.apellidos);
    this.filterForm.controls["email"].setValue(this.currentAlumno.email);
    this.filterForm.controls["telefono"].setValue(this.currentAlumno.telefono);
    this.filterForm.controls["nivel"].setValue(this.currentAlumno.nivel);
    this.filterForm.controls["grado"].setValue(this.currentAlumno.grado);
    this.filterForm.controls["seccion"].setValue(this.currentAlumno.seccion);
    this.filterForm.controls["direccion"].setValue(this.currentAlumno.direccion);
    let fechaNac = moment(this.currentAlumno.fechaNac).format('YYYY-MM-DD');
    this.filterForm.controls["fechaNacimiento"].setValue(fechaNac); */
  }

  onChangeNivel(nivel:any){
    this.grados = [];
    let nivelValue = nivel.target.value;
    this.loadGradosByNivel(nivelValue);
  }

  loadGradosByNivel(nivelValue: string){
    if(nivelValue == "INICIAL"){
      this.grados = [
        { value: "3 AÑOS", label: "3 años"},
        { value: "4 AÑOS", label: "4 años"},
        { value: "5 AÑOS", label: "5 años"}
      ];
    } else if(nivelValue == "PRIMARIA"){
      this.grados = [
        { value: "PRIMERO", label: "Primero"},
        { value: "SEGUNDO", label: "Segundo"},
        { value: "TERCERO", label: "Tercero"},
        { value: "CUARTO", label: "Cuarto"},
        { value: "QUINTO", label: "Quinto"},
        { value: "SEXTO", label: "Sexto"}
      ];
    } else if(nivelValue == "SECUNDARIA"){
      this.grados = [
        { value: "PRIMERO", label: "Primero"},
        { value: "SEGUNDO", label: "Segundo"},
        { value: "TERCERO", label: "Tercero"},
        { value: "CUARTO", label: "Cuarto"},
        { value: "QUINTO", label: "Quinto"}
      ];
    }
  }
  submitFilter(){
    this.closed.emit(true);
    this.prepareFilters();
    this.changeFilters.emit(this.filters);
  }

  closeFilter(){
    this.closed.emit(true);
  }

}
