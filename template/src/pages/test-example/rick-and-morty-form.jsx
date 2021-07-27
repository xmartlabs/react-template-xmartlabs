import React, { useState } from 'react';
import { bool, object, string } from 'prop-types';
import styles from './rick-and-morty-form.module.scss';
import { RickAndMortyController } from '../../networking/controllers/rick-and-morty-controller';
import { Serialize } from '../../helpers/form-helper';

/* Just for convenience I'll create this common component here */
const Input = ({
  name, id, label, error, required,
}) => (
  <>
    <label htmlFor={id}>
      {label}
      <input
        className={error ? styles.invalid : ''}
        type="text"
        id={id}
        name={name}
        required={required}
      />
      {error && <div className={styles.errorMsg}>{error}</div>}
    </label>
  </>
);

Input.propTypes = {
  name: string.isRequired,
  label: string.isRequired,
  id: string.isRequired,
  error: string,
  required: bool,
};

Input.defaultProps = {
  required: true,
  error: null,
};

const messageBoxClass = (code) => {
  const classes = [styles.messageBox];
  if (code === 'SUCCESS') {
    classes.push(styles.success);
  } else {
    classes.push(styles.error);
  }
  return classes.join(' ');
};

const initialState = {
  code: 'READY',
  errorMsg: '',
  character: {},
};

function RickAndMortyForm() {
  const [errors, setErrors] = useState({});
  const [state, setState] = useState(initialState);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (event.target.checkValidity()) {
      const character = Serialize(event, false);
      try {
        await RickAndMortyController.createCharacter(character);
        setState({ ...state, code: 'SUCCESS', character });
      } catch (err) {
        setState({ errorMsg: err.message, code: 'ERROR' });
      }
    } else {
      const { elements } = event.target;
      const formErrors = {};
      [...elements].forEach((element) => {
        if (element.validationMessage) {
          formErrors[element.name] = element.validationMessage;
        }
      });
      setErrors(formErrors);
    }
  };

  return (
    <>
      <h1 className={styles.title}>Wubba lubba dub dub form!</h1>

      <div className={styles.container}>
        <form onSubmit={onSubmit} noValidate>
          <Input name="name" id="name" error={errors.name} label="Name" />
          <Input name="gender" id="gender" error={errors.gender} label="Gender" />
          <Input name="species" id="species" error={errors.species} label="Species" />
          <Input name="status" id="status" error={errors.status} label="Status" />
          <Input name="type" id="type" error={errors.type} label="Type" required={false} />

          <div className={styles.buttonContainer}>
            <button type="submit">
              Create character
            </button>
          </div>

          {['SUCCESS', 'ERROR'].includes(state.code)
          && (
          <div data-testid="testBox" className={messageBoxClass(state.code)}>
            {state.code === 'SUCCESS'
            && <>{`Hooray! Your character (${state.character.name}) was "created" successfully!`}</>}
            {state.code === 'ERROR'
            && <>Oh no! There was a problem while creating your character, try again later!</>}
          </div>
          )}

        </form>

      </div>

    </>
  );
}

export { RickAndMortyForm };
