// input
// resultados
// cor fundo

const TEMPERATURE_FORM_ID = "ftempinput";
const MEASUREMENT_SELECT_ID = "measurements";
const AMBIENT_TEMPERATURE_K = 298.15

const Measurements = {
    Celsius: "celsius",
    Farenheit: "farenheit",
    Kelvin: "kelvin",
};

let selectedMeasurement = Measurements.Celsius;

function kelvinToCelsius(k) {
    return k - 273.15;
}

function farenheitToCelsius(f) {
    return (f - 32.0) * 0.5556;
}

function celsiusToKelvin(c) {
    return c + 273.15;
}

function celsiusToFarenheit(c) {
    return c * 9.0 / 5.0 + 32.0;
}

const ConversionsTo = {
    "kelvin,celsius": (x) => kelvinToCelsius(x),
    "kelvin,farenheit": (x) => celsiusToFarenheit(kelvinToCelsius(x)),
    "celsius,kelvin": (x) => celsiusToKelvin(x),
    "celsius,farenheit": (x) => celsiusToFarenheit(x),
    "farenheit,kelvin": (x) => celsiusToKelvin(farenheitToCelsius(x)),
    "farenheit,celsius": (x) => farenheitToCelsius(x)
};

function updateTemperature() {
    let v = parseFloat(document.getElementById(TEMPERATURE_FORM_ID).value);
    
    if (isNaN(v)) {
        return;
    }

    let tempCelsius = NaN; // Armazena a temperatura em celsius para ser usada no fundo.
    let result = "";
    for (const measurementKey in Measurements) {
        let measurementName = measurementKey.toLowerCase();
        if (measurementName === selectedMeasurement) {
            continue;
        }

        let resultingTemperature = Math.round(ConversionsTo[selectedMeasurement + "," + measurementName](v));
        result += "Temperatura(" + measurementName + "): " + resultingTemperature + "<br>";

        if (measurementName === "celsius") {
            tempCelsius = resultingTemperature;
        }

        if (selectedMeasurement === "celsius") {
            tempCelsius = v;
        }
    }

    document.getElementById("uwu").innerHTML = result;

    // let heat = Math.round(Math.min(tempCelsius / 100.0 * 0xcc, 0xcc));
    // let cold = Math.round(Math.min((100.0 - tempCelsius) / 100.0 * 0xcc, 0xcc));
    const FULL_BLUE = 0.0;
    const FULL_RED = 100.0;
    let hotness = tempCelsius >= FULL_RED ? 1 : 1.0 - Math.abs(tempCelsius - FULL_RED) / 100.0;
    let coldness = tempCelsius <= FULL_BLUE ? 1 : 1.0 - Math.abs(tempCelsius - FULL_BLUE) / 100.0;
    
    if (hotness === 1) {
        coldness = 0;
    }

    if (coldness === 1) {
        hotness = 0;
    }

    
    let red = (Math.floor(0xff * hotness) << 16);
    let blue = Math.floor(0xff * coldness);
    let colorCode = "#" + (red | blue).toString(16);
    
    console.log(hotness);
    console.log(coldness);
    console.log(colorCode);

    document.querySelector("body").style.backgroundColor = colorCode;
    // console.log("#" + hotness.toString(16) + "00" + cold.toString(16) + "cc")
    // document.querySelector("body").style.backgroundColor = "#" + heatDist.toString(16) + "00" + cold.toString(16) + "cc";
}

function onMeasurementChange() {
    // Reseta o valor do formulário.
    document.getElementById(TEMPERATURE_FORM_ID).value = "0";

    selectedMeasurement = document.getElementById(MEASUREMENT_SELECT_ID).value;
    updateTemperature();
}
