import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {JobBoardService} from '../../../../../services/job-board/job-board.service';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-ofertas-aplicadas',
    templateUrl: './ofertas-aplicadas.component.html',
})
export class AppAppliedOffersComponent implements OnInit {

    pivot: any;

    userId: string = '5';

    displayModal: boolean;

    opportunitiesTrue: boolean = false;

    opportunities: any;

    constructor(private spinnerService: NgxSpinnerService,
                private jobBoardService: JobBoardService,
                private messageService: MessageService,
    ) {
    }

    ngOnInit(): void {
        this.getOportunities();
    }

    getOportunities() {
        this.spinnerService.show();
        const params = '?user_id=';
        this.jobBoardService.get(`opportunities/applied-offers${params}${this.userId}`).subscribe(
            response => {
                //console.log('entre a lo bueno' + JSON.stringify(response));
                this.spinnerService.hide();
                if (response['data']['opportunities'].length == 0) {
                    this.opportunitiesTrue = true;
                    this.opportunities = response['data']['opportunities'];
                } else {
                    let data = response['data']['opportunities'];
                    this.validateDataOffers(data);
                    //this.opportunitiesTrue = true;
                }
                //console.log(this.opportunitiesTrue)
                //console.dir('veamos  ' + JSON.stringify(this.opportunities));
            }, err => {
                this.spinnerService.hide();
                console.log('algo salio mal ' + JSON.stringify(err));
                this.messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'algo ocurrio con el servidor',
                    detail: 'intenta mas tarde',
                    life: 3500
                });
            });
    }

    updateOffer() {

        this.spinnerService.show();
        let params = {
            'professional_id': this.pivot.professional_id,
            'offer_id': this.pivot.offer_id,
            'id': this.pivot.id
        };
        this.jobBoardService.update('opportunities/unlink-offer', params).subscribe(
            response => {
                this.spinnerService.hide();
                this.messageService.add({
                    key: 'tl',
                    severity: 'info',
                    summary: 'Success Messages',
                    detail: 'Order submitted'
                    //life: 3000
                });
            }, error => {
                this.spinnerService.hide();
                this.messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Oops! Problemas con el servidor',
                    detail: 'Vuelve a intentar más tarde',
                    life: 5000
                });
            }
        );
    }

    showModalDialog(pivot) {
        this.displayModal = true;
        this.pivot = pivot;
    }

    getUserid(element) {
        this.userId = element;
        this.getOportunities();
        this.messageService.add({
            key: 'prb',
            severity: 'success',
            summary: 'Usuario cambiado',
            detail: `Ahora es el usuario ${this.userId}`,
            life: 3500
        });
    }

    showModal() {
        this.opportunitiesTrue = true;
    }

    validateDataOffers(datos) {
        this.opportunities = datos.filter(dato => dato.pivot.status_id == 1);
        if (this.opportunities.length == 0) {
            this.opportunitiesTrue = true;
        }
    }


}
