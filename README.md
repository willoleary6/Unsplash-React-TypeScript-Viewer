# Unsplash React TypeScript Viewer

This App allows a user to search, browse and download images from the Unsplash data api, it implements React-Redux and is built with Typescript. CSS is handled through the use of the Tailwindcss framework.

Some features of note are infinite scrolling, mobile views and a responsive user experience.

## [React](https://reactjs.org/)

React is a JavaScript web framework, it's big selling point is it makes state
management and UI updates much easier to handle than a basic JavaScript
application. It also relies on a component based architecture which encourages
code re-use and implementing the single responsibility principle.

In this template we have used functional components, however there is no need to
stick with this if you have a need for class based components.

## [Redux](https://redux.js.org/)

Redux is a state store that pairs very well with React. It should be used to
store state that needs to be shared between multiple React components. The
"thunk" middleware should also be used for making asynchronous API calls. It
also recommended that you make use of the Redux toolkit wherever possible, this
can greatly reduce the amount of boiler-plate code needed for Redux.

#### Useful links

-   [React Redux](https://react-redux.js.org/)
-   [Redux Toolkit](https://redux-toolkit.js.org/)
-   [Redux Essentials Tutorial](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)

## [TypeScript](https://www.typescriptlang.org/)

TypeScript is a superset of JavaScript that allows for static type checking. It
was chosen for this project as it is very useful for preventing a lot of common
bugs that occur when using JavaScript particularly as the application grows in
scale.

The most common place you will notice the use of TypeScript in this project is
the type annotations for React components. It is common to use the `JSX.Element`
type [as the return
type](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components)
of functional components. It is also common to create a dedicated interface or
type ([interfaces are generally preferred over
types](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example#types-or-interfaces))
for the input props of a component (when required).

You will also find it necessary to provide types or interfaces for the Redux
store. Note that the `useAppDispatch` and `useAppSelector` functions found in
`/src/app/hooks` should be used in place of the standard Redux hooks for full
type support.

## [Tailwindcss](https://tailwindcss.com/)

Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces. It is a highly customizable, low-level CSS framework that gives you all of the building blocks you need to build bespoke designs without any opinionated styles you have to fight to override

### Available Scripts

In the project directory, you can run:

-   `npm install`: Installs all the neccessary dependencies that this app needs.

-   `npm start`: Runs the app in the development mode. Open
    [http://localhost:3000](http://localhost:3000) to view it in the browser. The
    page will reload if you make edits. You will also see any lint errors in the
    console.

-   `npm test`: Launches the test runner in the interactive watch mode. See the
    section about [running
    tests](https://facebook.github.io/create-react-app/docs/running-tests) for
    more information.

-   `npm run build`: Builds the app for production to the `build` folder. It
    correctly bundles React in production mode and optimizes the build for the
    best performance. The build is minified and the filenames include the hashes.
    Your app is ready to be deployed! See the section about
    [deployment](https://facebook.github.io/create-react-app/docs/deployment) for
    more information.

-   `npm run eject`: **Note: this is a one-way operation. Once you `eject`, you
    can’t go back!** If you aren’t satisfied with the build tool and configuration
    choices, you can `eject` at any time. This command will remove the single
    build dependency from your project. Instead, it will copy all the
    configuration files and the transitive dependencies (webpack, Babel, ESLint,
    etc) right into your project so you have full control over them. All of the
    commands except `eject` will still work, but they will point to the copied
    scripts so you can tweak them. At this point you’re on your own. You don’t
    have to ever use `eject`. The curated feature set is suitable for small and
    middle deployments, and you shouldn’t feel obligated to use this feature.
    However we understand that this tool wouldn’t be useful if you couldn’t
    customize it when you are ready for it.

## Linting

Linting of the application is provided by [ESLint](https://eslint.org/) along
with several plugins. You can lint the application by running `npm run lint`.
ESLint configurations are stored in the `.eslintrc.js` file. Most editors have a
plugin that will show you inline linting errors.

## Formatting

Formatting is provided by [Prettier](https://prettier.io/). All files in the
application can be formatted using the `npm run format` command. Prettier
configurations are stored in the `.prettierrc.js` file. Most editors have a
plugin that will automatically format files on save.

## Unittesting

Unittesting has been implemented throughout this project, unittesting is quite benifical for debugging the logic flows of an app in isolation, especially in an redux application where the state can effect both code segments and elements on the user interface.

## Structure

This section discusses the general folder structure of the application.

The main part of the application is found in the `src` folder.

`src\index.tsx` is the main entry point for the application.

`src\app` contains general setup files that setup providers that are used
through out the application, e.g. the Redux store.

`src\features` contains share react components that are used in multiple places
of the application.

`src\routes` contains the components that are rendered by different routes
within the application. It also contains the `src\routes\routes.tsx` files which
sets up the generic routing structure of the application.

## Points of note

#### Barrel Exports

A barrel is a way to rollup exports from several modules into a single convenient module. The barrel itself is a module file that re-exports selected exports of other modules. Barrels allow for better Intellisense and auto-importing for components in editors like VSCode thanks to the named exports, along with more flexibility in organizing filesystems. We can nest folders as deep as it makes sense without worrying about ballooning import statements.
