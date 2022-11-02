import { Injectable } from '@angular/core';
import { Dashboard } from '../../models/dashboard.model';
import { data } from '../../utils/mock/data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getCards(){
    return data as Dashboard;
  }
}
