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
    "kelvin,celsius": (x) => { return kelvinToCelsius(x) },
    "kelvin,farenheit": (x) => { return celsiusToFarenheit(kelvinToCelsius(x)) },
    "celsius,kelvin": (x) => { return celsiusToKelvin(x) },
    "celsius,farenheit": (x) => { return celsiusToFarenheit(x) },
    "farenheit,kelvin": (x) => { return celsiusToKelvin(farenheitToCelsius(x)) },
    "farenheit,celsius": (x) => { return farenheitToCelsius(x) }
};

function updateTemperature() {
    let v = parseFloat(document.getElementById(TEMPERATURE_FORM_ID).value);
    
    if (isNaN(v)) {
        return;
    }

    for (let measurement in Measurements) {
        measurement = measurement.toLowerCase();
        if (measurement === selectedMeasurement) {
            continue;
        } 

        console.log(measurement)
        console.log(ConversionsTo[selectedMeasurement + "," + measurement]())
    }

    console.log("-")
}

function onMeasurementChange() {
    // Clears the temperature form because the measurement unit changed.
    document.getElementById(TEMPERATURE_FORM_ID).value = "";

    selectedMeasurement = document.getElementById(MEASUREMENT_SELECT_ID).value;
}
