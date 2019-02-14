import React from 'react';

export const IconUnderline = ({ width = '20', height = '20', ...props }) => {
  return (
    <svg className="icon icon-underline" xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 32 32" aria-labelledby="title" {...props} >
      <title id="title">Underline</title>
      <path d="M22 2h4v13c0 4.971-4.477 9-10 9s-10-4.029-10-9v-13h4v13c0 1.255 0.57 2.459 1.605 3.391 1.153 1.038 2.714 1.609 4.395 1.609s3.242-0.572 4.395-1.609c1.035-0.931 1.605-2.136 1.605-3.391v-13zM6 26h20v4h-20z"></path>
    </svg>);
};

export const IconCode = ({ width = '20', height = '20', ...props }) => {
  return (
    <svg className="icon icon-code" xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 32 32" aria-labelledby="title" {...props} >
      <title id="title">Code</title>
      <path d="M18 23l3 3 10-10-10-10-3 3 7 7z"></path>
      <path d="M14 9l-3-3-10 10 10 10 3-3-7-7z"></path>
    </svg>);
};

export const IconSuperscript = ({ width = '20', height = '20', ...props }) => {
  return (
    <svg className="icon icon-superscript" xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 32 32" aria-labelledby="title" {...props} >
      <title id="title">Superscript</title>
      <path d="M24 6.438v1.563h4v2h-6v-4.563l4-1.875v-1.563h-4v-2h6v4.563zM21.125 8h-4.25l-5.875 5.875-5.875-5.875h-4.25l8 8-8 8h4.25l5.875-5.875 5.875 5.875h4.25l-8-8z"></path>
    </svg>);
};

export const IconSubscript = ({ width = '20', height = '20', ...props }) => {
  return (
    <svg className="icon icon-superscript" xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 32 32" aria-labelledby="title" {...props} >
      <title id="title">Subscript</title>
      <path d="M24 28.438v1.563h4v2h-6v-4.563l4-1.875v-1.563h-4v-2h6v4.563zM21.125 8h-4.25l-5.875 5.875-5.875-5.875h-4.25l8 8-8 8h4.25l5.875-5.875 5.875 5.875h4.25l-8-8z"></path>
    </svg>);
};

export const IconClearFormatting = ({ width = '20', height = '20', ...props }) => {
  return (
    <svg className="icon icon-clear-formatting" xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 32 32" aria-labelledby="title" {...props} >
      <title id="title">Clear Formatting</title>
      <path d="M0 28h18v4h-18zM28 4h-9.455l-5.743 22h-4.134l5.743-22h-8.411v-4h22zM29.055 32l-4.055-4.055-4.055 4.055-1.945-1.945 4.055-4.055-4.055-4.055 1.945-1.945 4.055 4.055 4.055-4.055 1.945 1.945-4.055 4.055 4.055 4.055z"></path>
    </svg>);
};