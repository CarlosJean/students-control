import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateStudentComponent } from './create-student/create-student.component';
import { StudentsListComponent } from './students-list/students-list.component';

const routes: Routes = [
  {path:'list',component:StudentsListComponent},
  {path:'',redirectTo:'list',pathMatch:'full'},
  {path:'create',component:CreateStudentComponent},
  {path:'update/:id',component:CreateStudentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
