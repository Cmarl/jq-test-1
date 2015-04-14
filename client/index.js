'use strict';

$(document).ready(init);

var threes = [];
var evens = [];
var others = [];

function init(){
  $('button').click(getNumbers);
  $('#evens').on('click','.even',squareIt);
}

function squareIt(){
  var current = (parseFloat($(this).text()));
  $(this).text(Math.pow(current));
}

function getNumbers(){
  $.getJSON('https://qrng.anu.edu.au/API/jsonI.php?length=20&type=uint8',function(response){
    sortData(response);
  });
}

function sortData(response){
  var remaining = [];
  var $numbers = response.data;

  $numbers.forEach(function(number){
    if (number % 2 === 0){evens.push(number);}
    else {remaining.push(number);}
  });
  remaining.forEach(function(odd){
    if (odd % 3 === 0){
      threes.push(odd);
    }
    else {others.push(odd);}
  });
  displayNumbers();
}

function displayNumbers(){

  evens.forEach(function(even){
    var $even = $('<div>');
    $even.text(even);
    $even.addClass('even');
    $('#evens').append($even);
  });

  $('#threes').text(threes.join(','));
  $('#others').text(others.join(','));
}
