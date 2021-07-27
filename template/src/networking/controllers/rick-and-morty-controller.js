import { ApiService } from '../api-service';
import { API_ROUTES } from '../api-routes';
import { CharacterSerializer } from '../serializers/character-serializer';
import { Character } from '../../models/character';

class RickAndMortyController {
  static async getCharacters() {
    const response = await ApiService.get(API_ROUTES.CHARACTERS);
    const deserialized = response.data.results
      .map((result) => CharacterSerializer.deSerialize(result));

    return deserialized.map((character) => new Character(character));
  }

  /* This action (POST) does not actually exists but we are mocking it for the sake of making
  * a POST example */
  static async createCharacter(character) {
    return ApiService.post(API_ROUTES.CHARACTERS, character);
  }
}

export { RickAndMortyController };
