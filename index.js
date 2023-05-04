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
        })



        let initialStateURL = "https://saved-work.desmos.com/calc-states/production/fwkrdpxkju"
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
        initialStateCall()

        var setGraph = document.getElementById('submitButton').onclick = ()=>{
            event.preventDefault();
            let desmosURL = document.getElementById('desmosURL').value;

            initialStateURL = `https://saved-work.desmos.com/calc-states/production/${desmosURL}`
            initialStateCall = async () => await fetch(initialStateURL)
                .then( (response) => response.json())
                .then( (responseJson) => {
                initialState = responseJson
                console.log("setting calc state!")
                calculator.setState(initialState)
                })
            initialStateCall()
        }

        var clearAction = document.getElementById('setBlank').onclick = ()=>{
            event.preventDefault();
            calculator.setBlank();
            console.log("hi im Paul")
        }

        // Add event listener on keydown
        document.addEventListener('keydown', (event) => {
        var letter = event.key;
        var code = event.which;

        console.log(code);

        calculator.setExpression({
            "id": 'mostRecentPress',
            "latex": `m_{ostRecentPress}=${code}`,
        })
        }, false);