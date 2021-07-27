export function Serialize(form, checkBoxAsArray) {
  const { target } = form;
  const invalidTypes = ['file', 'reset', 'submit', 'button'];
  // Setup our serialized data
  const serialized = {};

  // Loop through each field in the form
  [...target.elements].forEach((field) => {
    /* Don't serialize fields without a name, submits, buttons,
     file and reset inputs, and disabled fields */
    if (!field.name || field.disabled || invalidTypes.indexOf(field.type) > -1) {
      return;
    }

    // If a multi-select, get all selections
    if (field.type === 'select-multiple') {
      field.options.forEach((option) => {
        if (option.selected) {
          serialized[field.name] = option.value;
        }
      });
    } else if ((field.type !== 'checkbox' && field.type !== 'radio' && field.value) || field.checked) {
      // If checking many options under the same 'section',
      // add them as an array by using the same name
      if (checkBoxAsArray && field.type === 'checkbox') {
        if (!serialized[field.name]) {
          serialized[field.name] = [field.value];
        } else {
          serialized[field.name].push(field.value);
        }
      } else {
        serialized[field.name] = field.value;
      }
    }
  });

  return serialized;
}
