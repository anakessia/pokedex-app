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
export class PokemonsListComponent  implements OnInit {
  pokemonsList: any[] = [];
  Pokemons: any[] = [];
  itemsPerPage: number = 151;

  constructor(
    private pokemonService: PokemonService,
    private favoriteService: FavoritesService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons() {
    this.pokemonService.getPokemon(this.itemsPerPage, 0).subscribe((data) => {
      this.pokemonsList = data.results;
      this.Pokemons = this.pokemonsList;
      this.loadPokemonDetails();
    });
  }

  loadPokemonDetails() {
    this.pokemonsList.forEach((pokemon, index) => {
      const id = index + 1;
      this.pokemonService.getPokemonDetail(id).subscribe((details) => {
        pokemon.details = details;
        pokemon.isFavorite = this.favoriteService.isFavorite(id);
      });
    });
  }

  filterPokemons(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.Pokemons = this.pokemonsList.filter((pokemon) =>
      pokemon.details?.name.toLowerCase().includes(searchTerm)
    );
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
    return this.favoriteService.isFavorite(id);
  }

  private removeFavorites(id: number): void {
    this.favoriteService.removeFavorites(id);
    this.toastr.success('Pokemon removed from Favorites.', 'Success', {
      timeOut: 3000,
      positionClass: 'toast-top-right',
    });
  }

  private addFavorites(id: number): void {
    this.favoriteService.addFavorites(id);
    this.toastr.success('Pokemon added to Favorites!', 'Success', {
      timeOut: 3000,
      positionClass: 'toast-top-right',
    });
  }

  formatPokemonId(id: number): string {
    if (id != null) {
      return '#' + id.toString().padStart(3, '0');
    }
    return '';
  }

  goToFavoritesPage() {
    return this.router.navigate(['/pokemon-favorite']);
  }

  goToDetails(pokemonId: number) {
    this.router.navigate(['/pokemon-details', pokemonId]);
  }

  getImage(pokemon: any) {
    return pokemon.details?.sprites?.versions['generation-v']['black-white']?.animated?.front_default
      ? pokemon.details?.sprites?.versions['generation-v']['black-white']?.animated?.front_default
      : pokemon.details?.sprites?.front_default;
  }
}