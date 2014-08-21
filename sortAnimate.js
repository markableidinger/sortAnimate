var deck=[]
var solved=[]
var started=false
var interval
var tries=0

function createDeck(list){
  for (i=1; i<=52; i++){
    list[i-1]=i
  }
}

createDeck(deck)
createDeck(solved)

function shuffle(array){
  m=array.length;
  while (m>0) {
    rand = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[rand];
    array[rand] = t;
  }
  return array;
}

function displayDeck(){
  $('.container .card-container').html('')
  for(var i=0; i<deck.length; i++){
    $('.container .card-container').append('<img src="cardPictures/'+deck[i]+'.gif" id="'+deck[i]+'" class="card">')
  }
}
shuffle(deck)
displayDeck()

function bogo(){
  if(deck==solved){
    window.clearInterval(interval);
    alert('DONE!')
  }
  else{
    shuffle(deck)
    displayDeck()
    $('#tries').html('Tries: '+tries++)
  }
}

function insertion(){
  for(pivot=0; pivot<deck.length; pivot++){
    setTimeout(function(){
    v=deck[pivot]
    for(j=pivot-1; j>=0 && deck[j] > v; j--){
      $('#'+deck[j+1]).after($('#'+deck[j]))
      deck[j+1]=deck[j]
      deck[j]=v
      console.log(deck)
    deck[j+1]=v
    }, 1000)
  }
}

$('#bogo').click(function(){
  if(started){
    window.clearInterval(interval);
    $(this).text('BOGO')
    started = false
  }
  else{
    started = true
    interval = window.setInterval(function(){bogo()}, 40)
    $(this).text('STOP')
}
});

$('#insertion').click(function(){
  if(started){
    window.clearInterval(interval);
    $(this).text('INSERTION')
    started = false
  }
  else{
    started = true
    insertion()
  }
});
