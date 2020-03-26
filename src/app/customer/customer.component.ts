import { Component, OnInit } from '@angular/core';

import { CustomerService } from '../shared/customer.service'


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(public obj: CustomerService) { }

  ngOnInit(): void {
  }
  showSuccessMessage: boolean;
  sub:boolean;
  formcontrols= this.obj.formvalues.controls

  onSubmit(){
    this.sub=true;
    if(this.obj.formvalues.valid){
    ///if (this.obj.formvalues.get('$key').value == null)
    if(this.obj.populate==true)
    {
      this.obj.updatecustomer(this.obj.formvalues.value);
      this.obj.populate=false;
    }
    else{
      this.obj.insertcustomer(this.obj.formvalues.value);
      this.sub=false;
    }
    this.showSuccessMessage = true;
    setTimeout(() => this.showSuccessMessage = false, 3000);
    }
  }

}
