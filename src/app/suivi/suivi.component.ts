import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  styleUrls: ['./suivi.component.css']
})
export class SuiviComponent implements OnInit {
  dateSysteme: Date = new Date();

  ngOnInit(): void {
    this.dateSysteme = new Date();
  }
  constructor() { }

}
