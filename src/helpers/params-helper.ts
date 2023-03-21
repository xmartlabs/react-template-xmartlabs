// Collection of helpers to manipulate query params.

type ParamObject = {
  [key: string]: string | number | boolean | null,
};

class ParamsHelper {
  static parseQueryParams(queryParams: string = '') {
    const params: ParamObject = {};
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
  static updateQueryParams(newParams: ParamObject, currentQueryParams: string = '') {
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
      const encodedValue = value === null ? 'null' : window.encodeURIComponent(value);

      const valueString = `${encodedKey}=${encodedValue}`;
      return `${acc}${index > 0 ? '&' : ''}${valueString}`;
    }, '?');
  }

  static createQueryParams(newParams: ParamObject) {
    return this.updateQueryParams(newParams);
  }
}

export { ParamsHelper };
