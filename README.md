This project is the teacher front-end for Quizdini 2.0

## To-Do List

* Mock up of MatchGameCreator using Formik
* Examine this (codepen)[https://codesandbox.io/s/qJR4ykJk] to see how to create custom input controls, etc.
* Work on validation schema, etc. for MatchForm
* Work on adding validation message/notification component
* Investigate onPointerDown and alternatives that support mobile events, in React for use with the Toolbar Buttons
* Wire dummy button and create dummy function for clear formatting
* Write slate code to remove marks from selected text
* Create modular SVG icon system using icons from [Icon Moon](https://icomoon.io) and referring to this [CSS Tricks article](https://css-tricks.com/creating-svg-icon-system-react/)

## React Router

This project uses the React Router module, installed via `npm install react-router-dom` 

Documentation can be found at [React Router: Declarative Routing for React.js](https://reacttraining.com/react-router/)

## Formik

I am going to try to use Formik in this project to simplify the gnarly aspects of creating dynamic forms in React

To install: `npm i formik`

Documentation can be found [here](https://jaredpalmer.com/formik/docs/overview)

## slate.js

I am going to try to implement a limited, rich-text editor using Slate

To install: `npm i slate slate-react immutable`

Documentation can be found [here](https://docs.slatejs.org)

A great rich-text source code example can be found [here](https://github.com/ianstormtaylor/slate/tree/master/examples/rich-text)

In order to make things differentiating between `cmd` on Mac and `ctrl` on Windows, we will use the `is-hotkey` module

## Font Awesome

I am also going to try out the free set of Font Awesome 5.0 svg icons

To install: `$ npm i @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome`

Documentation may be found [here](https://www.npmjs.com/package/@fortawesome/react-fontawesome)

Consider adding library to project (index) consistent with this [article](https://scotch.io/tutorials/using-font-awesome-5-with-react)