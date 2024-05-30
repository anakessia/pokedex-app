import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favorites: number[] = [];
  private favoritesChangedSubject = new Subject<void>();
  favorites$ = this.favoritesChangedSubject.asObservable();

  constructor() {
    this.loadFavorites();
  }

  addFavorites(pokemonId: number): void {
    if (!this.favorites.includes(pokemonId)) {
      this.favorites.push(pokemonId);
      this.saveFavorites();
      this.favoritesChangedSubject.next();
    }
  }

  removeFavorites(pokemonId: number): void {
    const index = this.favorites.indexOf(pokemonId);
    if (index !== -1) {
      this.favorites.splice(index, 1);
      this.saveFavorites();
      this.favoritesChangedSubject.next();
    }
  }

  isFavorite(pokemonId: number): boolean {
    return this.favorites.includes(pokemonId);
  }

  getFavorites(): number[] {
    return this.favorites;
  }

  private saveFavorites(): void {
    localStorage.setItem('pokemonFavorite', JSON.stringify(this.favorites));
  }

  private loadFavorites(): void {
    const storedFavorites = localStorage.getItem('pokemonFavorite');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }
}
