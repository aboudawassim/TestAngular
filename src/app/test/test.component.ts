import { Component, OnInit } from '@angular/core';
import { Firestore , collection , addDoc, getDoc, doc , updateDoc, deleteDoc , collectionData} from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  users: FormGroup;
  userData!: Observable<any>;
  people: any[] = [];
  editUserForm: FormGroup;
  newData: any = {};



  constructor(public formBuilder: FormBuilder, private router: Router, private firestore:Firestore ) {

    this.users = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      married: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[^@yopmail.com]*')]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(60)]],
      country: ['', Validators.required],
      dob: ['', Validators.required]
    });


    this.editUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      married: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[^@yopmail.com]*')]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(60)]],
      country: ['', Validators.required],
      dob: ['', Validators.required]
    });


  }

  ngOnInit() {
    this.getData();
  }

  onSubmit() {
    const formData = this.users.value;
    this.addData(formData);
    this.users.reset();
  }

  addData(formData: any) {
    const collectionInstance =  collection(this.firestore, 'users');
    addDoc(collectionInstance, formData).then(() => {
      console.log('data added successfully');
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getData() {
    const collectionInstance =  collection(this.firestore, 'users');
    collectionData(collectionInstance).subscribe ( doc => {
      this.people = doc;
      console.log(this.people);
    })

    this.userData = collectionData(collectionInstance, {idField : 'id'})
  }

  updateData(id: string) {
    const docRef = doc(this.firestore, 'users', id);
    const newData = {
      name: 'updatedName'
    }
    updateDoc(docRef, newData).then(() => {
      console.log('data updated successfully');
    })
    .catch((err) => {
      console.log(err);
    })
  }

  deleteData(id: string) {
    const docRef = doc(this.firestore, 'users', id);
    deleteDoc(docRef).then(() => {
      console.log('data deleted successfully');
    })
    .catch((err) => {
      console.log(err);
    })
  }





}
