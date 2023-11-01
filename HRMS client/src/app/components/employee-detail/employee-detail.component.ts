import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  getId: any;
  updateForm: FormGroup;
  
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    
    this.updateForm = this.formBuilder.group({
      EmployeeID:[''],
      FirstName: [''],
      LastName: [''],
      Designation: ['']
    })

    this.crudService.GetEmployee(this.getId).subscribe(res => {
      // this.updateForm.setValue({
        this.updateForm.patchValue({
        EmployeeID:res['EmployeeID'],
        FirstName: res['FirstName'],
        LastName: res['LastName'],
        Designation: res['Designation']
      });
    });
  }
  ngOnInit() { /* TODO document why this method 'ngOnInit' is empty */  }
  
  onUpdate(): any {
    this.crudService.updateEmployee(this.getId, this.updateForm.value)
    .subscribe(() => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/employees-list'))
      }, (err) => {
        console.log(err);
    });
  }
}
