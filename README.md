This project is the teacher front-end for Quizdini 2.0

## To-Do List

* Match Authoring
   * Components
      * **`MatchGame`**
         * ~~Create an up-to-date sample json file to use in testing~~
         * Convert to dumb functional component (if possible)
         * ~~Fetch from API e.g., start with call to static `.json`~~
         * Save to API 
         * Create Related Components/scripts
            * ~~View~~
            * ~~loadData~~
            * ~~index.js~~
            * ~~Loading~~
            * ~~Error~~
      * **`MatchForm`**
         * ~~Create references for `MatchEditor` and pass down to `MatchBank`, etc. using what we learned [here](https://codesandbox.io/s/vv110zn39l?fontsize=14)~~
         * Add high-level form-level validation 
            * Not enough matches
         * Refine `matchSchema`
         * Add term-based `removeMatch` function (for use by `MatchTable`)
         * Create button group (if necessary)
         * Create additional buttons 
            * Delete
            * Cancel
            * Back?
         * Refine `newMatchSchema` validation functionality, including `touched`, etc.
         * Add `parseMatches` function; pass down to `MatchBulkEditor`
           * Figure out how to integrate [DOMPurify](https://www.npmjs.com/package/dompurify) or [html-react-parser](https://www.npmjs.com/package/html-react-parser)    
         * Add `explodeMatches` function; pass down to `MatchBulkEditor` 
           * Incorporate into `handleNewMatch`, updating `matchText`
         * Conditional `MatchBulkEditor` loading
      * **`MatchBulkEditor`**
         * Convert to stateless functional component
         * Convert to use `MatchForms` Formik `onChange` function
         * Remove use of `setFieldValue`
         * Create load button 
      * **`MatchBank`**
         * ~~Refine tab stops~~
      * **`MatchTable`**
         * Add Delete Button
         * Pass `removeMatch` function down as prop 
      * **`FormatToolbar`**
         * Consider converting to use SUI's `IconGroup`
         * Consider renaming
         * Investigate using `onPointerDown` and alternatives that support mobile events
      * **`Button`**
         * Continue to refine as used by other components
      * **`InputFeedback`**
         * Figure out which Semantic component to wrap
         * Develop and incorporate as appropriate into other `Input*` components
      * **`InputText`**
         * Reexamine whether floating label should be pulled out into its own Component
         * Remove inline floating label style; add appropriate CSS definitions
         * Add floating label `className` dynamically
      * **`InputTextarea`**
         * Create using `InputText` as guide
         * Retrofit for instructions
         * Convert instructions to use
      * **`Accordian`**
         * Consider pushing `active` state up to parent component
   
* Global Styling
   * Once editors are complete, consider adding style rule for buttons, using rule similar to: ```#match-bank button.labeled:not(.active):not(:hover) {
  background-color: rgba(40,40,40,0.3) !important;
}```
   * Add addition webfonts, including those related to logo's font
   * Add optimized SVG versions of Quizdini logo, see `Quizdini.zip`
   * Update CSS `fill` style properties for all icons
   * Investigate controlling line-height, especially in input field; some fonts will require adjustment and we need to figure out where to put that style override

* Global Layout
  * Style fixed menu
  * Footer
  * Figure out how to implement mobile friendly menu (hamburger)

* Next BIG sub-projects
   * `MatchGameTable`
   * `LoginPage`
   * Investigate and redirects using `react-router` or similar tool

* Document and add `PropTypes` to the following Components
   * Button
   * FixedMenu
   * FormatToolbar
   * Header
   * InputDropown
   * InputFeedback
   * InputText - PropTypes done
   * Layout
   * Main
   * MatchBulkEditor
   * MatchEditor
   * MatchForm
   * MatchGame

* General Cleanup
   * **Move defunct components to `retire` folder**
   * Remove unneeded components near end of initla phase of development 

## React Router

This project uses the React Router module, installed via `npm install react-router-dom` 

Documentation can be found at [React Router: Declarative Routing for React.js](https://reacttraining.com/react-router/)

## Formik

I am going to try to use Formik in this project to simplify the gnarly aspects of creating dynamic forms in React

To install: `npm i formik`

Documentation can be found [here](https://jaredpalmer.com/formik/docs/overview)

## Yup

I am also going to try Yup in order to do schema-based form validation. I have used Joi in the past, but we will see how this one goes. Install using `npm i yup' and the documentation can be found [here](https://www.npmjs.com/package/yup)

## slate.js

I am going to try to implement a limited, rich-text editor using Slate

To install: `npm i slate slate-react immutable`

Documentation can be found [here](https://docs.slatejs.org)

A great rich-text source code example can be found [here](https://github.com/ianstormtaylor/slate/tree/master/examples/rich-text)

In order to make things differentiating between `cmd` on Mac and `ctrl` on Windows, we will use the `is-hotkey` module

## Icon System

In lieu of font awesome or something like that, went with creating own modular SVG icon system using icons from [Icon Moon](https://icomoon.io) and referring to this [CSS Tricks article](https://css-tricks.com/creating-svg-icon-system-react/)

## Semantic UI

I will be using [Semantic UI React](https://react.semantic-ui.com/) as the component UI framework for this project. [Documentation](https://react.semantic-ui.com/) is robust and rich with examples.

Due to lack of development, we will be using a community fork of Semantic UI, called Fomantic UI

1. Install using `install fomantic-ui` using `Express (Set components and output folder)`; `Yes`; `src/semantic`; select all components; `No` to set permissions; `No` to RTL; `dist/` for output location
2. Customize by following the [theming documentation](https://fomantic-ui.com/usage/theming.html)
3. Check out [this video](https://www.youtube.com/watch?v=a9mUH1EWp40)

## Typechecking with PropTypes

Refer to [Typechecking with PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html) in order to self-document components, implement quality controls, etc.

## As Development Continues

* Check out [this article](https://medium.com/styled-components/component-folder-pattern-ee42df37ec68) for *folder structure* and data loading 
* Examine this [codepen](https://codesandbox.io/s/qJR4ykJk) to see how to create custom input controls, etc.
* Work on Icon system guided roughly by [this article](https://medium.com/@david.gilbertson/icons-as-react-components-de3e33cb8792)
* Continue to develop more intelligently by using [ReactJS Code Snippets](https://www.cheatography.com/mend0za/cheat-sheets/vscode-reactjs-code-snippets/pdf/)
* Refer to [The Giphy Search Example](https://codesandbox.io/s/nxqmqyxld) to attempt to create application without using Redux
* Refer to [this guide](https://kentcdodds.com/blog/learn-react-fundamentals-and-advanced-patterns), especially when closer to publishing