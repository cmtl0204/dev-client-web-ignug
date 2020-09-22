import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { JobBoardService } from '../../../../services/job-board/job-board.service';
import { Offer } from '../../../../models/job-board/models.index';
import { User } from '../../../../models/authentication/models.index';
import { SelectItem } from 'primeng/api';
import {TreeNode} from 'primeng/api';
import {AccordionModule} from 'primeng/accordion';
import {ButtonModule} from 'primeng/button';
import {InputTextareaModule} from 'primeng/inputtextarea';
@Component({
  selector: 'app-offers',
  templateUrl: './app.offers.component.html',
  styleUrls: ['./app.offers.component.scss']
})
export class AppOffersComponent implements OnInit {
  userLogged: User;
  items: MenuItem[] = [];
  selectedOffer: Offer;
  offers: Offer[];
  totalCompanies: number;
  totalProffesionals: number;
  totalOffers: number;
  validateOffer: boolean;

  displayDialog: boolean;

  sortOptions: SelectItem[];

  sortKey: string;

  sortField: string;

  sortOrder: number;
  criterioBusqueda: string;
  buscar:boolean;
  categories: TreeNode[] = [];
  categorySelected: TreeNode | any;
  constructor(private jobBoardService: JobBoardService, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.validateOffer = false;
    this.getOffers();
    this.getCatalogue();
    this.getTotal();
    this.sortOptions = [
      { label: 'Uno', value: '!uno' },
      { label: 'Dos', value: 'dos' },
      { label: 'Tres', value: 'tres' }
    ];

    if (sessionStorage.getItem('user_logged')) {
      this.userLogged = JSON.parse(sessionStorage.getItem('user_logged')) as User;
    } else {
      this.userLogged = new User();
    }
  }

  nodeSelect(event) {
    this.messageService.add({severity: 'info', summary: 'Node Selected', detail: event.node.label});
}

nodeUnselect(event) {
    this.messageService.add({severity: 'info', summary: 'Node Unselected', detail: event.node.label});
}

  getOffers(): void {

    this.categorySelected='';
    this.criterioBusqueda='';
    this.jobBoardService.get('offers/all').subscribe(
      res => {
        this.offers = res['offers'];

      },
      error => {
        console.error(error);


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
    this.validateAppliedOffer();
    event.preventDefault();
  }
  onSortChange(event) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
  onDialogHide() {
    this.selectedOffer = null;
  }

  getCatalogue(): void {
    this.jobBoardService.get('categories').subscribe(
      response => {

        response['data']['categories'].forEach(category => {
          const categoryChildren = [];
          category['children'].forEach(child => {
            categoryChildren.push({label: child.name, data: category.id});
          });
          this.categories.push({label: category.name, data: category.id, children: categoryChildren});
        });

      },
      error => console.error(error)
    );
  }

  filterOffers(): void {
    let selectedChildren = 1;
    if (this.categorySelected) {
      selectedChildren = this.categorySelected.data;
    }
    console.log(this.categorySelected);
    console.log(selectedChildren);

    const filter = { 'filters':
      {
        'conditions':
        [['position', 'ilike', `%${this.categorySelected.label}%`]],
        'conditionsCategoryFather':
        selectedChildren,
        'conditionsCategoryChildren':
        selectedChildren,
        'conditionsCity':
        [['city_id', '=', ``]],
        'conditionsProvince':
        [['province_id', '=', ``]],
      }
    };
    this.jobBoardService.post(`offers/filter?limit=${20}&page=${1}&field=start_date&order=DESC`, filter)
      .subscribe(
        (res) => {
          this.offers = res['offers']['data'];
        },
        err => console.log(err)
      );
  }


  validateAppliedOffer() {
    this.jobBoardService.validateAppliedOffer(this.userLogged.id ?? 3, this.selectedOffer.id)
    .subscribe(response => {
      if (response) {
        this.validateOffer = true;
      } else {
        this.validateOffer = false;
      }
    });
  }

  applyOffer(): void {
    const userId = this.userLogged.id ?? 3;
    this.jobBoardService.post( 'offers/opportunities/apply',
        {'user': {'id': userId}, 'offer': {'id': this.selectedOffer.id}})
      .subscribe(
        response => {
          console.log(response);
          if (response === true) {
            this.messageService.add({severity: 'success', summary: 'Postulado Exitoso.', detail: 'Su postulación fue enviada con éxito.'});
            this.validateAppliedOffer()
          }
          if (response === false) {
            this.messageService.add({severity: 'warn', summary: 'Advertencia.', detail: 'Ya ha postulado a esta oferta.'});
            this.validateAppliedOffer()
          }
        },
        error => {
          console.log('ocurrio error al aplicar oferta');
          console.log(error);
          if (error.status === 401) {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Ocurrió un problema!'});
          }

          if (error.status === 500) {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Ocurrió un problema!'});
          }
        });
  }
}
