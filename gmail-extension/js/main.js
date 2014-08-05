window.parseWiki = function (data) {
  console.log(data.query.pages);
}

function getWiki () {
  var script = document.createElement('script');
  script.src = "https://en.wikipedia.org/w/api.php?action=query&generator=random&prop=extracts&exchars=500&format=json&callback=parseWiki&requestid=" + Math.floor(Math.random()*999999).toString();
  script.type = "text/javascript";

  document.getElementsByTagName('head')[0].appendChild(script);
}

var randomWiki;

$.getJSON("https://en.wikipedia.org/w/api.php?action=query&generator=random&prop=extracts&exchars=500&format=json", 
    function(data) {
      var obj = data.query.pages;
      var page = Object.keys(obj);
      var pageTitle = obj[page[0].title];
      
      $.getJSON('https://en.wikipedia.org/w/api.php?action=parse&page='+ pageTitle +'&format=json&prop=text&section=0', 
        function(data){
        console.log(data);
        });

    }
).fail(function() {
      console.log( "error" );
        });

//markov = new Markov({
//  inputText: inputText
//});

window.onload = function () {
  stega()
};
  
//listen for a URL change
window.onhashchange = function () {
  stega()
};

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
