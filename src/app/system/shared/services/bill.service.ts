import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BillModel} from '../models/bill.model';
import {BaseApi} from '../../../shared/core/base-api';

@Injectable()
export class BillService extends BaseApi {
  constructor (public http: HttpClient) {
    super(http);
  }

  getBill(): Observable<BillModel> {
    return this.get('bill');
  }
  getCurrency(): Observable<any> {
    return this.http.get(`http://data.fixer.io/api/latest?access_key=0d796d4b3a697ca2b37cfd8716675bbc`);
  }
  updateBill(bill: BillModel): Observable<BillModel> {
    return this.put('bill', bill);
  }
}
