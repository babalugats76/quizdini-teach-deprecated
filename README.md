This project is the teacher front-end for Quizdini 2.0

## To-Do List

* Mock up of MatchGameCreator using Formik
* Examine this [codepen](https://codesandbox.io/s/qJR4ykJk) to see how to create custom input controls, etc.
* Work on validation schema, etc. for MatchForm
* Work on adding validation message/notification component
* Investigate onPointerDown and alternatives that support mobile events, in React for use with the Toolbar Buttons
* Insert special character rich text editor enhancements
* Continuing to customize semantic ui components
* Is it possible to use inline SVG for icons
* Work on semantic ui layout
  * Header (fixed)
  * Footer
  * Navbar
* Semantic ui custom stylesheet; instead of CDN
  * Custom colors
  * Custom fonts
* Match form validation
* Match form submission
* Mock up Login Component / Page
* Investigate redirects, etc.

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