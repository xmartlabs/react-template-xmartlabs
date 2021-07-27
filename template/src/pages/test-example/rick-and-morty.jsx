import React, { useEffect, useState } from 'react';
import { RickAndMortyController } from '../../networking/controllers/rick-and-morty-controller';
import styles from './rick-and-morty.module.scss';

const initialError = {
  code: 200,
  message: '',
};

function RickAndMorty() {
  const [state, setState] = useState('FETCHING');
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(initialError);

  const fetchCharacters = async () => {
    try {
      const fetchedCharacters = await RickAndMortyController.getCharacters();
      setCharacters(fetchedCharacters);
      setState('READY');
    } catch (err) {
      if (err.code === 404) {
        setState('NOT_FOUND');
      } else {
        setState('ERROR');
        setError({ message: err.message, code: err.code });
      }
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const handleErrorClass = () => {
    const classes = [styles.messageContainer];

    if (state === 'ERROR') {
      classes.push(styles.errorBorder);
    } else {
      classes.push(styles.warningBorder);
    }
    return classes.join(' ');
  };

  if (state === 'FETCHING') {
    return (
      <div className={styles.centered}>
        <div role="progressbar" aria-hidden="false" aria-label="Loading" className={styles.loader} />
      </div>
    );
  }

  return (
    <>
      <h1 className={styles.title}>Wubba lubba dub dub test!</h1>
      <div className={styles.container}>

        {['ERROR', 'NOT_FOUND'].includes(state) && (
        <div className={handleErrorClass()}>
          <p>Oops! We got the following problem when getting the results:</p>
          {state === 'ERROR' && <p className={styles.error}>{error.message}</p>}
          {state === 'NOT_FOUND' && (
          <p className={styles.warning}>
            Oh no! We could not find any Rick and Morty characters!
          </p>
          )}
        </div>
        )}

        {characters.length > 0 && characters.map((character) => (
          <div className={styles.characterContainer} key={character.id}>
            <img className={styles.img} src={character.image} alt={character.name} />
            <div>
              <p>{character.name}</p>
              <p>
                <span className={character.status === 'Alive' ? styles.alive : styles.dead}>
                  {character.status}
                </span>
                {' '}
                -
                {' '}
                {character.species}
              </p>
              <p>{character.gender}</p>
              {character.type && <p>{character.type}</p>}
            </div>
          </div>
        ))}

      </div>
    </>
  );
}

export { RickAndMorty };
