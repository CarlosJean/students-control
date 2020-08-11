import { Component, OnInit, Optional } from '@angular/core';
import { firestore } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  formData = {
    id:null,
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
      let documentId = this._activatedRoute.snapshot.url[1].path;
      this.isUpdate = true;
      this.formTitle = "Actualizar";
      this.searchStudent(documentId);
    }
  }

  ngOnInit(): void {
  }

  submit(){
    let documentId = this.db.createId();

    if(this.isUpdate){
      documentId = this.formData.id;
    }

    this.formData.id = documentId;

    this.db.collection('student').doc(documentId).set(this.formData)
    .then(()=>{alert(this.successMessage)})
    .catch(error=>{
      alert(this.errorMessage+='\n'+error);
      this.error = true;
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
      console.log(this.formData);      
    });
  }
}
