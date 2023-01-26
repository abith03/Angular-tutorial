import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  successmsg: any;

  constructor(private service:ApiserviceService,private router:ActivatedRoute) { }

  errormsg:any;
  getparamid:any;

  ngOnInit(): void {
    this.getparamid=this.router.snapshot.paramMap.get('id');
    if(this.getparamid){
    this.service.getSingleData(this.getparamid).subscribe((res)=>{
      console.log(res,'res==>');
      this.medicineForm.patchValue({
        name:res.data[0].name,
        price:res.data[0].price,
        date:res.data[0].date
      });

    });
  }

    

  }

  medicineForm =new FormGroup({
     'name':new FormControl('',Validators.required),
     'price':new FormControl('',Validators.required),
     'date':new FormControl('',Validators.required)

  });

  medicineSubmit()
  {
    if(this.medicineForm.valid)
  {
     console.log(this.medicineForm.value);
     this.service.createData(this.medicineForm.value).subscribe((res)=>{
      console.log(res,'res==>');
      this.medicineForm.reset();
      this.successmsg = res.message;
     });
  }
  else
  {
    this.errormsg ='all field is required !';
  }
  }


  medicineUpdate()
  {
    console.log(this.medicineForm.value,'updatedform');
    if(this.medicineForm.valid)
    {
      this.service.updateData(this.medicineForm.value,this.getparamid).subscribe((res)=>{
        console.log(res,'resupdated');
        this.successmsg=res.message;
      });
    }else
    {
          this.errormsg='all field is required';
    }

  }
}