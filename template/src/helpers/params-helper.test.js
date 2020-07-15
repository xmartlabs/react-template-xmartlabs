import { ParamsHelper } from './params-helper';

describe('ParamsHelper', () => {
  describe('parseQueryParams', () => {
    describe('with no params', () => {
      it('should return an empty object', () => {
        expect(ParamsHelper.parseQueryParams()).toEqual({});
      });
    });

    describe('with empty string', () => {
      it('should return an empty object', () => {
        expect(ParamsHelper.parseQueryParams('')).toEqual({});
      });
    });

    describe('with only one parameter', () => {
      it('should return an object with one key only', () => {
        expect(ParamsHelper.parseQueryParams('?param1=value1')).toEqual({
          param1: 'value1',
        });
      });

      it('should decode URI components correctly', () => {
        expect(ParamsHelper.parseQueryParams('?param%20with%2Bsymbols=value%20with%2Bsymbols')).toEqual({
          'param with+symbols': 'value with+symbols',
        });
      });
    });

    describe('with more than one parameter', () => {
      it('should return an object with the correct keys', () => {
        expect(ParamsHelper.parseQueryParams('?param1=value1&param2=value2&param3=value3')).toEqual({
          param1: 'value1',
          param2: 'value2',
          param3: 'value3',
        });
      });

      it('should decode URI components correctly', () => {
        const queryString = [
          '?param1%20with%2Bsymbols=value1%20with%2Bsymbols',
          'param2%20with%2Bsymbols=value2%20with%2Bsymbols',
          'param3%20with%2Bsymbols=value3%20with%2Bsymbols',
          'param4%20with%2Bsymbols=value4%20with%2Bsymbols',
        ].join('&');
        expect(ParamsHelper.parseQueryParams(queryString)).toEqual({
          'param1 with+symbols': 'value1 with+symbols',
          'param2 with+symbols': 'value2 with+symbols',
          'param3 with+symbols': 'value3 with+symbols',
          'param4 with+symbols': 'value4 with+symbols',
        });
      });
    });

    describe('with duplicated parameters', () => {
      it('should return an object with only one key', () => {
        expect(ParamsHelper.parseQueryParams('?param1=value1&param1=value2')).toEqual({
          param1: 'value2',
        });
      });

      it('should decode URI components correctly', () => {
        const queryString = [
          '?param1%20with%2Bsymbols=value1%20with%2Bsymbols',
          'param1%20with%2Bsymbols=value2%20with%2Bsymbols',
          'param1%20with%2Bsymbols=value3%20with%2Bsymbols',
          'param1%20with%2Bsymbols=value4%20with%2Bsymbols',
        ].join('&');
        expect(ParamsHelper.parseQueryParams(queryString)).toEqual({
          'param1 with+symbols': 'value4 with+symbols',
        });
      });
    });
  });

  describe('updateQueryParams', () => {
    describe('with no current params and no new params', () => {
      it('should output an empty string', () => {
        const params = ParamsHelper.updateQueryParams('', {});
        expect(params).toEqual('');
      });
    });

    describe('with no current params and new params', () => {
      it('should output the correct string', () => {
        const params = ParamsHelper.updateQueryParams('', {
          param1: 'value1',
          param2: 'value2',
          param3: 'value3',
          param4: 'value4',
        });
        expect(params).toEqual('?param1=value1&param2=value2&param3=value3&param4=value4');
      });

      it('should encode values correctly', () => {
        const params = ParamsHelper.updateQueryParams('', {
          'key+with symbols': '++value with symbols',
        });
        expect(params).toEqual('?key%2Bwith%20symbols=%2B%2Bvalue%20with%20symbols');
      });
    });

    describe('with current params and new params', () => {
      it('should output the correct string', () => {
        const oldParams = '?oldparam1=value1';
        const params = ParamsHelper.updateQueryParams(oldParams, {
          param1: 'value1',
          param2: 'value2',
          param3: 'value3',
          param4: 'value4',
        });
        expect(params).toEqual('?oldparam1=value1&param1=value1&param2=value2&param3=value3&param4=value4');
      });

      it('should decode and re-encode old params correctly', () => {
        const oldParams = '?param%20with%20spaces=value%2Bplus';
        const params = ParamsHelper.updateQueryParams(oldParams, {
          'key+with symbols': '++value with symbols',
        });
        expect(params).toEqual('?param%20with%20spaces=value%2Bplus&key%2Bwith%20symbols=%2B%2Bvalue%20with%20symbols');
      });

      it('should replace old params', () => {
        const oldParams = '?param=value&param2=value2';
        const params = ParamsHelper.updateQueryParams(oldParams, {
          param: 'newValue',
          param3: 'value3',
        });
        expect(params).toEqual('?param=newValue&param2=value2&param3=value3');
      });
    });
  });
});
