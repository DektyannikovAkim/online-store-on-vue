/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/preloader.js":
/*!********************************!*\
  !*** ./public/js/preloader.js ***!
  \********************************/
/***/ (() => {

eval("\r\n\r\nfunction loader() {\r\n    document.body.classList.add('loaded_hiding');\r\n    window.setTimeout(function() {\r\n        document.querySelector('.preloader').style.display = \"none\";\r\n        document.body.classList.remove('loaded_hiding');\r\n    }, 500);\r\n}\r\n\r\nwindow.addEventListener('load', function() {\r\n    loader();\r\n});\n\n//# sourceURL=webpack:///./public/js/preloader.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/js/preloader.js"]();
/******/ 	
/******/ })()
;