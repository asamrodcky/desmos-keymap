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
};

const toggleExpressionList = $('#toggleExpression').on('click',()=>{
    event.preventDefault();
    boolExp = calculator.settings.expressions;

    calculator.updateSettings({
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
});

const clearAction = $('#setBlank').on('click',()=>{
    event.preventDefault();
    calculator.setBlank();
    $('#desmosURL').val("");
});

// Add event listener on keydown
document.addEventListener('keydown', (event) => {
let letter = event.key;
let code = event.which;

calculator.setExpression({
    "id": 'mostRecentPress',
    "latex": `m_{ostRecentPress}=${code}`,
})
}, false);