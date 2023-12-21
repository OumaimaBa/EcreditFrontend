import { Component, OnInit } from '@angular/core';
import { PjDemandes } from '../models/PjDemandes';
import { PjDemandesService } from 'src/services/pj-demandes.service';

@Component({
  selector: 'app-pieces-j',
  templateUrl: './pieces-j.component.html',
  styleUrls: ['./pieces-j.component.css']
})
export class PiecesJComponent implements OnInit {

  piecesJsDemandes: PjDemandes[] = [];
  value: boolean = false;

  constructor(private piecesJsDemandesService: PjDemandesService) {}

  ngOnInit(): void {
    this.loadPiecesJsDemandes(1); 
  }

  loadPiecesJsDemandes(typeC: number): void {
    this.piecesJsDemandesService
      .getAllPiecesJsDemandes(typeC)
      .subscribe((data) => (this.piecesJsDemandes = data));
  }

  convertToBoolean(value: number): boolean {
    return value === 1;
  }
}
