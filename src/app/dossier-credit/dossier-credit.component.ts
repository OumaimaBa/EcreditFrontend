import { Component, OnInit } from '@angular/core';
import {TypeC} from '../models/TypeC';
import {TypeCService} from '../../services/dossier-credit.service';


@Component({
  selector: 'app-dossier-credit',
  templateUrl: './dossier-credit.component.html',
  styleUrls: ['./dossier-credit.component.css']
})
export class DossierCreditComponent implements OnInit {

  typesC: TypeC[] = [];
  unites: string[] = ['mensuelle','trimesterielle','annuelle'];

  constructor(private tcService: TypeCService) { }

  ngOnInit(): void {
    this.tcService.getAllTypesC().subscribe(data => {
      this.typesC = data;
    });
  }

}
