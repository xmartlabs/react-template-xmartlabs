/**
 * Utility function to concat classNames.
 * 
 * Usage: classnames('css_class1', 'css_class1')
 * 
 * Can be used with objects where the keys are css classes and the values are booleans that decide if classes are active or not:
 * 
 * Example: classnames('input', { 'input-error': has_errors })
 * 
 * @param  {...any} args 
 * @returns string
 */
function classnames(...args) {
  if (args.length === 1) {
    const [firstEntry] = args;
    if (typeof firstEntry === 'object') {
      /* firstEntry's keys whose value is truethy */
      const activeClasses = Object.entries(firstEntry).filter(([_key, value]) => value).map(([key,]) => key);
      return activeClasses.join(' ');
    } else {
      return firstEntry;
    }
  }
  return args.filter((entry) => !!entry).map((value) => classnames(value)).join(' ');
}


export { classnames };
