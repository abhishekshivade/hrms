import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})

export class EmployeesListComponent implements OnInit {
  
  Employees:any = [];
  constructor(private crudService: CrudService) { }
  ngOnInit(): void {
    this.crudService.GetEmployees().subscribe(res => {
      console.log(res)
      this.Employees =res;
    });    
  }
  delete(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.crudService.deleteEmployee(id).subscribe((_res) => {
        this.Employees.splice(i, 1);
      })
    }
  }
}