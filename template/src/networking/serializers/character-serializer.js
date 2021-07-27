class CharacterSerializer {
  static deSerialize(data) {
    return {
      id: data.id,
      name: data.name,
      status: data.status,
      species: data.species,
      gender: data.gender,
      image: data.image,
      type: data.type,
    };
  }
}

export { CharacterSerializer };
