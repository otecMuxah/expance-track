import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { NgForm } from '@angular/forms';
import { EventModel } from '../../shared/models/event.model';
import * as moment from 'moment';
import { EventsService } from '../../shared/services/events.service';
import { BillService } from '../../shared/services/bill.service';
import { BillModel } from '../../shared/models/bill.model';
import { P } from '@angular/core/src/render3';

import { tap, mergeMap, subscribeOn } from 'rxjs/operators';

@Component({
    selector: 'app-add-event',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
    @Input() categories: Category[] = [];
    types = [
        {type: 'income', label: 'Доход'},
        {type: 'outcome', label: 'Расход'},
    ];

    constructor(private eventService: EventsService,
                private billSrvice: BillService) {
    }

    ngOnInit() {
    }

    onSubmit(form: NgForm) {
        let {amount, description, category, type} = form.value;
        if (amount < 0) {
            amount *= -1;
        }
        const event = new EventModel(
            type,
            amount,
            +category,
            moment().format('DD.MM.YYYY HH:mm:ss'),
            description
        );

        this.billSrvice.getBill()
            .subscribe((bill: BillModel) => {
                let value = 0;
                if (type = 'outcome') {
                    if (amount > bill.value) {
                        // error
                    } else {
                        value = bill.value - amount;
                    }
                } else {
                    value = bill.value + amount;
                }

                this.billSrvice.updateBill({value: value, currency: bill.currency}).pipe(
                    mergeMap(() => this.eventService.addEvent(event)),
                ).subscribe(() => {
                    form.setValue({
                        amount: 0,
                        description: '',
                        category: 1,
                        type: 'outcome'
                    });
                });
            });
        this.eventService.addEvent(event);
    }

}
