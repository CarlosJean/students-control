import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CreateStudentComponent } from '../create-student/create-student.component';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  students:Array<any>;
  constructor(private firestore:AngularFirestore) { 

    this.firestore.collection('student')
    .valueChanges()
    .subscribe(student=>{
      this.students = student
    });    
  }

  ngOnInit(): void {}

  delete(id:string){    
    this.firestore.collection('student').doc(id).delete()
    .then(()=>console.log("Estudiante eliminado exitosamente."))
    .catch((error)=>console.error("Error al eliminar estudiante. \n"+error))
    ;   
  }
}
