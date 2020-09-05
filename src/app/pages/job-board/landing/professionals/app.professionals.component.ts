import {Component, OnInit} from '@angular/core';
import {TreeNode} from 'primeng/api';
import {JobBoardService} from '../../../../services/job-board/job-board-service.service';
import {Professional} from '../../../../models/job-board/models.index';

@Component({
    selector: 'app-professionals',
    templateUrl: './app.professionals.component.html',
    styleUrls: ['app.professionals.component.scss'],
})
export class AppProfessionalsComponent implements OnInit {

    categories: TreeNode[] = [];
    categorySelected: TreeNode;
    professionals: Professional[];
    totalCompanies: number;
    totalProffesionals: number;
    totalOffers: number;
    blocked: boolean;
    //Searcher
    criterioBusqueda: string;


    constructor(private jobBoardService: JobBoardService) {
        this.criterioBusqueda = '';
    }

    ngOnInit() {
        this.getTotal();
        this.getProfessionals();
        this.getCatalogue();
    }

    getProfessionals(): void {
        this.blocked = true;
        this.jobBoardService.get('postulants?limit=9&page=1&field=id&order=DESC').subscribe(
            response => {
                this.professionals = response['postulants']['data'];
                this.blocked = false;
            },
            error => {
                console.error(error);
                this.blocked = false;
            }
        );
    }

    getTotal(): void {
        this.jobBoardService.get('total').subscribe(
            response => {
                this.totalCompanies = response['totalCompanies'];
                this.totalOffers = response['totalOffers'];
                this.totalProffesionals = response['totalProfessionals'];
            },
            error => console.error(error)
        );
    }

    getCatalogue(): void {
        this.jobBoardService.get('categories').subscribe(
            response => {

                response['data']['categories'].forEach(category => {
                    const categoryChildren = [];
                    category['children'].forEach(child => {
                        categoryChildren.push({label: child.name});
                    });
                    this.categories.push({label: category.name, children: categoryChildren});
                });

            },
            error => console.error(error)
        );
    }

    // Searched
    filterPostulantsField() {
        // this.filterOption = 'field';
        console.log(this.criterioBusqueda);
        this.jobBoardService.get(`postulants/filter?limit=9&page=1&field=id&order=DESC&filter=${this.criterioBusqueda.toUpperCase()}`)
            .subscribe(
            response => {
                this.professionals = response['postulants']['data'];
                console.log(this.professionals);
                /*
                if (response['pagination']['total'] === 0) {
                  swal({
                    title: 'Oops! No encotramos lo que estás buscando',
                    text: 'Intenta otra vez!',
                    type: 'info',
                    timer: 3500
                  });
                  this.total_pages = 1;
                } else {
                  this.total_pages = response['pagination']['last_page'];
                }
                */
            });
    }

}
