const test = require("tape");
const {
  Token,
  isDigit,
  isLetter,
  isOperator,
  isLeftParenthesis,
  isRightParenthesis
} = require("./tokenizer");

test("Token object should have type and value", t => {
  t.plan(2);
  const token = new Token("Literal", "1");
  t.equal(token.type, "Literal");
  t.equal(token.value, "1");
});

test("token object is equal to another token when type and value are both equal", t => {
  t.plan(2);
  const token1 = new Token("Literal", "1");
  const token2 = new Token("Literal", "1");
  const token3 = new Token("Variable", "x");
  t.ok(token1.equal(token2));
  t.false(token1.equal(token3));
});

test("isDigit should detect character representing digit", t => {
  t.plan(3);
  t.true(isDigit("1"));
  t.false(isDigit("a"));
  t.false(isDigit("+"));
});

test("isLetter should detect character representing letter", t => {
  t.plan(5);
  t.true(isLetter("a"));
  t.true(isLetter("A"));
  t.true(isLetter("Z"));
  t.false(isLetter("1"));
  t.false(isLetter("+"));
});

test("isOperator should detect character representing operator", t => {
  t.plan(5);
  t.true(isOperator("+"));
  t.true(isOperator("-"));
  t.true(isOperator("*"));
  t.true(isOperator("/"));
  t.true(isOperator("^"));
});

test("isLeftParenthesis should detect character representing left parenthesis", t => {
  t.plan(2);
  t.true(isLeftParenthesis("("));
  t.false(isLeftParenthesis(")"));
});

test("isRightParenthesis should detect character representing right parenthesis", t => {
  t.plan(2);
  t.true(isRightParenthesis(")"));
  t.false(isRightParenthesis("("));
});
