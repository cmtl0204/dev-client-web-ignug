import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

import {Offer, Category} from '../../../../models/job-board/models.index';
import {SelectItem} from 'primeng/api';
import {TreeNode} from 'primeng/api';
import {JobBoardService} from '../../../../services/job-board/job-board-service.service';

@Component({
    selector: 'app-offers',
    templateUrl: './app.offers.component.html',
    styleUrls: ['./app.offers.component.scss']
})
export class AppOffersComponent implements OnInit {
    items: MenuItem[] = [];
    selectedOffer: Offer;
    offers: Offer[];
    totalCompanies: number;
    totalProffesionals: number;
    totalOffers: number;
    displayDialog: boolean;

    sortOptions: SelectItem[];

    sortKey: string;

    sortField: string;

    sortOrder: number;

    selectedCategories: TreeNode[];
    categories: TreeNode[];

    constructor(private jobBoardService: JobBoardService) {

    }

    ngOnInit(): void {

        this.getOffers();
        this.getCategories();

        this.getTotal();
        this.sortOptions = [
            {label: 'Uno', value: '!uno'},
            {label: 'Dos', value: 'dos'},
            {label: 'Tres', value: 'tres'}
        ];

    }

    getOffers(): void {

        this.jobBoardService.get('offers').subscribe(
            res => {
                this.offers = res['offers'];
                console.log(this.offers);
            },
            error => {
                console.error(error);
                console.log(error);

            }
        );
    }

    getTotal(): void {
        this.jobBoardService.get('total').subscribe(
            resolve => {
                this.totalCompanies = resolve['totalCompanies'];
                this.totalOffers = resolve['totalOffers'];
                this.totalProffesionals = resolve['totalProfessionals'];
            },
            error => console.error(error)
        );
    }

    selectOffer(event: Event, offer: Offer) {
        this.selectedOffer = offer;
        this.displayDialog = true;
        event.preventDefault();
    }

    onSortChange(event) {
        let value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    getCategories(): void {

        this.jobBoardService.get('categories/index').subscribe(
            response => {
                const categories = response['data']['categories'];
                this.categories = [];
                // categories.forEach(category => {
                //   this.categories.push({'data':{'label': categories.name, 'data': categories.name}, 'children': category.children})
                // });
                // const testCategory = [
                //   {
                //     'name': 'TEST1',
                //     'children': [
                //       {
                //         'name': 'SUBTEST1',
                //         'children': []
                //       }
                //     ]
                //   },
                //   {
                //     'name': 'TEST2',
                //     'children': [
                //       {
                //         'name': 'SUBTEST2',
                //         'children': []
                //       }
                //     ]
                //   },
                //   {
                //     'name': 'TEST3',
                //     'children': []
                //   }
                // ];
                this.handleTree(categories);
            },
            error => {
                console.error(error);
                console.log(error);

            }
        );
    }

    handleTree(response: any) {
        response.forEach(category => {
            const childObjects = [];
            category.children.forEach(subCategory => {
                childObjects.push({'label': subCategory.name});
            });
            this.categories.push({'label': category.name, 'children': childObjects});
        });
        console.log(this.categories);
    }
}
