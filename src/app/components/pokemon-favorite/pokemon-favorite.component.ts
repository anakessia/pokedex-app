import { Component, OnInit } from '@angular/core';
import { forkJoin, Subscription, of } from 'rxjs';
import { switchMap } from 'rxjs/operators'; 
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FavoritesService } from 'src/app/services/favorites.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-favorite',
  templateUrl: './pokemon-favorite.component.html',
  styleUrls: ['./pokemon-favorite.component.scss'],
})
export class PokemonFavoriteComponent  implements OnInit {

  favoritePokemons: any[] = [];
  noFavorite: boolean = true;
  hasNextPage: boolean = false;
  pageItems: number = 10;
  currentPage: number = 1;
  resizeObserver: ResizeObserver | undefined;
  private favoritesChangedSubscription: Subscription | undefined;

  constructor(
    private favoritesService: FavoritesService,
    private pokemonService: PokemonService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.favoritesChangedSubscription = this.favoritesService.favorites$.subscribe(() => {
      this.getFavoritePokemons();
    });
    this.getFavoritePokemons();
    this.setupResizeObserver();
  }

  ngOnDestroy() {
    if (this.favoritesChangedSubscription) {
      this.favoritesChangedSubscription.unsubscribe();
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  setupResizeObserver() {
    this.resizeObserver = new ResizeObserver(() => this.adjustPageItems());
    this.resizeObserver.observe(document.body);
  }

  adjustPageItems() {
    const height = window.innerHeight;
    const width = window.innerWidth;

    if (width > 768) {
      this.pageItems = 4;
    } else {
      this.pageItems = height > 768 ? 10 : 6;
    }

    this.getFavoritePokemons();
  }

  getFavoritePokemons() {
    const favoriteIds = this.favoritesService.getFavorites();

    if (favoriteIds.length === 0) {
      this.noFavorite = true;
      this.favoritePokemons = [];
      return;
    }

    const startIndex = (this.currentPage - 1) * this.pageItems;
    const endIndex = startIndex + this.pageItems;

    of(favoriteIds)
      .pipe(
        switchMap(ids =>
          forkJoin(
            ids
              .slice(startIndex, endIndex)
              .map(id => this.pokemonService.getPokemonDetail(id)) 
          )
        )
      )
      .subscribe(
        (pokemonDetail: any[]) => {
          this.favoritePokemons = pokemonDetail.map(detail => ({
            id: detail.id,
            name: detail.name || 'Unknown',
            details: detail,
            isFavorite: this.favoritesService.isFavorite(detail.id)
          }));
          this.hasNextPage = favoriteIds.length > endIndex;
          this.noFavorite = this.favoritePokemons.length === 0;
        },
        (error: any) => {
          console.error('Error in search:', error);
        }
      );
  }

  getPokemonType(pokemon: any): string {
    return pokemon.details?.types[0]?.type?.name.toLowerCase() || 'default';
  }

  toggleFavorite(pokemon: any) {
    const id = pokemon.details?.id;

    if (!id) {
      this.toastr.error('Error processing request.', 'Erro', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
      return;
    }

    if (this.isFavorite(id)) {
      this.removeFavorites(id);
    } else {
      this.addFavorites(id);
    }

    this.getFavoritePokemons();
  }

  private isFavorite(id: number): boolean {
    return this.favoritesService.isFavorite(id);
  }

  private removeFavorites(id: number): void {
    this.favoritesService.removeFavorites(id);
    this.toastr.success('Pokemon removed from Favorites.', 'Sucesso', {
      timeOut: 3000,
      positionClass: 'toast-top-right',
    });
  }

  private addFavorites(id: number): void {
    this.favoritesService.addFavorites(id);
    this.toastr.success('Pokemon added to Favorites!', 'Sucesso', {
      timeOut: 3000,
      positionClass: 'toast-top-right',
    });
  }

  goToPokemonDetails(pokemonId: number) {
    this.router.navigate(['/pokemon-detail', pokemonId]); 
  }

  getImage(pokemon: any) {
    return pokemon.details?.sprites?.versions['generation-v']['black-white']?.animated?.front_default
      ? pokemon.details?.sprites?.versions['generation-v']['black-white']?.animated?.front_default
      : pokemon.details?.sprites?.front_default;
  }

  nextPage() {
    this.currentPage++;
    this.getFavoritePokemons();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getFavoritePokemons();
    }
  }

  backToMain() {
    this.router.navigate(['/']);
  }
}


