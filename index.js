var elt = document.getElementById('calculator');
var calc = Desmos.GraphingCalculator(elt);
calc.updateSettings({
    "keypad" : false,
    "pasteGraphLink" : true,
    "zoomButtons": false,
    "trace": false,
    "border": true,
    "lockViewport": true,
    "expressions": false,
    "projectorMode": true,
    "settingsMenu": false,
    "showGrid": true
});

const setSquareBounds = ()=>{
    calc.setMathBounds({
        left: -10,
        right: 10,
        bottom: -10,
        top: 10
    });
}

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

const wasdExample = $('#wasdExample').on('click',()=>{
    event.preventDefault();
    let desmosURL = 'hd1jx9iru2';
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
    setSquareBounds();

    $('#desmosURL').val("");

    $('#graphDescription').text("This is a basic example of moving a point using the keys WASD.")
});

const dinoExample = $('#dinoExample').on('click',()=>{
    event.preventDefault();
    let desmosURL = 'f1zrxsdnmt';
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
    setSquareBounds();

    $('#desmosURL').val("");

    $('#graphDescription').text("This is a more fun example of the dinosaur scroll game. Click spacebar to jump.")
});

const clearAction = $('#setBlank').on('click',()=>{
    event.preventDefault();
    calc.setBlank();
    setSquareBounds();
    $('#desmosURL').val("");
    $('#graphDescription').empty()
});

$(document).delegate(':not(input)', 'keydown', function(event) {
    let letter = event.key;
    let code = event.which;

    calc.setExpression({
        "id": 'mostRecentPress',
        "latex": `m_{ostRecentPress}=${code}`,
    });

    if(code == 32){
        letter = "space"
    }

    $('#keySelected').text(letter.toUpperCase());
});

$(document).delegate(':not(input)', 'keyup', function(event) {
    let letter = event.key;
    let code = event.which;

    calc.setExpression({
        "id": 'mostRecentPress',
        "latex": `m_{ostRecentPress}=0`,
    });

    $('#keySelected').text("");
});

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))