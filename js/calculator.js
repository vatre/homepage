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
  
  function intCompare(a, b) {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  }
  
  function sameLevelCompute(tokens) {
    console.log("Sub computation bitch");
    console.log("Sequence computed : ");
    console.log(tokens);
    var result = parseInt(tokens[0]);
    console.log("Initialized result : " + result);
    for (var j = 1; j < tokens.length; j += 2) {
      console.log("J : " + j);
      switch (tokens[j]) {
        case "*":
          result *= parseInt(tokens[j + 1]);
          break;
        case "/":
          result /= parseInt(tokens[j + 1]);
          break;
        case "+":
          result += parseInt(tokens[j + 1]);
          break;
        case "-":
          result -= parseInt(tokens[j + 1]);
          break;
        default:
          throw "Unknown operator encountered druing sub-computation.";
      }
      console.log("Temp result : " + result);
    }
    console.log("Result : " + result);
    return result;
  }
  
  // Assumes that tokens is a valid token list created by the lexer function which whecks validity.
  function compute(tokens) {
    if (tokens.length === 0) {
      throw "Empty tokens list";
    }
    if (tokens.length === 1) {
      return parseInt(tokens[0]);
    }
    
    var result = 0;
    
    // Get all priority levels to compute in the good order
    var priorityLevels = [];
    for (var i = 0; i < tokens.length; i++) {
      if (tokens[i] in priorities && priorityLevels.indexOf(priorities[tokens[i]]) == -1) {
        priorityLevels.push(priorities[tokens[i]]);
      }
    }
    priorityLevels = priorityLevels.sort();
    
    // On traite les levels un par un en remplaçant comme il faut
    var tempRes;
    var sequenceBeginning = -1;
    var lastSequenceEnd = 0;
    var len = priorityLevels.length;
    for (i = 0; i < len; i++) {
      console.log("Hello ?");
      var bufferArray = [];
      var priority = priorityLevels[len - i - 1];
      console.log("Current priority : " + priority);
      for (var j = 1; j < tokens.length; j += 2) {
        console.log("j : " + j);
        console.log("Token : " + tokens[j]);
        if (tokens[j] in priorities && priorities[tokens[j]] == priority) {
          console.log("Token de bonne priorité");
          if (sequenceBeginning == -1) {
            console.log("Début de séquence");
            sequenceBeginning = j - 1;
          }
        } else {
          console.log("Token de mauvaise priorité");
          if (sequenceBeginning != -1) { // On a une séquence à calculer
            console.log("Fin de séquence");
            bufferArray = bufferArray.concat(tokens.slice(lastSequenceEnd, sequenceBeginning));
            tempRes = sameLevelCompute(tokens.slice(sequenceBeginning, j));
            result += tempRes;
            bufferArray.push(tempRes.toString());
            sequenceBeginning = -1;
            lastSequenceEnd = j;
          }
        }
      }
      if (sequenceBeginning != -1) { // Cas où on a une seq en fin de liste
        console.log("Séquence en fin de liste");
        tempRes = sameLevelCompute(tokens.slice(sequenceBeginning, j));
        result += tempRes;
        bufferArray.push(tempRes.toString());
      } else {
        bufferArray = bufferArray.concat(tokens.slice(lastSequenceEnd, tokens.length));
      }
      console.log("New token list : " + bufferArray);
      tokens = bufferArray;
      if (len - i - 1 !== 0) {
        result = 0;
      }
    }
    
    return result;
  }
  
  var tokens = lexer("58  * 12 + 14 * 3");
  
  console.log("Tokens : ");
  console.log(tokens);
  console.log(compute(tokens));

});