import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent  implements OnInit {
  pokemonId: number = 0;
  pokemonDetail: any;
  pokemonTypeClass: string = '';
  pokemonImage: string = '';

  statNames: string[] = ['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'];
  barClasses: string[] = ['hp-bar', 'atk-bar', 'def-bar', 'spa-bar', 'spd-bar', 'spe-bar'];
  maxStats: number[] = [255, 190, 230, 194, 230, 180];

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pokemonId = +params['id'];
      this.loadpokemonDetail();
    });
  }

  loadpokemonDetail() {
    this.pokemonService.getPokemonDetail(this.pokemonId).subscribe(detail => {
      this.pokemonDetail = detail;
      this.setpokemonTypeClass();
      this.getImage();
    });
  }

  setpokemonTypeClass() {
    this.pokemonTypeClass = this.pokemonDetail?.types[0]?.type?.name || 'type-default';
  }

  getImage() {
    if (this.pokemonDetail?.sprites?.versions['generation-v']['black-white']?.animated?.front_default) {
      return this.pokemonDetail?.sprites?.versions['generation-v']['black-white']?.animated?.front_default;
    } else {
      return this.pokemonDetail?.sprites?.front_default;
    }
  }
  
  backToMain() {
    this.router.navigate(['/']);
  }

}
