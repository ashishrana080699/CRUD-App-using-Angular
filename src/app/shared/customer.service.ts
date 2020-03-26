import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private db:AngularFireDatabase) { 
  }
  customerlist: AngularFireList<any>=null;
  
  formvalues= new FormGroup({
    $key: new FormControl('null'),
    fullname: new FormControl('', Validators.required),
    email: new FormControl(''),
    mobile: new FormControl('',[Validators.required, Validators.minLength(10)]),
    location: new FormControl('')
  });

  getcustomers(){
    this.customerlist= this.db.list('customers');
    return this.customerlist.snapshotChanges();
  
  }

  insertcustomer(customer){
    this.customerlist.push({
      fullname : customer.fullname,
      email : customer.email,
      mobile : customer.mobile,
      location : customer.location
    });
  }
public populate:boolean;
  populateForm(cust){
    this.populate=true;
    this.formvalues.setValue(cust);
  }

  updatecustomer(cust){
    this.customerlist.update(cust.$key,
      {
        fullname: cust.fullname,
        email: cust.email,
        location:cust.location,
        mobile:cust.mobile

    });
  }

  deletecustomer($key:string){
    this.customerlist.remove($key);
  }

}
