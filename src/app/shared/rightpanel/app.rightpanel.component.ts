import {Component, Inject, forwardRef} from '@angular/core';
import {AppMainComponent} from '../../layouts/full/app.main.component';

@Component({
    selector: 'app-rightpanel',
    template: `
        <div class="layout-rightpanel" (click)="app.onRightPanelClick($event)">
			<div class="right-panel-header">
				<div class="title">
					<span>Today</span>
					<h1>Wednesday, 26 Jun</h1>
				</div>
				<a href="#" class="rightpanel-exit-button" (click)="app.onRightPanelClose($event)">
					<i class="pi pi-times"></i>
				</a>
			</div>
			<div class="right-panel-content">
				<div class="right-panel-content-row">
					<div class="tasks">
						<div class="tasks-header">
							<div class="title">
								<h1>Tasks</h1>
							</div>
							<div class="tasks-info">
								<span>You have</span><span class="highlighted"> 2 tasks</span><span> today</span>
							</div>
						</div>
						<ul class="tasks-list">
							<li class="tasks-list-item">
								<div class="checkbox">
									<p-checkbox binary="true"></p-checkbox>
									<p>Sales Report</p>
								</div>
								<div class="tasks-day">
									<span class="time">Today</span>
								</div>
							</li>

							<li class="tasks-list-item">
								<div class="checkbox">
									<p-checkbox binary="true"></p-checkbox>
									<p>Pay Invoices</p>
								</div>
								<div class="tasks-day">
									<span class="time">Today</span>
								</div>
							</li>

							<li class="tasks-list-item">
								<div class="checkbox">
									<p-checkbox binary="true"></p-checkbox>
									<p>Customer Meeting</p>
								</div>
								<div class="tasks-day">
									<span class="time later">Later</span>
								</div>
							</li>

							<li class="tasks-list-item">
								<div class="checkbox">
									<p-checkbox binary="true"></p-checkbox>
									<p>Expense Reports</p>
								</div>
								<div class="tasks-day">
									<span class="time later">Later</span>
								</div>
							</li>
							<li class="tasks-list-item">
								<div class="checkbox">
									<p-checkbox binary="true"></p-checkbox>
									<p>Plane Tickets</p>
								</div>
								<div class="tasks-day">
									<span class="time later">Later</span>
								</div>
							</li>
							<li class="tasks-list-item">
								<div class="checkbox">
									<p-checkbox binary="true"></p-checkbox>
									<p>Dinner with Tony</p>
								</div>
								<div class="tasks-day">
									<span class="time later">Later</span>
								</div>
							</li>
						</ul>
                    </div>
                </div>
				<div class="right-panel-content-row">
					<div class="calendar">
						<h1>Calendar</h1>
						<p-calendar [inline]="true"></p-calendar>
					</div>
				</div>
				<div class="right-panel-content-row">
					<div class="weather">
						<h1>Weather</h1>
						<ul class="weather-list">
							<li class="weather-list-item">
								<div class="time-location">
									<span>15.03</span>
									<p>Lille</p>
								</div>
								<div class="weather-info">
									<div class="weather-icon icon-1">
										<img src="assets/layout/images/rightpanel/weather-icon-1.svg" alt="mirage-layout" />
									</div>
									<div class="weather-value">
										31°
									</div>
								</div>
							</li>
							<li class="weather-list-item">
								<div class="time-location">
									<span>15.03</span>
									<p>Barcelona</p>
								</div>
								<div class="weather-info">
									<div class="weather-icon icon-2">
										<img src="assets/layout/images/rightpanel/weather-icon-3.svg" alt="mirage-layout" />
									</div>
									<div class="weather-value">
										26°
									</div>
								</div>
							</li>
							<li class="weather-list-item">
								<div class="time-location">
									<span>09.03</span>
									<p>New York</p>
								</div>
								<div class="weather-info">
									<div class="weather-icon icon-1">
										<img src="assets/layout/images/rightpanel/weathericon-4.svg" alt="mirage-layout" />
									</div>
									<div class="weather-value">
										23°
									</div>
								</div>
							</li>
							<li class="weather-list-item">
								<div class="time-location">
									<span>15.03</span>
									<p>Amsterdam</p>
								</div>
								<div class="weather-info">
									<div class="weather-icon icon-3">
										<img src="assets/layout/images/rightpanel/weather-icon-4.svg" alt="mirage-layout" />
									</div>
									<div class="weather-value">
										31°
									</div>
								</div>
							</li>
							<li class="weather-list-item">
								<div class="time-location">
									<span>09.03</span>
									<p>Antalya</p>
								</div>
								<div class="weather-info">
									<div class="weather-icon icon-4">
										<img src="assets/layout/images/rightpanel/weather-icon-4.svg" alt="mirage-layout" />
									</div>
									<div class="weather-value">
										33°
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
            </div>
        </div>
    `
})
export class AppRightPanelComponent {
    constructor(public app: AppMainComponent) {}
}
