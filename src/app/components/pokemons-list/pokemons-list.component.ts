import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PokemonService } from 'src/app/services/pokemon.service';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss'],
})
export class PokemonsListComponent implements OnInit {
  pokemonsList: any[] = [];
  Pokemons: any[] = [];
  itemsPerPage: number = 151;

  constructor(
    private pokemonService: PokemonService,
    private favoritesService: FavoritesService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons() {
    this.pokemonService.getPokemon(this.itemsPerPage, 0).subscribe((data: any) => {
      this.pokemonsList = data.results.map((pokemon: any, index: number) => ({
        ...pokemon,
        details: null,
        isFavorite: false,
        id: index + 1 
      }));
      this.Pokemons = [...this.pokemonsList]; 
      this.loadPokemonDetails();
    });
  }

  loadPokemonDetails() {
    this.pokemonsList.forEach((pokemon: any) => {
      this.pokemonService.getPokemonDetail(pokemon.id).subscribe((detail: any) => {
        const pokemonIndex = this.Pokemons.findIndex(p => p.name === pokemon.name);
        if (pokemonIndex !== -1) {
          this.Pokemons[pokemonIndex].details = detail;
          this.Pokemons[pokemonIndex].isFavorite = this.favoritesService.isFavorite(pokemon.id);
          console.log(`Loaded details for ${pokemon.name}`, detail); 
        }
      });
    });
  }

  filterPokemons(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.Pokemons = this.pokemonsList.filter((pokemon: any) => {
      if (pokemon.details && pokemon.details.name) {
        return pokemon.details.name.toLowerCase().includes(searchTerm);
      }
      return false;
    });
  }

  toggleFavorite(pokemon: any) {
    const id = pokemon.details?.id;

    if (!id) {
      this.toastr.error('Error processing request.', 'Error', {
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
  }

  private isFavorite(id: number): boolean {
    return this.favoritesService.isFavorite(id);
  }

  private removeFavorites(id: number): void {
    this.favoritesService.removeFavorites(id);
    const removedPokemon = this.Pokemons.find(pokemon => pokemon.details?.id === id);
    if (removedPokemon) {
      removedPokemon.isFavorite = false;
      this.toastr.success('Pokemon removed from Favorites.', 'Success', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }
  }

  private addFavorites(id: number): void {
    this.favoritesService.addFavorites(id);
    const addedPokemon = this.Pokemons.find(pokemon => pokemon.details?.id === id);
    if (addedPokemon) {
      addedPokemon.isFavorite = true;
      this.toastr.success('Pokemon added to Favorites!', 'Success', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }
  }

  formatPokemonId(id: number): string {
    if (id != null) {
      return '#' + id.toString().padStart(3, '0');
    }
    return '';
  }

  goToFavoritesPage() {
    this.router.navigate(['/pokemon-favorite']);
  }

  goToDetails(pokemonId: number) {
    this.router.navigate(['/pokemon-detail', pokemonId]);
  }

  getImage(pokemon: any) {
    return pokemon.details?.sprites?.versions['generation-v']['black-white']?.animated?.front_default
      ? pokemon.details?.sprites?.versions['generation-v']['black-white']?.animated?.front_default
      : pokemon.details?.sprites?.front_default;
  }
}
