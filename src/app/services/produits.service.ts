import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produit } from '../model/produit';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  // Url du service web de gestion de produits
  // commune pour toutes les méthodes
  urlHote = "http://localhost:9999/produits/";

  constructor(private http: HttpClient) { }

  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.urlHote);
  }

  deleteProduit(idP: number | undefined): Observable<void> {
    return this.http.delete<void>(this.urlHote + idP);
  }

  addProduit(nouveau: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.urlHote, nouveau);
  }

  updateProduit(idP: number | undefined, nouveau: Produit): Observable<Produit> {
    return this.http.put<Produit>(this.urlHote + idP, nouveau);
  }
}
