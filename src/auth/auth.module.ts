import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { AngularFireModule, FirebaseAppConfig } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@Angular/fire/database';

import { SharedModule } from './shared/shared.module';
export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', loadChildren: './login/login.module#LoginModule' },
      { path: 'register', loadChildren: './register/register.module#RegisterModule' },

    ]
  }

]

export const firebaseConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyBorl8xTDZsaRyXKAQyDhcsit5C5J457pE",
  authDomain: "planner-71a2e.firebaseapp.com",
  databaseURL: "https://planner-71a2e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "planner-71a2e",
  storageBucket: "planner-71a2e.appspot.com",
  messagingSenderId: "404343797920",
  appId: "1:404343797920:web:c76d074993aeffb6d331c5",
  measurementId: "G-LQVRYZBGJB"
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
   
    // AngularFireDatabaseModule,
    SharedModule.forRoot(),     // prevent duplicated entrys
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,

  ]
})
export class AuthModule { }
