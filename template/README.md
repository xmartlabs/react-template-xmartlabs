This project was generated using [Create React App](https://github.com/facebook/create-react-app) with [Xmartlabs' template](https://github.com/xmartlabs/cra-template-xmartlabs).

## Post Install

After creating a project with this template you need to take some extra steps to finish the setup.

* Remember to rename the `eslintrc.yml` file to `.eslintrc.yml` (add the initial dot).
* Add the `clearMocks: true` option to the Jest configuration on the package.json file (read below).

### Jest Configuration

To have tests run correctly you need to override the default options of Jest. To do this you simply need to add a `jest` key on your package JSON with the following content:

```json
{
  "jest": {
    "clearMocks": true
  }
}
```

## Running Tests

```shell
npm test
```

## Project structure

The `src` directory has the following structure:

* `assets`: This directory contains all global assets. This includes images and stylesheets used in multiple components.
* `common`: React components used across multiple pages of the SPA.
* `config`: Global app configuration files go here (e.g. a constants file).
* `helpers`: Javascript files that provide helper functions to the app. These are not React components.
* `hocs`: Higher Order Components are stored here.
* `models`: Models (abstractions of data) go here.
* `networking`: Includes all code related to networking.
  * `controllers`: All controllers of the app go here.
  * `serializers`: All serializers of the app go here.
* `pages`: React components that are entrypoints for a page of the SPA.
* `routes`: All configuration related to routing of the pages goes here.

## Routing

This project uses [React Router](https://github.com/ReactTraining/react-router) to generate routing between the pages. We've created an abstraction over React Router to make it safer to operate with paths and have some other useful helpers. This section explains how this abstraction works and how to add a new route.

### Routing structure

Our main objective is to have routes declared centrally and reused across the app. This avoids common issues like typos when writing paths. Configuration of the routes is stored on `src/routes/routes.js`. We store information of the routes, such as the name of the route and path. More information can be added to the `routes` object, considering it is later passed as props to the `Route` component of React Router. You'll notice that there's no React component linked to the route.

The mapping between routes and React components is done in `src/route-components.js`. We do this in a separate component since it makes it easier to support [URL Splitting](https://blog.xmartlabs.com/2019/05/17/url-splitting/) later on. This isn't configured by default, so you'll have to do some more work to enable URL Splitting.

Some helpers have been defined, such as `AppLink` and `AppRedirect`. These are wrappers of the typical `Link` and `Redirect` of React Router. The advantage of these helpers is that they provide a different props API. Instead of having a `to` prop where you just pass the exact path and query string, they accept three different props:

* `routeName`: The name of the target route. Obtained from the routes file as detailed above.
* `pathParams`: A map of path params. Examples below.
* `queryParams`: A map of query params. Examples below.

It is highly encouraged that you use these helpers instead of the native ones of React Router. If you need more functionality, implement it on the helpers directly. Another useful helper is `goToPage`, which is a function that receives the same parameters. The difference is that you can use this function to imperatively trigger a route change.

### Creating a Route

* Create a new page component on the `pages` directory. This component will serve as an entrypoint to the page.
* Add a name for the new route on `src/routes/routes.js`. Then, on the same file, add an entry to the routes object specifying the path of the route.
* Add an entry to the object on `src/route-components.js` that links the name you defined previously to the component you created on the pages directory.

And that's it. If you defined the path correctly you should be able to access the component on that route. There are already examples on all of these files, so you should be able to follow them.

**NOTE:** please define routes in order of specificity (more specific routes should come before) to avoid a less specific route matching before. You can also add the `exact: true` configuration option to the route on `src/routes/routes.js` to avoid matching less specific routes.

### Using the helpers

Let's imagine we have a route to the homepage `/home` and we have named it `home` on our routes object. In order to link to it from another page we must render an `AppLink` component like so:

```jsx
<AppLink routeName={routeNaming.HOME} />
```

This will route your page to `/home` once clicked. Let's assume the route also receives a path parameter `id` (`/home/:id`) and also we want to pass some query parameters. Path parameters and query parameters are specified by Javascript objects, like this:

```jsx
<AppLink
  routeName={routeNaming.HOME}
  pathParams={{ id: 'foo' }}
  queryParams={{ bar: 'baz', bar2: 'baz2' }}
>
```

This link will link to `/home/foo?bar=baz&bar2=baz2`. It's worth noting that the `Redirect` component also has the same prop interface, and the `goToProps` helper accepts three parameters with the same names, so you should feel at home when using all three of them.

## Component Layouts

Most of the times multiple pages of your app will share similar features. For example, 90% of your pages might have a navbar and a footer. It's really not practical to go around placing a navbar on ALL of your pages manually. Component layouts come to the rescue!

You'll find a Higher Order Component named `withLayout` on the `hocs` directory. This component is quite simple, it simply wraps the component in a `Layout` component, expecting also a parameter named `layoutType`.

The `Layout` component will be your best friend. It's only a matter of defining what layout types you want to have and then implement them inside this component. You might have a layout that only includes a navbar, or one that only has a footer, or both. Even one that doesn't have anything except the wrapped component.

You can apply the HOC like so:

```js
withLayout(LAYOUT_TYPES.MY_LAYOUT_TYPE, Component);
```

This could turn your `Component` from this:

```jsx
<div>
  <h1>My component</h1>
</div>
```

To this:

```jsx
<div>
  <Navbar>
  <div>
    <h1>My component</h1>
  </div>
  <Footer>
</div>
```

It's just an example though. Be mindful of components you'll probably need across multiple pages and a layout will probably help you include them seamlessly! Remember though that not everything can be solved with a layout.

## Networking

This is a very compact section that explains networking. For a more in-depth explanation refer to [this blogpost on the subject](https://blog.xmartlabs.com/2020/07/09/frontend-architecture-and-best-practices/).

"Networking" in this context means communication between the frontend and any kind of backend or service we need to consume. And it can be hard sometimes. APIs can sometimes change unexpectedly or be badly organized in terms of the data they provide. It's the job of the developer to protect its frontend against the backend menace.

That's why this project implements a particular networking pattern that involves three distinct elements:

* Controllers: handle the specific networking calls needed to fetch data or modify the state of the system on the backend.
* Serializers: receive fresh data from the controller and transform it to remove unnecessary data, rename fields and prepare it to be fed into a model.
* Models: abstractions of data that represent concepts of our frontend app. Typically instantiated with deserialized data from a serializer.

### Controllers

All networking calls must be made in controllers. They are in charge of knowing where to go to fetch data, what kind of HTTP method to use, etc. You'll probably make a request at some point that returns data. Controllers are also in charge of deserializing the data via a serializer and instantiating models accordingly. Here's an example:

```js
// src/networking/controllers/example-controller.js
import { Example } from 'src/models/example';
import { ExampleSerializer } from '../serializers/example-serializer';
import { ApiService } from '../api-service';
import { API_ROUTES } from '../api-routes';

class ExampleController {
  static async getExamples() {
    const response = await ApiService.get(API_ROUTES.EXAMPLE);
    const deSerializedExample = ExampleSerializer.deSerialize(response.data);
    return new Example(deSerializedExample);
  }
}

export { ExampleController };
```

### Serializers

Serializers act as a sort of firewall of data by deserializing data served by the API. Any kind of structured data that is returned by the API should be deserialized.

The advantage of this is that you can redefine the fields of the data and remove unused ones.

```js
// src/networking/serializers/example-serializer.js
class ExampleSerializer {
  static deSerialize(data) {
    return {
      foo: data.foo,
      bar: data.bar,
    };
  }
}

export { ExampleSerializer };
```

### Models

Models represent concepts of your app. Typically you'll use them together with controllers and serializers, where deserialized data will be fed to a model to instance it.

```js
// src/models/example.js
class Example {
  constructor(params) {
    this.foo = params.foo;
    this.bar = params.bar;
  }
}

export { Example };
```
