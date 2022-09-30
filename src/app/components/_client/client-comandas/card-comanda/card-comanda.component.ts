import { OrderToClient } from './../../../../models/ClientWithOrders';
import { Component, Input, OnInit } from '@angular/core';
import { OrderStatus } from 'src/app/models/orderStatus';

@Component({
  selector: 'app-card-comanda',
  templateUrl: './card-comanda.component.html',
  styleUrls: ['./card-comanda.component.css']
})
export class CardComandaComponent implements OnInit {

  @Input()
  order: OrderToClient = {
    idOrder: 0,
    imageEstablishment: "",
    nameEstablishment: "",
    issueDate: "",
    orderStatus: 0
  }

  constructor() { }

  ngOnInit() {
  }

}
