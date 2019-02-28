This project is the teacher front-end for Quizdini 2.0

## To-Do List

* General Cleanup
   * Migrate components to `components` folder
* Add addition webfonts, including those related to logo's font
* Create custom TextArea component
   * Convert instructions to use this
* Buttons
   * Create custom Button component that wraps semantic
      * Loading?
   * Create button group for Match Form
      * Save
      * Delete
      * Cancel
* Work on validation schema, etc. for MatchForm
* Work on adding validation message/notification component
* Investigate onPointerDown and alternatives that support mobile events, in React for use with the Toolbar Buttons
* Work on semantic ui layout
  * Header (fixed)
  * Footer
  * Navbar
    * ~~Figure out how to make NavBar fixed~~
* Work on user list of games
* MatchForm
   * Validation
   * Form submission
   * Tab stops
* Mock up Login Component / Page
* Investigate redirects, etc.
* Format Toolbar
   * Find out what is causing `title` attribute on icon buttons to have spaces and be uppercase, should be all lowercase with dashes for spaces
* Match Editor
   * Add Control/Cmd keys for clear formatting and insert pi
   * Trouble shoot problem with clear formatting button; currently posting page
* Figure out how to represent matches on the screen, e.g., table, cards, etc.
* Accordion Component
  * Comment
  * Refine/shorten accordian toggle
  * Add Icon functionality
* Create table component
* Add table component to MatchForm for matches
* Create Floating Label Component
  * Refine floating label style
  * Remove color-switching logic; replace with warning/danger prop; wrap Label with `floating` prop


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

## As Development Continues

Check out [this article](https://medium.com/styled-components/component-folder-pattern-ee42df37ec68) for *folder structure* and data loading 
Examine this [codepen](https://codesandbox.io/s/qJR4ykJk) to see how to create custom input controls, etc.
Work on Icon system guided roughly by [this article](https://medium.com/@david.gilbertson/icons-as-react-components-de3e33cb8792)