const classNames = (classes) => {
  let ret = [];

  if (Array.isArray(classes)) {
    ret = classes.map(classNames);
  } else if (typeof classes === 'object') {
    Object.entries(classes).forEach(([key, value]) => {
      if (value) {
        ret.push(key);
      }
    });
  } else {
    return classes;
  }

  return ret.join(' ');
};
