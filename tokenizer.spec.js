const test = require("tape");
const {
  Token,
  tokenize,

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

test("2 + 3", t => {
  t.plan(3);
  const tokens = tokenize("2 + 3");
  t.true(tokens[0].equal(new Token("Literal", "2")));
  t.true(tokens[1].equal(new Token("Operator", "+")));
  t.true(tokens[2].equal(new Token("Literal", "3")));
});

test("4a + 1", t => {
  t.plan(5);
  const tokens = tokenize("4a + 1");
  console.log(tokens);
  t.true(tokens[0].equal(new Token("Literal", "4")));
  t.true(tokens[1].equal(new Token("Literal", "*")));
  t.true(tokens[2].equal(new Token("Variable", "a")));
  t.true(tokens[3].equal(new Token("Operator", "+")));
  t.true(tokens[4].equal(new Token("Literal", "1")));
});

test("456.7xy + 6sin(7.04x)", t => {
  t.plan(14);
  const tokens = tokenize("456.7xy + 6sin(7.04x)");
  t.true(tokens[0].equal(new Token("Literal", "456.7")));
  t.true(tokens[1].equal(new Token("Operator", "*")));
  t.true(tokens[2].equal(new Token("Variable", "x")));
  t.true(tokens[3].equal(new Token("Operator", "*")));
  t.true(tokens[4].equal(new Token("Variable", "y")));
  t.true(tokens[5].equal(new Token("Operator", "+")));
  t.true(tokens[6].equal(new Token("Literal", "6")));
  t.true(tokens[7].equal(new Token("Operator", "*")));
  t.true(tokens[8].equal(new Token("Function", "sin")));
  t.true(tokens[9].equal(new Token("Left Parenthesis", "(")));
  t.true(tokens[10].equal(new Token("Literal", "7.04")));
  t.true(tokens[11].equal(new Token("Operator", "*")));
  t.true(tokens[12].equal(new Token("Variable", "x")));
  t.true(tokens[13].equal(new Token("Right Parenthesis", ")")));
});
