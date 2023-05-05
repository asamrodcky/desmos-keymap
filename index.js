var elt = document.getElementById('calculator');
var calculator = Desmos.GraphingCalculator(elt);
calculator.updateSettings({
    "keypad" : false,
    "pasteGraphLink" : true,
    "zoomButtons": false,
    "trace": false,
    "border": true,
    "lockViewport": true,
    "expressions": true,
    "projectorMode": true,
    "settingsMenu": false,
    "showGrid": true
});

const isValidUrl = urlString =>{
    var inputElement = document.createElement('input');
    inputElement.type = 'url';
    inputElement.value = urlString;

    if (!inputElement.checkValidity()) {
      return false;
    } else {
      return true;
    }
  } 

var setGraph = document.getElementById('submitButton').onclick = ()=>{
    event.preventDefault();
    let inputFieldValue = $('#desmosURL').val();
    let desmosURL = '';

    if(isValidUrl(inputFieldValue)){
        let inputToURL = new URL(`${inputFieldValue}`);
        desmosURL = inputToURL.pathname.split('/')[2];
    }
    else{
        desmosURL = inputFieldValue;
    }

    initialStateURL = `https://saved-work.desmos.com/calc-states/production/${desmosURL}`
    initialStateCall = async () => await fetch(initialStateURL)
        .then( (response) => response.json())
        .then( (responseJson) => {
        initialState = responseJson
        console.log("setting calc state!")
        calculator.setState(initialState)
        })
        .then(()=>{
            calculator.setExpression({
                "id": 'mostRecentPress',
                "latex": 'm_{ostRecentPress}=-1',
            })
        })
    initialStateCall();

    $('#desmosURL').val("");
}

var clearAction = document.getElementById('setBlank').onclick = ()=>{
    event.preventDefault();
    calculator.setBlank();
    $('#desmosURL').val("");
}

// Add event listener on keydown
document.addEventListener('keydown', (event) => {
var letter = event.key;
var code = event.which;

calculator.setExpression({
    "id": 'mostRecentPress',
    "latex": `m_{ostRecentPress}=${code}`,
})
}, false);