import { EstablishmentCard } from './../../../models/establishment/establishmentCard';
import { ImageService } from 'src/app/services/core/image.service';
import { OrderService } from './../../../services/Order.service';
import { DialogConfirmComponent } from './../../core/dialog-confirm/dialog-confirm.component';
import { DialogConfirm } from './../../../models/core/dialog';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './../../../services/User.service';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/ClientService.service';
import { Component, Input, OnInit } from '@angular/core';
import { Page } from 'src/app/models/core/page';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.css']
})
export class HomeClientComponent implements OnInit {

  establishments: Array<EstablishmentCard> = [];

  searchName: string = "";

  userAutenticado = JSON.parse(this.userService.getUserAutenticado())

  @Input()
  page: Page = {
    content: [],
    pageable: {
      sort: null,
      offset: 0,
      pageNumber: 0,
      pageSize: 0,
      paged: false,
      unpaged: false
    },
    last: false,
    totalPages: 0,
    totalElements: 0,
    size: 0,
    number: 0,
    first: false,
    numberOfElements: 0,
    empty: false,
    typeSearch: "default"
  }

  establishmentCard: EstablishmentCard = {
    id: 0,
    name: "",
    image: null
  }

  constructor(private service: ClientService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
    private orderService: OrderService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {

    this.reloadOrder()
    this.getEstablishments()
  }

  getEstablishments(page: number = 0): void {
    this.page.typeSearch = "default";

    this.service.getEstablishmentsHome(page).subscribe((data: Page) => {
      this.page = data
      this.establishments = data.content;
      this.uploadImages(this.establishments)
    })
  }


  changePage(pageEvent: any) {

    if (pageEvent.typeSearch == "searchByName")
      this.searchByName(pageEvent.page);
    else {
      this.getEstablishments(pageEvent.page);
    }
  }

  searchByName(page: number = 0): any {

    if (this.searchName == "") {
      this.getEstablishments(0)
      return false;
    }

    this.service.getEstablishmentByName(this.searchName, page).subscribe((data: Page) => {
      this.page = data;
      this.establishments = data.content
      this.page.typeSearch = "searchByName";
      this.uploadImages(this.establishments)
    })
    return true;
  }

  openOrderStart(currentEstablishment: EstablishmentCard) {
    this.orderService.setCurrentEstablishment(currentEstablishment);
    this.router.navigate(['/order-start/' + currentEstablishment.id]);
  }

  reloadOrder() {
    if (!this.orderService.getOrder()) {
      this.service.getClientWithCurrentOrder(this.userAutenticado.id).subscribe((data: any) => {
        if (data != null) {
          const dialogData: DialogConfirm = {
            content: 'Você tem uma comanda de número ' + data.id + ' deseja continua-la?',
            confirmText: 'Sim',
            cancelText: 'Não'
          }

          const dialogRef = this.dialog.open(DialogConfirmComponent, {
            data: dialogData
          })

          dialogRef.afterClosed().subscribe((result: any) => {

            if (result) {
              this.orderService.setOrder(data)
              this.orderService.novaComanda.emit(data)
              this.router.navigate(['bagitems/' + data.id])
            } else {
              this.orderService.updateStatusOrder('CANCELED', data.id).subscribe(() => {})
              localStorage.removeItem('order')
            }
          })
        }
      })
    }

  }
  uploadImages(list: Array<any>) {

    for (let elemnt of list) {
      this.imageService.getImage('establishment', elemnt.id).subscribe((res: any) => {
        let retrieveResonse = res;
        let base64Data = retrieveResonse.image;
        elemnt.image = 'data:image/jpeg;base64,' + base64Data;
      })
    }
  }
}
