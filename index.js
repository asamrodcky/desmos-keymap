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

        // Add event listener on keydown
        document.addEventListener('keydown', (event) => {
        var letter = event.key;
        var code = event.which;

        console.log(code);

        calculator.setExpression({
            "id": 'mostRecentPress',
            "latex": `m_{ostRecentPress}=${code}`,
        })

    //     switch (letter) {
    //     case "d":
    //     calculator.setExpression({
    //             "id": 'mostRecentPress',
    //             "latex": 'm_{ostRecentPress}=1',
    //         })
    //         break;
    //     case "s":
    //     calculator.setExpression({
    //             "id": 'mostRecentPress',
    //             "latex": 'm_{ostRecentPress}=2',
    //         })
    //         break;
    //     case "a":
    //     calculator.setExpression({
    //             "id": 'mostRecentPress',
    //             "latex": 'm_{ostRecentPress}=3',
    //         })
    //         break;
    //     case "w":
    //     calculator.setExpression({
    //             "id": 'mostRecentPress',
    //             "latex": 'm_{ostRecentPress}=4',
    //         })
    //         break;
    // }

        }, false);