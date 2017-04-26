function Token(type, value) {
  this.type = type;
  this.value = value;
}

Token.prototype.equal = function(token) {
  return this.type === token.type && this.value === token.value;
};

const isDigit = ch => /\d/.test(ch);
const isLetter = ch => /[a-z]/i.test(ch);
const isOperator = ch => /\+|-|\*|\/|\^/.test(ch);
const isLeftParenthesis = ch => /\(/.test(ch);
const isRightParenthesis = ch => /\)/.test(ch);

module.exports = {
  Token,
  isDigit,
  isLetter,
  isOperator,
  isLeftParenthesis,
  isRightParenthesis
};
