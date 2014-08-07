var randomWiki,
    markov;

window.onload = function () {
  getWiki();
};
  
//listen for a URL change
window.onhashchange = function () {
  getWiki()
};



function getWiki () {
  $.getJSON("https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&exchars=500&format=json", 
      function(data) {
        var obj = data.query.pages;
        
        var pageTitle = getTitle(obj);
        
        $.getJSON('https://en.wikipedia.org/w/api.php?action=parse&page='+ pageTitle +'&format=json&prop=text&section=0', 
          function(data){

            var obj = data.parse.text;
            var regex = /(<([^>]+)>)/ig;
            var page = Object.keys(obj);
            var text = obj[page[0]];
            randomWiki = text.replace(regex, '');
            console.log(randomWiki)

            markov = new Markov({
              inputText: randomWiki
            });
            
            stega();
          });


      }
  ).fail(function() {
        console.log( "error" );
  });
}

function getTitle(obj) {
  for( prop in obj ) {
    var value = obj[prop];
    return value.title;
  } 
}

//inserts dummy text into email body, effectively hiding your own words in a sea of gibberish
function stega () {
  var composeBool = /\?compose\=|&compse\=/i.test(location.href);
     
  if ( composeBool ) {
    var messageBox = getElementByAttrName('aria-label', 'Message Body');

    messageBox.onfocus = function(){
     
      window.onkeydown = function () {
        if (event.keyCode == 13) {
          addGibberish(messageBox);
        }   
      }
      
      addGibberish(messageBox);

    };
  }
};

function addGibberish (element) {
      text = markov.generate(100);
      
      newDiv = document.createElement('div');
      newText = document.createTextNode(text);
      newDiv.appendChild(newText);
      newDiv.style.maxHeight = '0px';
      newDiv.style.overflow = 'hidden';
      element.appendChild(newDiv); 
}

//Gets an element that has an attribute and matching value
//Gmail dynamically changes element ID's so I'm getting the div by its aria-label. 
function getElementByAttrName (attribute, name) {
  //there's also a textarea that fits the selector. A fallback for older browsers?
  var elementList =  document.querySelectorAll('div['+ attribute  +']');

  for (var i = 0, n = elementList.length; i < n; i++) {
    if (elementList[i].getAttribute(attribute) == name) {
       // Element exists with attribute. Add to array.
       return(elementList[i]);
    }
  }
}
