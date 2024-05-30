import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PokemonsListComponent } from './components/pokemons-list/pokemons-list.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonFavoriteComponent } from './components/pokemon-favorite/pokemon-favorite.component';

const routes: Routes = [
  {
    path: '',
    component: PokemonsListComponent
  },
  {
    path: 'pokemon-detail/:id',
    component: PokemonDetailComponent
  },
  {
    path: 'pokemon-favorite',
    component: PokemonFavoriteComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
