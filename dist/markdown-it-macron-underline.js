/*! markdown-it-macron-underline 1.0.0  @license MIT */(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.markdownItMacronUnderline = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict'

const exp = /([^\s\u035F\u0331](?:\u035F[^\s\u035F]|\u0331))/

function macronsToUnderline(state) {

  // Sort through all tokens
  for (let i = 0; i < state.tokens.length; i++) {
    if (state.tokens[i].type !== 'inline') {
      continue
    }
    // Get children of inline tokens
    let tokens = state.tokens[i].children

    // Search backwards through tokens
    for (let j = tokens.length - 1; j >= 0; j--) {
      let token = tokens[j]

      // Only alter text tokens with the characters
      if (token.type === 'text' && exp.test(token.content)) {

        // Split token into new tokens
        let newTokens = []
        token.content.split(exp).forEach((text) => {
          if (text.length) {
            let newToken = new state.Token('text', '', 0)
            if (exp.test(text)) {
              newToken.content = text.replace(/[\u035F\u0331]/, '')
              newTokens.push(new state.Token('macron_open', 'u', 1))
              newTokens.push(newToken)
              newTokens.push(new state.Token('macron_close', 'u', -1))
            }
            else {
              newToken.content = text
              newTokens.push(newToken)
            }
          }
        })
        state.tokens[i].children = tokens = [...tokens.slice(0, j), ...newTokens, ...tokens.slice(j + 1)]
      }
    }
  }
}

module.exports = (md) => {
  md.core.ruler.push('macrons', macronsToUnderline)
}

},{}]},{},[1])(1)
});
