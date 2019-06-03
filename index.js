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
