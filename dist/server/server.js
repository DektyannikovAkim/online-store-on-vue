/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./server/cart.js":
/*!************************!*\
  !*** ./server/cart.js ***!
  \************************/
/***/ ((module) => {

eval("let add = (cart, req) => {\n    cart.contents.push(req.body);\n    return JSON.stringify(countGoods(cart), null, 4);\n};\n\nlet change = (cart, req) => {\n    let find = cart.contents.find(el => el.id_product === +req.params.id);\n    find.quantity += req.body.quantity;\n    return JSON.stringify(countGoods(cart), null, 4);\n};\n\nlet remove = (cart, req) => {\n    let find = cart.contents.find(el => el.id_product === +req.params.id);\n    if (find.quantity > 1) {\n        find.quantity -= 1;\n    } else {\n        cart.contents.splice(cart.contents.indexOf(find), 1);\n    }\n    return JSON.stringify(countGoods(cart), null, 4);\n};\n\nlet countGoods = (cart) => {\n    cart.amount = 0;\n    cart.countGoods = 0;\n    for (cartItem of cart.contents) {\n        cart.amount += cartItem.quantity;\n        cart.countGoods += cartItem.quantity * cartItem.price;\n    }\n    return cart;\n}\n\nmodule.exports = {\n    add,\n    change,\n    remove,\n    countGoods\n};\n\n//# sourceURL=webpack:///./server/cart.js?");

/***/ }),

/***/ "./server/cartRouter.js":
/*!******************************!*\
  !*** ./server/cartRouter.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst fs = __webpack_require__(/*! fs */ \"fs\");\nconst router = express.Router();\nconst handler = __webpack_require__(/*! ./handler */ \"./server/handler.js\");\nconst cart = __webpack_require__(/*! ./cart */ \"./server/cart.js\");\nconst actions = {\n    add: cart.add,\n    change: cart.change,\n    remove: cart.remove,\n    countGoods: cart.countGoods\n};\n\nrouter.get('/', (req, res) => {\n    fs.readFile('dist/server/db/userCart.json', 'utf-8', (err, data) => {\n        if (err) {\n            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));\n        } else {\n            data = JSON.stringify(actions.countGoods(JSON.parse(data)));\n            res.send(data);\n        }\n    })\n});\nrouter.post('/', (req, res) => {\n    handler(req, res, 'add', 'dist/server/db/userCart.json');\n});\nrouter.put('/:id', (req, res) => {\n    handler(req, res, 'change', 'dist/server/db/userCart.json');\n});\nrouter.delete('/:id', (req, res) => {\n    handler(req, res, 'remove', 'dist/server/db/userCart.json');\n});\n\nmodule.exports = router;\n\n//# sourceURL=webpack:///./server/cartRouter.js?");

/***/ }),

/***/ "./server/handler.js":
/*!***************************!*\
  !*** ./server/handler.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const cart = __webpack_require__(/*! ./cart */ \"./server/cart.js\");\nconst fs = __webpack_require__(/*! fs */ \"fs\");\n\nconst actions = {\n    add: cart.add,\n    change: cart.change,\n    remove: cart.remove\n};\n\nlet handler = (req, res, action, file) => {\n    fs.readFile(file, 'utf-8', (err, data) => {\n        if (err) {\n            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));\n        } else {\n            let newCart = actions[action](JSON.parse(data), req);\n            fs.writeFile(file, newCart, (err) => {\n                if (err) {\n                    res.sendStatus(404, JSON.stringify({ result: 0, text: err }));\n                } else {\n                    res.send(JSON.stringify(newCart))\n                }\n            })\n        }\n    })\n};\n\nmodule.exports = handler;\n\n//# sourceURL=webpack:///./server/handler.js?");

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst fs = __webpack_require__(/*! fs */ \"fs\");\nconst app = express();\nconst cart = __webpack_require__(/*! ./cartRouter */ \"./server/cartRouter.js\");\n\napp.use(express.json());\napp.use('/', express.static('dist/public'));\napp.use('/api/cart', cart);\n\napp.get('/api/products', (req, res) => {\n    fs.readFile('dist/server/db/products.json', 'utf-8', (err, data) => {\n        if (err) {\n            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));\n        } else {\n            res.send(JSON.parse(data));\n        }\n    })\n});\n\nconst port = process.env.PORT || 3000;\napp.listen(port, () => console.log(`Listen on port ${port}...`));\n\n//# sourceURL=webpack:///./server/server.js?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./server/server.js");
/******/ 	
/******/ })()
;