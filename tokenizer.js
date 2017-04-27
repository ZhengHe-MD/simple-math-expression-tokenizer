// @flow

class Token {
  type: string;
  value: string;

  constructor(type: string, value: string) {
    this.type = type;
    this.value = value;
  }

  equal(token: Token): boolean {
    return this.type === token.type && this.value === token.value;
  }
}

const isDigit = (ch: string): boolean => /\d/.test(ch);
const isLetter = (ch: string): boolean => /[a-z]/i.test(ch);
const isOperator = (ch: string): boolean => /\+|-|\*|\/|\^/.test(ch);
const isLeftParenthesis = (ch: string): boolean => /\(/.test(ch);
const isRightParenthesis = (ch: string): boolean => /\)/.test(ch);
const isDecimalPoint = (ch: string): boolean => ch === ".";

function tokenize(expr: string): Array<Token> {
  // loop through the array
  // switch (ch type)
  //   digit => push ch to NB
  //   decimal point => push ch to NB
  //   letter => join NB contents as one Literal and push to result, then push ch to LB
  //   operator => join NB contents as one Literal and push to result OR push LB contents separately as Variables, then push ch to result
  //   LP => join LB contents as one Function and push to result OR (join NB contents as one Literal and push to result, push Operator * to result), then push ch to result
  //   RP => join NB contents as one Literal and push to result OR push LB contents separately as Variables, then push ch to result
  // loop end
  // join NB contents as one Literal and push to result OR push LB contents separately as Variables

  const chArr = expr.replace(/\s+/g, "").split("");

  const result: Array<Token> = [];
  let letterBuffer: Array<string> = [];
  let numberBuffer: Array<string> = [];

  function emptyNumberBufferAsLiteral() {
    result.push(new Token("Literal", numberBuffer.join("")));
    numberBuffer = [];
  }

  function emptyLetterBufferAsVariables() {
    const l = letterBuffer.length;
    for (let i = 0; i < l; i++) {
      result.push(new Token("Variable", letterBuffer[i]));
      if (i < l - 1) {
        result.push(new Token("Operator", "*"));
      }
    }
    letterBuffer = [];
  }

  chArr.forEach((ch, idx) => {
    if (isDigit(ch)) {
      numberBuffer.push(ch);
    } else if (isDecimalPoint(ch)) {
      numberBuffer.push(ch);
    } else if (isLetter(ch)) {
      if (numberBuffer.length) {
        emptyNumberBufferAsLiteral();
        result.push(new Token("Operator", "*"));
      }
      letterBuffer.push(ch);
    } else if (isOperator(ch)) {
      if (numberBuffer.length) {
        emptyNumberBufferAsLiteral();
      }
      if (letterBuffer.length) {
        emptyLetterBufferAsVariables();
      }
      result.push(new Token("Operator", ch));
    } else if (isLeftParenthesis(ch)) {
      if (letterBuffer.length) {
        result.push(new Token("Function", letterBuffer.join("")));
        letterBuffer = [];
      } else if (numberBuffer.length) {
        emptyNumberBufferAsLiteral();
        result.push(new Token("Operator", "*"));
      }
      result.push(new Token("Left Parenthesis", ch));
    } else if (isRightParenthesis(ch)) {
      if (letterBuffer.length) {
        emptyLetterBufferAsVariables();
      } else if (numberBuffer.length) {
        emptyNumberBufferAsLiteral();
      }
      result.push(new Token("Right Parenthesis", ch));
    }
  });

  if (numberBuffer.length) {
    emptyNumberBufferAsLiteral();
  }
  if (letterBuffer.length) {
    emptyLetterBufferAsVariables();
  }

  return result;
}

module.exports = {
  Token,
  tokenize,

  isDigit,
  isLetter,
  isOperator,
  isLeftParenthesis,
  isRightParenthesis
};
