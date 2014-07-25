function parseWiki(data) {
  console.log(data.query.pages);
}

var script = document.createElement('script');
script.src = "https://en.wikipedia.org/w/api.php?action=query&generator=random&prop=extracts&exchars=500&format=json&callback=parseWiki";
script.type = "text/javascript";

document.getElementsByTagName('head')[0].appendChild(script);


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
