import { Component, OnInit } from '@angular/core';
import { TreeNode, MegaMenuItem } from 'primeng/api';
import { JobBoardService } from '../../../../services/job-board/job-board.service';
import { Professional } from '../../../../models/job-board/models.index';
import { isUndefined, isError, isNullOrUndefined } from 'util';
import { isEmpty } from 'rxjs/operators';

@Component({
    selector: 'app-professionals',
    templateUrl: './app.professionals.component.html',
    styleUrls: ['app.professionals.component.scss'],
})
export class AppProfessionalsComponent implements OnInit {

    categories: TreeNode[] = [];
    categorySelected: TreeNode[];
    professionals: Professional[];
    totalCompanies: number;
    totalProffesionals: number;
    totalOffers: number;
    blocked: boolean;
    //Searcher
    criterioBusqueda: string;

    // Paginate
    total_pages: number;
    actual_page: number;
    records_per_page: number;
    totalRecords: number;
    filterOption: string;

    //Menu
    items: MegaMenuItem[];

    constructor(private jobBoardService: JobBoardService) {
        this.criterioBusqueda = '';
        this.total_pages = 1;
        this.actual_page = 1;
        this.records_per_page = 9;
        this.totalRecords = 1;
        this.filterOption = 'deafut';
        this.categorySelected = [];
        //Menu
        this.items = [
            {
                label: 'Acerca de Nosotros', icon: 'pi pi-fw pi-video',
            },
            {
                label: 'Profesionales', icon: 'pi pi-fw pi-video',
            },
            {
                label: 'Ofertas Laborales', icon: 'pi pi-fw pi-video',
            },
            {
                label: 'Inicio Sesión', icon: 'pi pi-fw pi-video',
            },
            {
                label: 'Registro Empresas', icon: 'pi pi-fw pi-video',
            },
            {
                label: 'Registro Profesionales', icon: 'pi pi-fw pi-video',
            },
        ]
    }

    ngOnInit() {
        this.getTotal();
        this.getProfessionals();
        this.getCatalogue();
    }

    paginate(event: boolean) {
        this.actual_page = event['page'] + 1;
        switch (this.filterOption) {
            case 'default':
                this.getProfessionals();
                break;
            case 'searched':
                this.filterPostulantsField();
                break;
            case 'filter':
                this.filterPostulantsSingle()
                break;
        }   
    }

    getProfessionals(): void {
        this.filterOption = 'default';
        this.blocked = true;
        this.jobBoardService.get(`postulants?limit=${this.records_per_page}&page=${this.actual_page}&field=id&order=DESC`)
        .subscribe(
            response => {
                this.professionals = response['postulants']['data'];
                this.blocked = false;
                if (response['pagination']['total'] === 0) {
                    this.total_pages = 1;
                } else {
                    this.total_pages = response['pagination']['last_page'];
                }
                this.totalRecords = response['pagination']['total'];
                this.actual_page = response['pagination']['current_page'];
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
                        categoryChildren.push({ label: child.name });
                    });
                    this.categories.push({ label: category.name, children: categoryChildren });
                });

            },
            error => console.error(error)
        );
    }

    // Searched
    filterPostulantsField() {
        this.blocked = true;
        this.filterOption = 'searched';
        if ( this.total_pages === this.actual_page ) {
            this.actual_page = 1;
        }
        if( this.categorySelected.length > 0 ) {
            this.filterPostulantsSingle();
        } else {
            this.jobBoardService.get(`postulants/filter?limit=${this.records_per_page}&page=${this.actual_page}
                                        &field=id&order=DESC&filter=${this.criterioBusqueda.toUpperCase()}`)
            .subscribe(
                response => {
                    this.professionals = response['postulants']['data'];
                    if (response['pagination']['total'] === 0) {
                        this.total_pages = 1;
                    } else {
                        this.total_pages = response['pagination']['last_page'];
                    }
                    this.totalRecords = response['pagination']['total'];
                    this.actual_page = response['pagination']['current_page'];
                    this.blocked = false;
                }, err => {
                    console.error(err);
                    this.blocked = false;
                }
            );
        }
    }

    checkSearch() {
        if( this.criterioBusqueda == "" ) {
            switch (this.filterOption) {
                case 'default':
                    this.getProfessionals();
                    break;
                case 'filter':
                    this.filterPostulantsSingle()
                    break;
                default :
                    this.getProfessionals();
                    break
            }
        }
    }

    // Searched for filter
    filterPostulantsSingle() {
        this.blocked = true;
        this.filterOption = 'filter';
        let conditions = [];
        if ( this.total_pages === this.actual_page ) {
            this.actual_page = 1;
        }
        if( this.categorySelected.length == 0 ) {
            this.getProfessionals();  
        } else {
            conditions = this.filterParentAndSon();
            this.jobBoardService.post(`postulants/filter?limit=${this.records_per_page}&page=${this.actual_page}
                                        &field=id&order=DESC`, JSON.stringify({ 'filters': { 'conditions': conditions } }))
            .subscribe(
                response => {
                    this.professionals = response['postulants']['data'];
                    if (response['pagination']['total'] === 0) {
                        this.total_pages = 1;
                    } else {
                        this.total_pages = response['pagination']['last_page'];
                    }
                    this.totalRecords = response['pagination']['total'];
                    this.actual_page = response['pagination']['current_page'];
                    this.blocked = false;
                }, err => {
                    console.error(err);
                    this.blocked = false;
                }
            )
        }
    }

    filterParentAndSon(): any {
        let condition = {
            code: [],
            text: []
        };
        this.categorySelected.forEach(element => {
            if (element.parent && !isUndefined(element.parent)) {
                if (this.existCareer(this.categorySelected, element.parent.label, 'AllCategorySelected') != -1) {
                    if (condition.code.length > 0) {
                        if (this.existCareer(condition, element.parent.label, 'AllCategorySend')) {
                            return;
                        } else {
                            condition.code.push(element.parent.label)
                        }
                    } else {
                        condition.code.push(element.parent.label)
                    }
                    return;
                } else {
                    condition.text.push(element.label)
                }
            } else if (element.children && !element.expanded) {
                condition.code.push(element.label)
            }
        });
        return condition;
    }

    existCareer(array, career, option) {
        let thatreturn;
        if (option == 'AllCategorySelected') {
            for (let i = 0; i < array.length; i++) {
                if (array[i].label == career) {
                    return thatreturn = i;
                }
            }
            thatreturn = -1;
        } else if (option == 'AllCategorySend') {
            array.code.forEach(testElement => {
                if (testElement == career) {
                    return thatreturn = true;
                } else if (!thatreturn) {
                    thatreturn = false;
                }
            })
        }
        return thatreturn;
    }

}
