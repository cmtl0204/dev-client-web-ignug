import { Professional } from './../../../../models/job-board/models.index';
import { Company } from './../../../../models/job-board/models.index';

import { Offer } from '../../../../models/job-board/models.index';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NgxSpinnerService } from 'ngx-spinner';
import {JobBoardService} from '../../../../services/job-board/job-board-service.service';

@Component({
  selector: 'app-my-professionals',
  templateUrl: './app.my-professionals.component.html',
  styleUrls: ['./app.my-professionals.component.scss']
})
export class AppMyProfessionalsComponent implements OnInit {
  respuesta: any = [];
  // users: User;
  Offer: Offer[];
  // professionals: Array<Professional>;
  professionals: Array<Professional>;
  // company: Company<array>
  companies: Array<Company>;
  company: Company;
  // professional: Professional;
  // users: any;
  messageService: any;
  constructor(private http: HttpClient, private jobBoardService: JobBoardService,
              private spinnerService: NgxSpinnerService) {
    // this.users = JSON.parse(localStorage.getItem('user')) as User;
    this.Offer = new Array<Offer>();
    this.professionals = new Array<Professional>();
   }

  ngOnInit(): void {
    this.getInterestingProfessionals();
  }

  getInterestingProfessionals() {
    this.spinnerService.show();
    // const parameters = '?user_id=' + this.user.id + '&limit=15&page=1' ;
    const params = '?user_id=' + 1 ;
    this.jobBoardService.get('companies/professionals' + params).subscribe(response => {
      this.spinnerService.hide();
      this.professionals = response['data'];
      console.log(response);
      console.log(this.professionals);
    }, error => {
      this.spinnerService.hide();
      this.messageService.add({
        key: 'tst',
        severity: 'error',
        summary: 'Oops! Problemas con el servidor',
        detail: 'Vuelve a intentar más tarde',
        life: 5000
      });
    });
  }

//   deleteComapny(company: Company) {
//     this.confirmationService.confirm({
//         header: 'Eliminar ' + offer.code ,
//         message: '¿Estás seguro de eliminar?',
//         acceptButtonStyleClass: 'ui-button-danger',
//         rejectButtonStyleClass: 'ui-button-primary',
//         icon: 'pi pi-trash',
//         accept: () => {
//             this.spinnerService.show();
//             this.jobBoardService.delete( offer.id).subscribe(
//                 response => {
//                     const indiceOffer = this.Offer
//                         .findIndex(element => element.id === offer.id);
//                     this.users.splice(indiceOffer, 1);
//                     this.spinnerService.hide();
//                     this.messageService.add({
//                         key: 'tst',
//                         severity: 'success',
//                         summary: 'Se eliminó correctamente',
//                         detail: offer.code,
//                         life: 3000
//                     });
//                 }, error => {
//                     this.spinnerService.hide();
//                     this.messageService.add({
//                         key: 'tst',
//                         severity: 'error',
//                         summary: 'Oops! Problemas con el servidor',
//                         detail: 'Vuelve a intentar más tarde',
//                         life: 5000
//                     });
//                 });
//         }
//     });

// }
}
