import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  taskList: any[] = [
    { 
      title: 'Hacer un CRUD con Angular y SQL server', 
      object: 'Crear una base de datos donde pueda hacer un crud atravez de angular', 
      date: '10/9/2021',
    },
  ];

  form: FormGroup;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService) { 
    this.form = this.fb.group({
      title: ['', Validators.required],
      object: ['', [Validators.required, Validators.maxLength(200)]],
      date: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]]
    })
  }

  ngOnInit(): void {
  }

  addTask(){
    const task: any = {
      title: this.form.get('title')?.value,
      object: this.form.get('object')?.value,
      date: this.form.get('date')?.value,
    }
    this.taskList.push(task);
    this.toastr.success('La tarea fue agregada con éxito!!!', 'Tarea agregada');
    this.form.reset();
  }

  deleteTask(index: number){
    this.taskList.splice(index, 1);
    this.toastr.error('La tarea fue eliminada con éxito!!!', 'Tarea eliminada');
  }

  editTask(task: any){
    this.form.patchValue({
      title: task.title,
      object: task.object,
      date: task.date
    })
  }
}
