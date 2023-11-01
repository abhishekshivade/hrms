import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})

export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) { 
    this.employeeForm = this.formBuilder.group({
      EmployeeID: [''],
      FirstName: [''],
      LastName: [''],
      Designation: ['']
    })
  }
  ngOnInit() { }
  onSubmit(): any {
    this.crudService.AddEmployee(this.employeeForm.value)
    .subscribe(() => {
        console.log('Data added successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/employees-list'))
      }, (err) => {
        console.log(err);
    });
  }
}