/**
 * Utility function to concat classNames.
 *
 * Usage: classnames('css_class1', 'css_class1')
 *
 * Can be used with objects where the keys are css classes and the
 * values are booleans that decide if classes are active or not:
 *
 * Example: classnames('input', { 'input-error': has_errors })
 *
 * @param  {...any} args
 * @returns string
 */

type ClassnameObject = Record<string, string | boolean | number>;

type Classname = ClassnameObject | string | undefined;

function classnames(...args: Classname[]): string {
  const filteredArgs = args.filter(Boolean);
  if (filteredArgs.length === 1) {
    const [firstEntry] = filteredArgs;
    if (firstEntry && typeof firstEntry === "object") {
      /* firstEntry's keys whose value is truthy */
      const activeClasses = Object.entries(firstEntry)
        .filter(([, value]) => value)
        .map(([key]) => key);
      return activeClasses.join(" ");
    }
    return firstEntry ?? "";
  }
  return filteredArgs.map((value) => classnames(value)).join(" ");
}

export { classnames };
