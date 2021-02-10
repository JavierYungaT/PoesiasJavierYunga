import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Poesia } from '../model/poesia';

@Injectable({
  providedIn: 'root'
})
export class PoesiaService {

  constructor(private afs: AngularFirestore) { }


  getPoesias(): Observable<any[]> {
    return this.afs.collection('poesia', 
    ref => ref.orderBy('titulo')).valueChanges();
  }

  insertPoesia(poesia: Poesia){
    const refEmpleo = this.afs.collection('poesia');
    poesia.uid = this.afs.createId();
    const param = JSON.parse(JSON.stringify(poesia));
    refEmpleo.doc(poesia.uid).set(param, {merge: true});
  }
}
