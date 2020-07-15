import React from 'react';
import { determineRouteParams, routes } from './routes';

describe('routes', () => {
  describe('determineRouteParams', () => {
    describe('with route without path parameters', () => {
      it('should output the correct parameters', () => {
        const component = () => (<div />);
        const route = {
          name: 'route',
          component,
          path: '/',
        };

        expect(determineRouteParams(route)).toEqual({
          name: 'route',
          component,
          path: '/',
          pathParams: [],
        });
      });
    });

    describe('with route with path parameters', () => {
      it('should output the correct parameters', () => {
        const component = () => (<div />);
        const route = {
          name: 'route',
          component,
          path: '/:id/product/:name',
        };

        expect(determineRouteParams(route)).toEqual({
          name: 'route',
          component,
          path: '/:id/product/:name',
          pathParams: ['id', 'name'],
        });
      });
    });
  });

  describe('route object', () => {
    it('should have all route names defined correctly', () => {
      routes.forEach((route) => {
        expect(route.name).toBeTruthy();
      });
    });

    it('should have all string paths', () => {
      routes.forEach((route) => {
        expect(typeof route.path).toBe('string');
      });
    });

    it('should have non-empty paths', () => {
      routes.forEach((route) => {
        expect(route.path.length).toBeGreaterThan(0);
      });
    });

    it('should have no more than one catch-all path', () => {
      expect(routes.filter((route) => route.path === '*').length)
        .toBeLessThan(2);
    });

    it('should have a pathParams parameter', () => {
      routes.forEach((route) => {
        expect(route.pathParams).toBeInstanceOf(Array);
      });
    });
  });
});
