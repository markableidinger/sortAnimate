var deck = [];
var solved = [];
var started = false;
var interval;
var moves = 0;
var tries = 1;

function createDeck(list){
  for (i = 1; i <= 52; i++){
    list[i - 1] = i;
  }
}

createDeck(deck);
createDeck(solved);

function shuffle(array){
  m = array.length;
  while (m > 0) {
    rand = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[rand];
    array[rand] = t;
  }
  return array;
}

function displayDeck(){
  $('.container .card-container').html('');
  for(var i = 0; i < deck.length; i++){
    $('.container .card-container').append('<img src="cardPictures/' + deck[i] + '.gif" id="' + deck[i] + '" value="' + i + '" class="card">');
  }
}
shuffle(deck);
displayDeck();

function bogo(){
  if(deck == solved){
    window.clearInterval(interval);
    alert('DONE!');
  }
  else{
    shuffle(deck);
    displayDeck();
    $('#tries').text('Bogo Tries: '+tries++)
  }
}

function swap(a, b){
  $('.card-container img:nth-child(' + a + ')').fadeOut(1);
  $('.card-container img:nth-child(' + b + ')').fadeOut(1, function(){
    $('.card-container img:nth-child(' + a + ')').after($('.card-container img:nth-child(' + b + ')'));
  })
  $('.card-container img:nth-child(' + a + ')').fadeIn(1);
  $('.card-container img:nth-child(' + b + ')').fadeIn(1);
}

function insertion(){
  moves = 0;
  for (pivot = 2; pivot <= 52; pivot++){
    change = 0;
      while(parseInt($('.card-container img:nth-child(' + (pivot - change) + ')').attr('id')) < parseInt($('.card-container img:nth-child(' + (pivot - change - 1) + ')'
        ).attr('id'))){
          swap(pivot - change, pivot-change-1);
          change++;
          moves++;
          $('#moves').html('Moves: ' + moves);
        }
      }
    }

$('#bogo').click(function(){
  if(started){
    window.clearInterval(interval);
    $(this).text('BOGO');
    started = false;
  }
  else{
    started = true;
    interval = window.setInterval(function(){bogo()}, 40);
    $(this).text('STOP');
}
});

$('#insertion').click(function(){
  if(started){
    window.clearInterval(interval);
    $(this).text('INSERTION');
    started = false;
  }
  else{
    started = true;
    insertion();
  }
});
