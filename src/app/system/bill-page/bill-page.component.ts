import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {Observable, combineLatest, Subscription} from 'rxjs';
import {BillModel} from '../shared/models/bill.model';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  sub2: Subscription;

  currency: any;
  bill: BillModel;

  isLoaded = false;

  onRefresh() {
    this.isLoaded = false;
    this.sub1 = this.billService.getCurrency().subscribe((currency: any) => {
      this.currency = currency;
      this.isLoaded = true;
    });
  }
  constructor(private billService: BillService) { }

  ngOnInit() {
    const combined = combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    );
    this.sub2 = combined.subscribe((data: [BillModel, any]) => {
      this.bill = data[0];
      this.currency = data[1];
      this.isLoaded = true;
    });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }

    this.sub2.unsubscribe();
  }

}
