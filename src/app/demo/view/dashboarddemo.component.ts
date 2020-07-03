import {Component, OnInit} from '@angular/core';
import {CarService} from '../service/carservice';
import {EventService} from '../service/eventservice';
import {Car} from '../domain/car';
import {SelectItem} from 'primeng/api';
import {BreadcrumbService} from '../../shared/breadcrumb/breadcrumb.service';

@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardDemoComponent implements OnInit {
    lineChartData: any;

    lineChartOptions: any;

    dropdownYears: SelectItem[];

    selectedYear: any;

    activeNews = 1;

    cars: Car[];

    cols: any[];

    selectedCar: Car;

    constructor(private carService: CarService, private eventService: EventService, private breadcrumbService: BreadcrumbService) {
        this.breadcrumbService.setItems([
            {label: 'Dashboard'},
            {label: 'Control Center', routerLink: ['/']}
        ]);
    }

    ngOnInit() {
        this.lineChartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Sapphire',
                    data: [1, 2, 5, 3, 12, 7, 15],
                    borderColor: [
                        '#45b0d5'
                    ],
                    borderWidth: 3,
                    fill: false
                },
                {
                    label: 'Roma',
                    data: [3, 7, 2, 17, 15, 13, 19],
                    borderColor: [
                        '#d08770'
                    ],
                    borderWidth: 3,
                    fill: false
                }
            ]
        };
        this.lineChartOptions = {
            responsive: true,
            maintainAspectRatio: true,
            fontFamily: '\'Candara\', \'Calibri\', \'Courier\', \'serif\'',
            hover: {
                mode: 'index'
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        fontColor: '#9199a9'
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        fontColor: '#9199a9'
                    }
                }]
            },
            legend: {
                display: true,
                labels: {
                    fontColor: '#9199a9'
                }
            }
        };

        this.dropdownYears = [
            {label: '2019', value: 2019},
            {label: '2018', value: 2018},
            {label: '2017', value: 2017},
            {label: '2016', value: 2016},
            {label: '2015', value: 2015},
            {label: '2014', value: 2014}
        ];

        this.carService.getCarsSmall().then(cars => this.cars = cars);

        this.cols = [
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
    }
}
