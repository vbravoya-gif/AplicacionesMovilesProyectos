import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(Auth);

  // ========== Autenticación ==========

  signIn(user: User) {
    return signInWithEmailAndPassword(this.auth, user.email, user.password);
  }
}