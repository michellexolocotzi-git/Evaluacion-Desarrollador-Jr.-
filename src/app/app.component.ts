import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jsPDF } from "jspdf";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'jr-test';
  contacto: FormGroup;
  submitted = false;
  titulo = 'Formulario de Datos Generales';

  text: String = "";

  descarga(){
    var doc = new jsPDF();

    doc.text("Nombre: Rubén Apellido Paterno: Juarez Apellido Materno: Sanchez Fecha de Nacimiento:30/01/95 Nacionalidad: Mexicana Club de Fútbol: America ", 10, 10);

    doc.save("evaluacion.pdf");

  }

  
  constructor(private formBuilder: FormBuilder) { } 

  ngOnInit(){   
    this.contacto = this.formBuilder.group({
      nombre: ['', Validators.required], 
      paterno: ['', Validators.required], 
      materno: ['', Validators.required],
      ed: ['', Validators.required],
      genero: ['', Validators.required],
      nac: ['', Validators.required],
      club: ['', Validators.required],
      rfc: ['', Validators.required, , Validators.minLength(10)],
      ocu: ['', [Validators.required]]
  });
  }

  get f() { return this.contacto.controls; }
 
  onSubmit() {
      this.submitted = true;

      if (this.contacto.invalid) {
          return;
      }
      alert('Registrado, paso siguiente!')
  }
}
