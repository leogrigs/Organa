import { Injectable } from '@angular/core';
import { Dashboard } from '../../models/dashboard.model';
import { data } from '../../utils/mock/data';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Card } from '../../models/card.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private afs: AngularFirestore) {
    this.pushCards();
  }
  dbDashboard = this.afs.collection<Dashboard>('dashboard');
  dbCard = this.afs.collection<Card>('card');
  dashboard!: Dashboard;

  getCards() {}

  pushCards() {
    // this.afs.collection('card').doc('/d7BTE0ux7veuacNH8X62').delete();
  }

  deleteCard(title: string) {
    this.dbDashboard.valueChanges().subscribe((dashboard) => {
      console.log(
        dashboard[0].cards.filter((card) => {
          return card.card_title === title;
        })
      );
    });
  }
}
