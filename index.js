var elt = document.getElementById('calculator');
var calc = Desmos.GraphingCalculator(elt);
calc.updateSettings({
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
};

const toggleExpressionList = $('#toggleExpression').on('click',()=>{
    event.preventDefault();
    boolExp = calc.settings.expressions;

    calc.updateSettings({
        "expressions": !boolExp,
    })
});

const setGraph = $('#submitButton').on('click',()=>{
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
        calc.setState(initialState)
        })
        .then(()=>{
            calc.setExpression({
                "id": 'mostRecentPress',
                "latex": 'm_{ostRecentPress}=-1',
            })
        })
    initialStateCall();

    $('#desmosURL').val("");
});

const clearAction = $('#setBlank').on('click',()=>{
    event.preventDefault();
    calc.setBlank();
    $('#desmosURL').val("");
});

// Add event listener on keydown
document.addEventListener('keydown', (event) => {
let letter = event.key;
let code = event.which;

calc.setExpression({
    "id": 'mostRecentPress',
    "latex": `m_{ostRecentPress}=${code}`,
})
}, false);