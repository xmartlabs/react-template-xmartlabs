// Collection of helpers to manipulate query params.
class ParamsHelper {
  static parseQueryParams(queryParams = '') {
    const params = {};
    const decodedParams = queryParams;
    if (decodedParams.length) {
      decodedParams.slice(1).split('&').forEach((param) => {
        const splitParam = param.split('=').map(window.decodeURIComponent);
        /* eslint-disable-next-line prefer-destructuring */
        params[splitParam[0]] = splitParam[1];
      });
    }
    return params;
  }

  // Receives the current params and a dictionary of params and returns
  // the query param string.
  static updateQueryParams(currentQueryParams = '', newParams) {
    const processedParams = ParamsHelper.parseQueryParams(currentQueryParams);
    const mergedParams = {
      ...processedParams,
      ...newParams,
    };

    const entries = Object.entries(mergedParams);
    if (!entries.length) {
      return '';
    }
    return entries.reduce((acc, [key, value], index) => {
      const encodedKey = window.encodeURIComponent(key);
      const encodedValue = window.encodeURIComponent(value);

      const valueString = `${encodedKey}=${encodedValue}`;
      return `${acc}${index > 0 ? '&' : ''}${valueString}`;
    }, '?');
  }

  static createQueryParams(newParams) {
    return this.updateQueryParams('', newParams);
  }
}

export { ParamsHelper };
