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
					<i class="pi pi-home"></i>
				</div>
				<div class="icon icon-twitter">
					<a href="http://yavirac.edu.ec/" target="_blank"><i class="pi pi-globe"></i></a>
				</div>
			</div>
        </div>
    `
})
export class AppFooterComponent {

}
