import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit';
import { NgForm } from '@angular/forms';
import { ProduitsService } from '../services/produits.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  produits: Array<Produit> = [];
  produitCourant: Produit = new Produit();
  afficherFormulaireEdition = false;

  constructor(private produitsService: ProduitsService) {}

  ngOnInit(): void {
    this.consulterProduits();
  }

  private consulterProduits(): void {
    console.log("Récupération de la liste des produits");
    this.produitsService.getProduits()
      .subscribe({
        next: data => {
          console.log("Succès GET");
          this.produits = data;
        },
        error: err => {
          console.log("Erreur GET", err);
        }
      });
  }

 supprimerProduit(produit: Produit): void {
    const reponse: boolean = confirm("Voulez-vous supprimer le produit :" + produit.designation + " ?");
    if (reponse) {
     this.supprimerProduitHttp(produit);
    } else {
      console.log("Suppression annulée...");
    }
  }

  private supprimerProduitHttp(produit: Produit): void {
    this.produitsService.deleteProduit(produit.id)
      .subscribe({
        next: () => {
          console.log("Succès DELETE");
          this.supprimerProduitLocal(produit);
        },
        error: err => {
          console.log("Erreur DELETE", err);
        }
      });
  } 

  private supprimerProduitLocal(produit: Produit): void {
    const index: number = this.produits.indexOf(produit);
    if (index !== -1) {
      this.produits.splice(index, 1);
    }
  }













  //validerFormulaire(form: NgForm): void {
    //console.log(form.value);
    //this.mettreAJourProduit(form.value, this.produitCourant);
    //this.afficherFormulaireEdition = false;
    //form.reset();
  //}

  validerFormulaire(form: NgForm): void {
    console.log(form.value);
    
    // Vérifier si le formulaire est valide
    if (form.form.valid) {
        // Mettre à jour le produit seulement s'il existe dans la liste
        const produitExistant = this.produits.find(p => p.id === this.produitCourant.id);

        if (produitExistant) {
            this.mettreAJourProduit(form.value, produitExistant);
            // Cacher le formulaire après la validation
            this.afficherFormulaireEdition = false;
        }

        form.reset();
    }
}
  


private mettreAJourProduit(nouveau: Produit, ancien: Produit): void {
  this.produitsService.updateProduit(nouveau.id, nouveau)
      .subscribe({
          next: updatedProduit => {
              console.log("Succès PUT");
              this.mettreAJourProduitLocal(ancien, updatedProduit);
          },
          error: err => {
              console.log("Erreur PUT", err);
          }
      });
}



  private mettreAJourProduitLocal(ancien: Produit, updatedProduit: Produit): void {
    const index: number = this.produits.indexOf(ancien);
    if (index !== -1) {
      this.produits[index] = updatedProduit;
    }
  }

  editerProduit(produit: Produit): void {
    this.afficherFormulaireEdition = true;
    this.produitCourant = { ...produit };
  }
}


