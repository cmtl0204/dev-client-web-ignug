import { Component, OnInit } from '@angular/core';
import { Car } from '../domain/car';
import { CarService } from '../service/carservice';
import { ConfirmationService } from 'primeng/api';
import { BreadcrumbService } from '../../shared/breadcrumb/breadcrumb.service';

@Component({
    templateUrl: './overlaysdemo.component.html',
    styles: [`
        :host ::ng-deep a {
            margin-right: .5em;
        }
    `],
    providers: [ConfirmationService]
})
export class OverlaysDemoComponent implements OnInit {

    cars: Car[];

    cols: any[];

    images: any[];

    display: boolean;

    constructor(private carService: CarService, private confirmationService: ConfirmationService,
                private breadcrumbService: BreadcrumbService) {
        this.breadcrumbService.setItems([
            { label: 'Components' },
            { label: 'Overlays', routerLink: ['/components/overlays'] }
        ]);
    }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars.splice(0, 5));

        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];

        this.images = [];
        this.images.push({
            source: 'assets/demo/images/sopranos/sopranos1.jpg',
            thumbnail: 'assets/demo/images/sopranos/sopranos1_small.jpg', title: 'Sopranos 1'
        });
        this.images.push({
            source: 'assets/demo/images/sopranos/sopranos2.jpg',
            thumbnail: 'assets/demo/images/sopranos/sopranos2_small.jpg', title: 'Sopranos 2'
        });
        this.images.push({
            source: 'assets/demo/images/sopranos/sopranos3.jpg',
            thumbnail: 'assets/demo/images/sopranos/sopranos3_small.jpg', title: 'Sopranos 3'
        });
        this.images.push({
            source: 'assets/demo/images/sopranos/sopranos4.jpg',
            thumbnail: 'assets/demo/images/sopranos/sopranos4_small.jpg', title: 'Sopranos 4'
        });
    }

    confirm() {
        this.confirmationService.confirm({
            message: 'Are you sure to perform this action?'
        });
    }
}
