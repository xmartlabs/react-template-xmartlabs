# Xmartlabs Create React Boilerplate

## Contributing to this Boilerplate

Make sure you have the appropriate version of Node (24.5.0) and NPM (11.5.1) installed.

Then install the required packages:

```shell
npm install
```

### Starting the Project

```shell
npm run start
```

### Running Tests

```shell
npm run test
```

## Generate a Project with this Boilerplate

For this we recommend using [degit](https://www.npmjs.com/package/degit)

1. Download the master branch of a repo from GitHub to the current working directory:

```shell
npx degit@latest xmartlabs/react-template-xmartlabs my-new-project-name
```

If the second argument is omitted, the repo will be cloned to the current directory.

2. Move to my new project folder:

```shell
cd my-new-project-name
```

3. Initialize a Git repository

```shell
git init
```

You'll have to link it to the project remote manually.

4. Install the required packages:

```shell
npm install
```

And that's it! now you are ready to build on top, the commands to start and test are listed above.

## Project structure

The `src` directory has the following structure:

- `assets`: This directory contains all global assets. This includes images and icons used in multiple components.
- `common`: React components used across multiple pages of the SPA.
- `config`: Global app configuration files go here (e.g. a constants file).
- `helpers`: Javascript files that provide helper functions to the app. These are not React components.
- `hocs`: Higher Order Components are stored here.
- `hooks`: directory for generic React hooks that can be reused across components.
- `networking`: Includes all code related to networking.
  - `controllers`: All controllers of the app go here.
  - `serializers`: All serializers of the app go here.
  - `types`: All information regarding typing of networking data.
- `pages`: React components that are entrypoints for a page of the SPA.
- `routes`: All configuration related to routing of the pages goes here.

## Routing

This project uses [React Router](https://github.com/ReactTraining/react-router) to generate routing between the pages. We've created an abstraction over React Router to make it safer to operate with paths and have some other useful helpers. This section explains how this abstraction works and how to add a new route.

### Routing structure

Our main objective is to have routes declared centrally and reused across the app. This avoids common issues like typos when writing paths. Configuration of the routes is stored on `src/routes/routes.ts`. We store information of the routes, such as the name of the route, path and component. More information can be added to the `routes` object, considering it is later passed as props to the `Route` component of React Router.

Some helpers have been defined, such as `AppLink` and `AppRedirect`. These are wrappers of the typical `Link` and `Redirect` of React Router. The advantage of these helpers is that they provide a different props API. Instead of having a `to` prop where you just pass the exact path and query string, they accept three different props:

- `routeName`: The name of the target route. Obtained from the routes file as detailed above.
- `pathParams`: A map of path params. Examples below.
- `queryParams`: A map of query params. Examples below.

It is highly encouraged that you use these helpers instead of the native ones of React Router. If you need more functionality, implement it on the helpers directly. Another useful helper is the `useGoToPage` hook, which is a function that receives the same parameters. This hook replaces usage of the `useNavigate` hook.

### Creating a Route

- Create a new page component on the `pages` directory. This component will serve as an entrypoint to the page.
- Add a name for the new route on `src/routes/routes.ts`. Then, on the same file, add an entry to the routes object specifying the path and any other configuration of the route.
- Add the name and related component to the `RouteComponent` dictionary on `src/routes/route-component.ts`.

And that's it. If you defined the path correctly you should be able to access the component on that route. There are already examples on all of these files, so you should be able to follow them.

**NOTE:** please define routes in order of specificity (more specific routes should come before) to avoid a less specific route matching before. You can also add the `exact: true` configuration option to the route on `src/routes/routes.ts` to avoid matching less specific routes.

### Using the helpers

Let's imagine we have a route to the homepage `/home` and we have named it `home` on our routes object. In order to link to it from another page we must render an `AppLink` component like so:

```tsx
<AppLink routeName={RouteName.Home} />
```

This will route your page to `/home` once clicked. Let's assume the route also receives a path parameter `id` (`/home/:id`) and also we want to pass some query parameters. Path parameters and query parameters are specified by Javascript objects, like this:

```tsx
<AppLink
  routeName={RouteName.Home}
  pathParams={{ id: 'foo' }}
  queryParams={{ bar: 'baz', bar2: 'baz2' }}
>
```

This link will link to `/home/foo?bar=baz&bar2=baz2`. It's worth noting that the `Redirect` component also has the same prop interface, and the `useGoToPage` hook returns a function that accepts three parameters with the same names, so you should feel at home when using all three of them. Here's how to use the hook:

```tsx
const MyComponent = () => {
  const goToPage = useGoToPage();

  const navigate = () => {
    // Assume RouteName.UserDetail equals '/users/:id'
    // Navigates to `/users/foo?bar=baz`
    goToPage(RouteName.UserDetail, { id: "foo" }, { bar: "baz" });
  };

  return <button onClick={navigate}>Navigate!</button>;
};
```

### Route Layout

There's a `RouteLayout` component which wraps all routes. It's used for rendering components inside the scope of the router but in a way that every route is wrapped. You should only change this component if you need to add functionality that spans all routes and that requires being inside the scope of the router to work.

## Component Layouts

Most of the times multiple pages of your app will share similar features. For example, 90% of your pages might have a navbar and a footer. It's really not practical to go around placing a navbar on ALL of your pages manually. Component layouts come to the rescue!

You'll find a Higher Order Component named `withLayout` on the `hocs` directory. This component is quite simple, it simply wraps the component in a `Layout` component, expecting also a parameter named `layoutType`.

The `Layout` component will be your best friend. It's only a matter of defining what layout types you want to have and then implement them inside this component. You might have a layout that only includes a navbar, or one that only has a footer, or both. Even one that doesn't have anything except the wrapped component.

You can apply the HOC like so:

```ts
withLayout(LayoutType.MyLayoutType, Component);
```

This could turn your `Component` from this:

```tsx
<div>
  <h1>My component</h1>
</div>
```

To this:

```tsx
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

- Controllers: handle the specific networking calls needed to fetch data or modify the state of the system on the backend.
- Serializers: receive fresh data from the controller and transform it to remove unnecessary data, rename fields and prepare it to be used by the application.

### Controllers

All networking calls must be made in controllers. They are in charge of knowing where to go to fetch data, what kind of HTTP method to use, etc. You'll probably make a request at some point that returns data. Controllers are also in charge of deserializing the data via a serializer. Here's an example:

```ts
// src/networking/controllers/example-controller.ts
import {
  serialize,
  deSerialize,
} from "networking/serializers/example-serializer";
import { ApiService } from "networking/api-service";
import { API_ROUTES } from "networking/api-routes";

export const getExamples = async (): Promise<Example[]> => {
  const response = await ApiService.get<RawExample[]>(API_ROUTES.EXAMPLE);
  return response.map<Example>(deSerialize);
};

export const createExample = async (example: Example): Promise<Example> => {
  const serializedExample = serialize(example);
  const response = await ApiService.post<RawExample>(API_ROUTES.EXAMPLE, {
    body: JSON.stringify(serializedExample),
  });
  return deSerialize(response);
};
```

This controller has two methods: `getExamples` and `createExample`. The first method attempts to get a list of examples from the backend. Once the data arrives the controller will attempt to deserialize the data via the methods defined on the serializer file.

The second method illustrates how we would go about _sending_ data to the backend. In this case we do the inverse process as before: given an instance of `Example` the controller will attempt to serialize (as opposed to deserialize) it and send it as payload.

Let's look at how serializers work.

### Serializers

Serializers act as a sort of firewall (or customs, if you will) of data by deserializing data served by the API. Any kind of structured data that is returned by the API should be deserialized. Any data sent to the API should, in turn, be serialized.

The advantage of this is that you can redefine the fields of the data and remove unused ones. This protects our frontend from unexpected changes in: key naming, JSON structure and other kinds of issues. Here's an example:

```ts
// src/networking/serializers/example-serializer.ts
export const deSerialize = (data: RawExample): Example => ({
  foo: data.Foobaz,
  bar: data.Barbaz,
});

export const serialize = (example: Example): RawExample => ({
  Foobaz: example.foo,
  Barbaz: example.bar,
});
```

When deserializing in this (admittedly simple) example the `deSerialize` method receives an instance of `RawExample` and returns an instance of `Example`. In this case we're simplifying the keys of the JSON we've received, by removing the common suffix `baz`. When serializing we're restoring the example to the format the API will understand.

#### Types

When working with Typescript it's best to have specific types for everything. In this case we've defined the types like so:

```ts
// src/networking/types/example.d.ts
type RawExample = {
  Foobaz: string;
  Barbaz: number;
};

type SerializedExample = {
  foo: string;
  bar: number;
};
```

Types are defined separately so that the types can be accessible throughout the app without need to import the serializer each time.

## Component Styling

We use [Tailwind](https://tailwindcss.com/docs/installation/using-vite) for styles. Visit their documentation for more information on how to style.

We also use [Shadcn](https://ui.shadcn.com/) for importing and reusing components. Make sure to review the documentation for how to import components.

## Docker Configuration

A [`Dockerfile`](./Dockerfile) and a [`.dockerignore`](./.dockerignore) have been added to this project. The main reason to use Docker is to generate a production build, it is not intended for use for development.

In fact, the Dockerfile has instructions only for generating the production-ready build. The idea is to run the image connected to a volume, to which the static files will be copied once the image is run. You only need to define a volume and point it to the correct target. Inside the container the target should be the `host-build` directory, you can choose how you map that on your host machine.

How to run:

```sh
docker build --tag IMAGE_NAME
docker run --name CONTAINER_NAME --mount type=bind,source=PATH/TO/TARGET,target=/code/host-build IMAGE_NAME
```

Where `PATH/TO/TARGET` is the path on your local machine where the files will be copied to.
