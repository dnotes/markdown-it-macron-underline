![build](https://travis-ci.org/dnotes/markdown-it-macron-underline.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/dnotes/markdown-it-macron-underline/badge.svg?branch=master)](https://coveralls.io/github/dnotes/markdown-it-macron-underline?branch=master)

# Combining Macrons to Underlines

Unicode combining macrons are a good choice in cases where characters require an underline for meaning, as in some systems of transliteration from Persian and Arabic. However, they aren't well supported for display on the internet. This markdown-it plugin will display these as regular underlined text, so that `S͟hayk͟h` is rendered as `<u>Sh</u>ay<u>kh</u>`.

## Installation

`yarn add markdown-it-macron-underline`

## Usage

``` javascript
let md = require('markdown-it')()
  .use('markdown-it-macron-underline')
md.render('S͟hayk͟h')
```
