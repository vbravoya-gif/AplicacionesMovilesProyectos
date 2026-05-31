import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, getAuth, sendPasswordResetEmail } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { User } from '../models/user.models';
@Injectable({ providedIn: 'root' })
export class FirebaseService {
  auth = inject(Auth);
  firestore = inject(Firestore);




  getAuth(){
    return getAuth();
  }

  signIn(user: User) {
    return signInWithEmailAndPassword(this.auth, user.email, user.password);
  }

  // Registro//
  signUp(user: User) {
    return createUserWithEmailAndPassword(this.auth, user.email, user.password);
  }

  // Enviar email para restablecer la contraseña //
  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }





  // Actualizar nombre
  updateUser(displayName: string) {
    return updateProfile(this.auth.currentUser!, { displayName });
  }

  // Guardar en Firestore
  setDocument(path: string, data: any) {
    return setDoc(doc(this.firestore, path), data);
  }
  // ========== Obtener un Documento ==========
  async getDocument(path: string) {
    return (await getDoc(doc(this.firestore, path))).data();
  }
}