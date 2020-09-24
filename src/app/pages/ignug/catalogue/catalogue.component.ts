import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from '../../../shared/breadcrumb/breadcrumb.service';
import {SettingsService} from '../../../services/ignug/settings.service';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Catalogue} from '../../../models/ignug/catalogue';
import {NgxSpinnerService} from 'ngx-spinner';
import {IgnugService} from '../../../services/ignug/ignug.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-catalogue',
    templateUrl: './catalogue.component.html',
    styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
    types: any[];
    icons: SelectItem[];
    formCatalogue: FormGroup;
    displayFormCatalogue: boolean;
    catalogues: Catalogue[];
    parentCodeCatalogues: SelectItem[];
    selectedCatalogue: Catalogue;
    headerDialogCatalogue: string;
    colsCatalogue: any[];
    flagEditCatalogue: boolean;

    constructor(private _breadcrumbService: BreadcrumbService,
                private _settingsService: SettingsService,
                private _fb: FormBuilder,
                private _confirmationService: ConfirmationService,
                private _spinnerService: NgxSpinnerService,
                private _ignugService: IgnugService,
                private _messageService: MessageService,
                private _translate: TranslateService,
    ) {
        this._breadcrumbService.setItems([
            {label: 'Catalogues'}
        ]);
        this._settingsService.getIcons().then(response => {
            const icons = [{
                'label': '',
                'value': ''
            }];
            this.icons = icons.concat(response);

        });
        this.catalogues = [];
        this.buildFormCatalogue();

    }

    ngOnInit(): void {
        this.types = [
            {label: '', value: ''},
            {label: 'New York', value: 'NY'},
            {label: 'Rome', value: 'RM'},
            {label: 'London', value: 'LDN'},
            {label: 'Istanbul', value: 'IST'},
            {label: 'Paris', value: 'PRS'}
        ];

        this.getCatalogues();
        this.setColsCatalogue();

    }

    setColsCatalogue() {
        this._translate.stream('CODE').subscribe(response => {
            this.colsCatalogue = [
                {field: 'code', header: this._translate.instant('CODE')},
                {field: 'name', header: this._translate.instant('NAME')},
                {field: 'type', header: this._translate.instant('TYPE')},
                {field: 'icon', header: this._translate.instant('ICON')},
            ];
        });

    }

    getEthnicOrigins(): void {
        const parameters = '?type=ethnic_origin';
        this._ignugService.get('catalogues' + parameters).subscribe(
            response => {
                const ethnicOrigins = response['data']['catalogues'];
                this.types = [{label: 'Seleccione', value: ''}];
                ethnicOrigins.forEach(item => {
                    this.types.push({label: item.name, value: item.id});
                });

            }, error => {
                this._messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Oops! Problemas al cargar el catálogo Etninas',
                    detail: 'Vuelve a intentar más tarde',
                    life: 5000
                });
            });
    }

    getCatalogues() {
        this._spinnerService.show();
        this._ignugService.get('catalogues').subscribe(
            response => {
                this._spinnerService.hide();
                this.catalogues = response['data']['catalogues'];
                this.parentCodeCatalogues = [];
                this.catalogues.forEach(catalogue => {
                    this.parentCodeCatalogues.push({'label': catalogue.name, 'value': catalogue.id});
                });
            }, error => {
                this._spinnerService.hide();
                this._messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Oops! Problemas con el servidor',
                    detail: 'Vuelve a intentar más tarde',
                    life: 5000
                });
            });
    }

    buildFormCatalogue() {
        this.formCatalogue = this._fb.group({
            id: [''],
            code: ['', Validators.required],
            parent_code_id: ['1', Validators.required],
            name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
            icon: ['', Validators.required],
            type: ['', Validators.required],
        });
    }

    onSubmitCatalogue(event: Event) {
        event.preventDefault();
        if (this.formCatalogue.valid) {
            if (this.flagEditCatalogue) {
                this.createCatalogue();
            } else {
                this.updateCatalogue();
            }
        } else {
            this.formCatalogue.markAllAsTouched();
        }
    }

    selectCatalogue(catalogue: Catalogue): void {
        if (catalogue) {
            this.selectedCatalogue = catalogue;
            this.formCatalogue.controls['parent_code_id'].setValue(catalogue.parent_code.id);
            this.formCatalogue.controls['id'].setValue(catalogue.id);
            this.formCatalogue.controls['code'].setValue(catalogue.code);
            this.formCatalogue.controls['name'].setValue(catalogue.name);
            this.formCatalogue.controls['type'].setValue(catalogue.type);
            this.formCatalogue.controls['icon'].setValue(catalogue.icon);
            this._translate.stream('MODIFY RECORD').subscribe(response => {
                this.headerDialogCatalogue = response;
            });
        } else {
            this.selectedCatalogue = new Catalogue();
            this.formCatalogue.reset();
            this._translate.stream('NEW RECORD').subscribe(response => {
                this.headerDialogCatalogue = response;
            });
        }
        this.displayFormCatalogue = true;
    }

    createCatalogue() {
        this.selectedCatalogue = this.castCatalogue();
        this._spinnerService.show();
        this._ignugService.post('catalogues', {
            'catalogue': this.selectedCatalogue,
            'parent_code': this.selectedCatalogue.parent_code
        }).subscribe(
            response => {
                this.catalogues.unshift(this.selectedCatalogue);
                this._spinnerService.hide();
                this._messageService.add({
                    key: 'tst',
                    severity: 'success',
                    summary: 'Se creó correctamente',
                    detail: this.selectedCatalogue.name,
                    life: 5000
                });
                this.displayFormCatalogue = false;
            }, error => {
                this._spinnerService.hide();
                this._messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Oops! Problemas con el servidor',
                    detail: 'Vuelve a intentar más tarde',
                    life: 5000
                });
            });
    }

    updateCatalogue() {
        this.selectedCatalogue = this.castCatalogue();
        this._spinnerService.show();
        this._ignugService.update('catalogues/' + this.selectedCatalogue.id, {
            'catalogue': this.selectedCatalogue,
            'parent_code': this.selectedCatalogue.parent_code
        }).subscribe(
            response => {
                this._spinnerService.hide();
                this._messageService.add({
                    key: 'tst',
                    severity: 'success',
                    summary: 'Se actualizó correctamente',
                    detail: this.selectedCatalogue.name,
                    life: 5000
                });
                this.displayFormCatalogue = false;
            }, error => {
                this._spinnerService.hide();
                this._messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Oops! Problemas con el servidor',
                    detail: 'Vuelve a intentar más tarde',
                    life: 5000
                });
            });
    }

    deleteCatalogue(catalogue: Catalogue) {
        this._confirmationService.confirm({
            header: 'Delete ' + catalogue.name,
            message: 'Are you sure to delete?',
            acceptButtonStyleClass: 'ui-button-danger',
            rejectButtonStyleClass: 'ui-button-secondary',
            acceptLabel: 'Si',
            rejectLabel: 'No',
            icon: 'pi pi-trash',
            accept: () => {
                this._spinnerService.show();
                this._ignugService.delete('catalogues/' + catalogue.id).subscribe(
                    response => {
                        const indiceUser = this.catalogues
                            .findIndex(element => element.id === catalogue.id);
                        this.catalogues.splice(indiceUser, 1);
                        this._spinnerService.hide();
                        this._messageService.add({
                            key: 'tst',
                            severity: 'success',
                            summary: 'Se eliminó correctamente',
                            detail: catalogue.name,
                            life: 5000
                        });
                    }, error => {
                        this._spinnerService.hide();
                        this._messageService.add({
                            key: 'tst',
                            severity: 'error',
                            summary: 'Oops! Problemas con el servidor',
                            detail: 'Vuelve a intentar más tarde',
                            life: 5000
                        });
                    });
            }
        });

    }

    castCatalogue(): Catalogue {
        return {
            id: this.formCatalogue.controls['id'].value,
            code: this.formCatalogue.controls['code'].value,
            name: this.formCatalogue.controls['name'].value,
            type: this.formCatalogue.controls['type'].value,
            icon: this.formCatalogue.controls['icon'].value,
            parent_code: {id: this.formCatalogue.controls['parent_code_id'].value},
        } as Catalogue;
    }
}
