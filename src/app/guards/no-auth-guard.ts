import { inject } from '@angular/core'; 
import { CanActivateFn } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { UtilService } from '../services/utils';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const firebaseSvc = inject(FirebaseService);
  const utilSvc = inject(UtilService); 


return new Promise((resolve) => {
  firebaseSvc.getAuth().onAuthStateChanged((auth) => {
    if (!auth) {
      resolve(true);
    } else {
      utilSvc.routerLink('/auth');
      resolve(false);
    }
  });
});
  
  
  
  
  
  
  
  
  
  
  
  
  
  return true;
};
