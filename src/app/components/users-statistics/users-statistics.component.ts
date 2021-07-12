import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { UserDetailsService } from '../../services/user-details.service';
import { BehaviorSubject } from 'rxjs';
import { ISubscriptionHelper } from '../../models/ISubscriptionHelper';

@Component({
  selector: 'app-users-statistics',
  templateUrl: './users-statistics.component.html',
  styleUrls: ['./users-statistics.component.css']
})
export class UsersStatisticsComponent implements OnInit {

  private genderCount$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  private categoriesCount$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  private rolesCount$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  public madesCount$: BehaviorSubject<ISubscriptionHelper[]> = new BehaviorSubject<ISubscriptionHelper[]>([]);

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom'
    }
  };



  // Labels(campuri)

  public pieChartLabelsGenders: Label[] = [['Masculin'], ['Feminin']];
  public pieChartLabelsDocuments: Label[] = [['ITP'], ['RCA'], ['Carte de identitate'],['Rovinietă'], ['Rata la bancă'], ['Impozit']];
  public pieChartLabelsRoles: Label[] = [['Administrator'], ['Supervisor'], ['Moderator'],['Helper'], ['Membru']];
  public pieChartLabelsMades: Label[] = [];
  public tempLabelsMades: string[] = [];

  // Data

  public pieChartDataGender: number[] = [1,2];
  public pieChartDataDocuments: number[] = [2,3];
  public pieChartDataRoles: number[] = [3,4];
  public pieChartDataMades: number[] = [0];
  public tempDataMades: number[] = [];




  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public chartColors: Array < any > = [{
    backgroundColor: ['#fc5858', '#19d863', '#fdf57d', '#33ccff', '#3287a8', '#a832a2', '#94a832', '#7d100e', '#00ffd0'],
    borderColor: ['rgba(252, 235, 89, 0.2)', 'rgba(77, 152, 202, 0.2)', 'rgba(241, 107, 119, 0.2)']
  }];

  constructor(private detailsService: UserDetailsService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();


  }

    ngOnInit(): void {


  // Data

      this.pieChartDataMades = this.tempDataMades;
      this.pieChartLabelsMades = this.tempLabelsMades;
      this.getGenders();
      this.getCategories();
      this.getRoles();
      this.getMadesObservable();
    }

  public getGenders() {
    this.detailsService.getGenders().subscribe(data => this.genderCount$.next(data));    
    this.genderCount$.asObservable().subscribe(data => {
      this.pieChartDataGender = [data[0], data[1]];        
    });
  }

  public getCategories() {
    this.detailsService.getCategories().subscribe(data => this.categoriesCount$.next(data));    
    this.categoriesCount$.asObservable().subscribe(data => {
      this.pieChartDataDocuments = [data[0], data[1], data[2], data[3], data[4], data[5]];        
    });
  }

  public getRoles() {
    this.detailsService.getRoles().subscribe(data => this.rolesCount$.next(data));
    this.rolesCount$.asObservable().subscribe(data => {
      this.pieChartDataRoles = [data[0], data[1], data[2], data[3], data[4]];
    });
  }  

  public getMades() {
    this.detailsService.getAllMades().subscribe(data => this.madesCount$.next(data));

  }

  public getMadesObservable() {
    
    this.getMades();
    
    this.madesCount$.asObservable().subscribe(data => {

      for(let i = 0; i < data.length; i++) {
        this.pieChartDataMades.push(data[i].countmade);
        this.pieChartLabelsMades.push(data[i].made);
  
      }
    });



  }
}
