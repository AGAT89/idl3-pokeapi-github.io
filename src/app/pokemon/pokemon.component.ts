import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  name: string = '';
  pokeName: string = '';
  tipo: string = '';
  nivel: string = '';
  urlImage: string = '';

  constructor(private pokemonService : PokemonService) { }

  ngOnInit(): void {
  }

  search(){
    this.pokemonService.getPokemon(this.name).subscribe((data:any) => {
      // Asignar el nombre del Pokémon
      this.pokeName = data.name;

      // Manejar el tipo del Pokémon
      this.tipo = ''; 
      
      if (data.types && data.types.length > 0) {
        // Buscar el primer tipo disponible
        const tipoEncontrado = data.types.find((tipo: { 
          type: { name: any; }; 
        }) => tipo.type && tipo.type.name);
      
        if (tipoEncontrado) {
          this.tipo = tipoEncontrado.type.name;
        }
      }

      // Asignar el nivel del Pokémon (usando base_experience como ejemplo)
      this.nivel = data.base_experience;

      // Asignar la URL de la imagen del Pokémon
      this.urlImage = data.sprites.other.dream_world.front_default;

      // Imprimir los datos en la consola para verificar
      console.log(data);  
    });
  }
}
