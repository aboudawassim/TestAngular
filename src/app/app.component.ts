import { Component, OnInit } from '@angular/core';
import { Firestore , collection , addDoc, getDoc, updateDoc, deleteDoc , collectionData} from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'test';



  constructor( ) {}

  }
