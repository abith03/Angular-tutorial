import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
   signupUsers:any[]=[];
   signupObj:any={
    userName:'',
    email:'',
    password:''
   };
   loginObj:any={
      userName:'',
      password:''
   };

  constructor( private service:ApiserviceService,private router:Router) { }

  ngOnInit(): void {
     const localData =localStorage.getItem('signUpUsers');
     if(localData !=null){
      this.signupUsers=JSON.parse(localData);
     }

  }

  onSignUp(){
   this.router.navigateByUrl('/login');
    this.signupUsers.push(this.signupObj);
    localStorage.setItem('signUpUsers',JSON.stringify(this.signupUsers));
    this.signupObj={
      userName:'',
      email:'',
      password:''
     };
  }

  onLogin(){  
    debugger 
    this.router.navigateByUrl('/read');
     const isUserExist = this.signupUsers.find(m=> m.userName == this.loginObj.userName && m.password==this.loginObj.password);
     if(isUserExist !=undefined){
      alert('User Login Successfully');
     }else{
      alert('Wrong credentials')
     }
  }


}
