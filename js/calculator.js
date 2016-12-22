$(document).ready(function() {

  // Niveau de priorité

  var priorities = {
    "(": 10,
    '*': 5,
    '/': 5,
    '+': 0,
    '-': 0
  };

  // The lexer takes the input and turns it into tokens
  function lexer(input) {
    input = input.replace(/ /g, "");

    var reg1 = /^[()0-9+*\-\/]+$/g;
    if (!reg1.test(input)) {
      throw "Invalid input for tokenization: unvalid character(s).";
    }

    var reg2 = /[\+\-\*\/]{2,}/;
    if (reg2.test(input)) {
      throw "Invalid input for tokenization: two consecutive operators.";
    }

    var output = [];
    var currentNumber = "";
    var rDigit = /^[0-9]$/;
    for (var i = 0; i < input.length; i++) {
      if (rDigit.test(input[i])) {
        currentNumber += input[i];
      } else {
        if (currentNumber.length > 0) {
          output.push(currentNumber);
          currentNumber = "";
        }
        output.push(input[i]);
      }
    }
    if (currentNumber.length > 0) {
      output.push(currentNumber);
    }
    return output;
  }

  //https://code.tutsplus.com/articles/data-structures-with-javascript-tree--cms-23393

  function Node(data) {
    var self = this;
    self.data = data;
    self.parent = null;
    self.leftChild = null;
    self.rightChild = null;

    self.addChild = function(node) {
      if (self.leftChild === null) {
        self.leftChild = node;
      } else if (self.rightChild === null) {
        self.rightChild = node;
      } else {
        throw "Tried to add a child to a node which already has two.";
      }
    }
  }

  function Tree(data) {
    var self = this;
    var node = new Node(data);
    self._root = node;

    self.traverseDF = function(callback) {
      (function recurse(currentNode) {

        if (currentNode.leftChild !== null) {
          recurse(currentNode.leftChild);
        }
        if (currentNode.rightChild !== null) {
          recurse(currentNode.rightChild);
        }

        callback(currentNode);

      })(self._root);
    }

    self.traverseBF = function(callback) {
      var queue = [self._root];

      while (queue.length > 0) {
        var newQueue = [];
        for (var i = 0; i < queue.length; i++) {
          if (queue[i].leftChild) {
            newQueue.push(queue[i].leftChild);
          }
          if (queue[i].rightChild) {
            newQueue.push(queue[i].rightChild);
          }
          callback(queue[i]);
        }
        queue = newQueue;
      }
    }

    self.contains = function(callback, traversal) {
      traversal = typeof traversal !== 'undefined' ? traversal : self.traverseDF;

      traversal.call(self, callback);
    }

    self.addChild = function(data, toData, traversal) {
      var child = new Node(data),
        parent = null,
        callback = function(node) {
          if (node.data === toData) {
            parent = node;
          }
        };

      this.contains(callback, traversal);

      if (parent === null) {
        throw "Error: you tried to add a child to a non-existend node";
      } else {
        parent.addChild(child);
        child.parent = parent;
      }
    }
    
    self.compute = function() {
      return (function aux(node) {
        if (! node.leftChild && ! node.rightChild) {
          return parseInt(node.data);
        } else if (! node.leftChild || ! node.rightChild) {
          throw "Error during computation: a node has one and only one child.";
        } else {
          var a = aux(node.leftChild),
              b = aux(node.rightChild),
              result;
          switch (node.data) {
            case "+":
              result = a + b;
              break;
            case "*":
              result = a * b;
              break;
            case "/":
              result = a / b;
              break;
            case "-":
              result = a - b;
              break;
            default:
              throw "Unknow operator";
          }
          return result;
        }
      })(self._root);
    }
    
    
    // à revoir
    self.isValidCalculationTree = function() {
      var rNode = /^[\+\-\*\/]{1}$/;

      (function aux(node) {

        if (node.leftChild && node.rightChild) { // Bien des enfants, on vérifie que c'est un opérateur

          if (!rNode.test(node.data)) {
            return false;
          } else {
            return aux(node.leftChild) && aux(node.rightChild);
          }

        } else if ((node.leftChild && !node.rightChild) || (!node.leftChild && node.rightChild)) {

          return false; // Un seul fils, pas possible car on a pas implémenté les fonctions

        } else { // Pas d'enfant, ça doit être un nombre

          return ! isNaN(node.data);

        }
      })(self._root);
    }
  }

  function auxTreeFromTokens(parent, tokens) {
    if (tokens.length === 0) { // Problem
      throw "Empty token list in auxTreeFromTokens";
    } else if (tokens.length === 1) { // Ending scenario, only a number remains
      if (isNaN(tokens[0])) {
        throw "Invalid expression in auxTreeFromTokens : leaf with operator.";
      } else {
        var leaf = new Node(tokens[0]);
        leaf.parent = parent;
        return leaf;
      }
    } else {
      var nodeIndex = null;
      for (var i = 0; i < tokens.length; i++) {
        if (nodeIndex === null) {
          if (tokens[i] in priorities) {
            nodeIndex = i;
          }
        } else if (tokens[i] in priorities && priorities[tokens[i]] < priorities[tokens[nodeIndex]]) {
          nodeIndex = i;
        }
      }
      var tree = new Tree(tokens[nodeIndex]);
      tree._root.parent = parent;
      tree._root.leftChild = auxTreeFromTokens(tree._root, tokens.slice(0, nodeIndex));
      tree._root.rightChild = auxTreeFromTokens(tree._root, tokens.slice(nodeIndex + 1, tokens.length));
      return tree._root;
    }
  }

  function treeFromTokens(tokens) {
    if (tokens.length === 0) {
      throw "Empty token list passed to treeFromTokens";
    } else if (tokens.length === 1) {
      return new Tree(tokens[0]);
    }

    var nodeIndex = null;
    for (var i = 0; i < tokens.length; i++) {
      if (nodeIndex === null) {
        if (tokens[i] in priorities) {
          nodeIndex = i;
        }
      } else if (tokens[i] in priorities && priorities[tokens[i]] < priorities[tokens[nodeIndex]]) {
        nodeIndex = i;
      }
    }
    var finalTree = new Tree(tokens[nodeIndex]);
    finalTree._root.leftChild = auxTreeFromTokens(finalTree._root, tokens.slice(0, nodeIndex));
    finalTree._root.rightChild = auxTreeFromTokens(finalTree._root, tokens.slice(nodeIndex + 1, tokens.length));
    return finalTree;
  }

  var tokens = lexer("10 + 5 * 9 * 11 + 13 + 27")
  console.log(tokens);
  var tree = treeFromTokens(tokens);
  console.log(tree);
  console.log(tree.compute());

});