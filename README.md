This project is the teacher front-end for Quizdini 2.0

## To-Do List


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
* Mock up of MatchGameCreator using Formik
* Examine this [codepen](https://codesandbox.io/s/qJR4ykJk) to see how to create custom input controls, etc.
* Work on validation schema, etc. for MatchForm
* Work on adding validation message/notification component
* Investigate onPointerDown and alternatives that support mobile events, in React for use with the Toolbar Buttons
* Continuing to customize semantic ui components
* Work on semantic ui layout
  * Header (fixed)
  * Footer
  * Navbar
* Work on user list of games
* Semantic ui custom stylesheet; instead of CDN; rough instructions can be found [here](https://react.semantic-ui.com/usage) but I am sure will be needed beyond that
  * Custom colors
  * Custom fonts
* Match form validation
* Match form submission
* Mock up Login Component / Page
* Investigate redirects, etc.
* Match Editor
   * Add Control/Cmd keys for clear formatting and insert pi
   * Trouble shoot problem with clear formatting button; currently posting page
~~* Work on Icon system guided roughly by [this article](https://medium.com/@david.gilbertson/icons-as-react-components-de3e33cb8792)~~
* Figure out how to represent matches on the screen, e.g., table, cards, etc.
* handleAccordionClick function in MatchForm
  * Comment
  * Refine/shorten accordian toggle
* Create table component
* Add table component to MatchForm for matches
* Update Input Text Component
  * Inline style such that a text input's max-width, specified in ch, is equal to its maxLength
  * Change label to float, instead of being attached right
  * Change label to a more simplified, e.g., 13/50
  * Disposition label coloring, green-yellow-red, does semantic have something? 


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