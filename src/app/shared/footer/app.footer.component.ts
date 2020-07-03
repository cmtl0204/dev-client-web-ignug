import {Component, Inject, forwardRef} from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
        <div class="layout-footer">
			<div class="logo-text">
				<img id="logo-footer" src="assets/layout/images/logo-footer.png" alt="mirage-layout" />
				<div class="text">
					<h1>Yavirac</h1>
					<span>&copy; 2020 Todos los derechos reservados</span>
				</div>
			</div>
			<div class="icons">
				<div class="icon icon-hastag">
					<i class="pi pi-home" routerLink="/dashboard"></i>
				</div>
				<div class="icon icon-twitter">
					<i class="pi pi-globe"></i>
				</div>
				<div class="icon icon-prime">
					<i class="pi pi-bookmark"></i>
				</div>
			</div>
        </div>
    `
})
export class AppFooterComponent {

}
