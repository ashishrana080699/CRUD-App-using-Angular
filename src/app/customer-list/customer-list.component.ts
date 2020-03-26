import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor(public obj:CustomerService) { }
  custarray=[];//list of list
  showDeletedMessage:boolean;
  searchText: string='';

  ngOnInit(){
    this.obj.getcustomers().subscribe(
      list=>{
        this.custarray=list.map(item=>{
          return {
            $key:item.key,
            ...item.payload.val()
          };
        });
      });
  }

  

  ondelete($key){
    if(confirm('Are you sure to delete this record ?')){
      this.obj.deletecustomer($key);
      this.showDeletedMessage=true;
      setTimeout(() => {
        this.showDeletedMessage=false;
      }, 3000);
    }
  }


  filterCondition(customer) {
    return customer.fullname.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
  }

}
