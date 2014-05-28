var inputText = "Four score and seven years ago, our fathers brought forth on this continent a new nation: conceived in liberty, and dedicated to the proposition that all men are created equal.Now we are engaged in a great civil war. . .testing whether that nation, or any nation so conceived and so dedicated. . . can long endure. We are met on a great battlefield of that war. We have come to dedicate a portion of that field as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this. But, in a larger sense, we cannot dedicate. . .we cannot consecrate. . . we cannot hallow this ground. The brave men, living and dead, who struggled here have consecrated it, far above our poor power to add or detract. The world will little note, nor long remember, what we say here, but it can never forget what they did here. It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us. . .that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion. . . that we here highly resolve that these dead shall not have died in vain. . . that this nation, under God, shall have a new birth of freedom. . . and that government of the people. . .by the people. . .for the people. . . shall not perish from the earth. ",
 markov = new Markov({
                          inputText: inputText
                          });


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
      newDiv = document.createElement('div');
      newText = document.createTextNode(text);
      newDiv.appendChild(newText);
      newDiv.style.display = 'none';

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
