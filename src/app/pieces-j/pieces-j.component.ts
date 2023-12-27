import { Component, OnInit } from '@angular/core';
import { PjDemandes } from '../models/PjDemandes';
import { PjDemandesService } from 'src/services/pj-demandes.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PieceJs } from '../models/Demande';

@Component({
  selector: 'app-pieces-j',
  templateUrl: './pieces-j.component.html',
  styleUrls: ['./pieces-j.component.css']
})
export class PiecesJComponent implements OnInit {

  piecesJsDemandes: PjDemandes[] = [];
  selectedFiles: File[] = [];

  constructor(private http: HttpClient, private piecesJsDemandesService: PjDemandesService) {}

  onFileSelected(event: any): void {
    // Note: event.target.files is a FileList
    // Append new files to the existing ones
    this.selectedFiles = [...this.selectedFiles, ...(Array.from(event.target.files) as File[])];
  }

  uploadFiles(): void {
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        const file = this.selectedFiles[i];
        // Provide your idDemande here
        this.onFileUpload(file, 23);
      }
    } else {
      console.warn('No files selected.');
    }
  }

  getSelectedFileNames(): string {
    return this.selectedFiles.map(file => file.name).join(', ');
  }

  onFileUpload(file: File, idDemande: number): void {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('id_demande', idDemande.toString());

    const headers = new HttpHeaders();

    this.http.post<PieceJs>('http://localhost:8089/pj/add', formData, { headers })
      .subscribe({
        next: data => {
          console.log('Réponse de l\'API :', data);
          // Update the displayed files after successful upload
          this.loadPiecesJsDemandes(1);
        },
        error: error => {
          console.error('Erreur lors de l\'envoi du fichier :', error);
        }
      });
  }

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
