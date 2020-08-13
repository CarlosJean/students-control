import { Component, OnInit, Optional } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  formData = {
    id: null,
    names: null,
    surnames: null,
    enrollment: null,
    career: null
  };

  successMessage = "Estudiante registrado exitosamente!";
  errorMessage = "Hubo un error al intentar registrar el estudiante.";
  error:boolean = null;
  isUpdate:boolean = false;
  formTitle:string = "Registrar nuevo";

  constructor(private db:AngularFirestore,private _activatedRoute:ActivatedRoute) {

    let action = this._activatedRoute.snapshot.url[0].path;    

    if (action == 'update'){
      this.isUpdate = true;
      this.formTitle = "Actualizar";
      let documentId = this._activatedRoute.snapshot.url[1].path;
      this.searchStudent(documentId);
    }
  }

  ngOnInit(): void {}

  submit(){
    let documentId = this.db.createId();

    if(this.isUpdate){
      documentId = this.formData.id;
    }

    this.formData.id = documentId;

    this.db.collection('student').doc(documentId).set(this.formData)
    .then(()=>{
      this.error = false;
      if(this.isUpdate){ this.successMessage = "Datos modificados exitosamente!";}
      else{  this.successMessage = "Datos insertados exitosamente!"; }
      this.cleanFormData();
    })
    .catch(error=>{
      this.error = false;
      console.error(error);
    });      
  }  

  searchStudent(documentId:string){
    let documentRef = this.db.collection('student').doc(documentId);
    documentRef.get().subscribe(document=>{

      this.formData.id = document.data().id;
      this.formData.names = document.data().names;
      this.formData.surnames = document.data().surnames;
      this.formData.enrollment = document.data().enrollment;
      this.formData.career = document.data().career;
    });
  }

  cleanFormData(){
    this.formData = {
      id: null,
      names: null,
      surnames: null,
      enrollment: null,
      career: null
    };
  }
}
