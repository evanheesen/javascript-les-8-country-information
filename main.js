let name = "";
let nameCountry = "";
let flagImage = document.getElementById("flag-country");

// verbergen landeninfo
document.getElementsByClassName("country")[0].style.visibility="hidden";

async function getCountryInfo(event) {
    try {
        name = document.getElementById("inputField").value;
        const result = await
            axios.get(`https://restcountries.eu/rest/v2/name/${name}`);
        console.log(result);
        const countryName = result.data[0].name
        const subareaName = result.data[0].subregion
        const populationAmount = result.data[0].population
        const capitalCity = result.data[0].capital
        const countryShortDescription = `${countryName} is situated in ${subareaName}. It has a population of ${populationAmount} people`
        console.log(countryShortDescription)

        // verbergen not found tekst
        document.getElementsByClassName("not-found-message")[0].style.visibility="hidden";

        // zichtbaar maken landeninfo
        document.getElementsByClassName("country")[0].style.visibility="visible";

        // leegmaken inputveld na elke zoekopdracht
        document.getElementById('inputField').value = "";

        // valuta checken
        let currencyString = ""
        if (result.data[0].currencies.length === 1) {
            currencyString = ` and you can pay with ${result.data[0].currencies[0].name}'s`
        } else {
            currencyString = ` and you can pay with ${result.data[0].currencies[0].name}'s and ${result.data[0].currencies[1].name}'s`
        }

        // capital string + valuta loggen
        const capitalCurrency = `The capital is ${capitalCity} ${currencyString}.`
        console.log(capitalCurrency)

        const countryDescription = `${countryShortDescription} ${capitalCurrency}`

        // talen checken
        let languageString = "They speak ";
        const languageObjects = result.data[0].languages;
        for (const object of languageObjects) {
            const language = object.name
            switch (languageObjects.indexOf(object)) {
                case (languageObjects.length - 1):
                    languageString += language + "."
                    break
                case (languageObjects.length - 2):
                    languageString += language + " and "
                    break
                default:
                    languageString += language + ", "
            }
        }

        // vlag toevoegen
        const imageUrl = result.data[0].flag
        flagImage.style.display = "block";
        flagImage.setAttribute("src", imageUrl);


        // naam land toevoegen
        nameCountry = document.getElementById("name-country")
        nameCountry.textContent = countryName

        // beschrijving toevoegen
        const description = document.getElementById("descriptionCountry")
        description.textContent = countryDescription

        // talen toevoegen
        const languages = document.getElementById("languages-text")
        languages.textContent = languageString

    } catch
        (error) {
        console.error(error);

        // verbergen landeninfo
        document.getElementsByClassName("country")[0].style.visibility="hidden";

        // foutmelding land niet gevonden
        document.getElementsByClassName("not-found-message")[0].style.visibility="visible";
        const errorNotFound = document.getElementById("not-found")
        errorNotFound.textContent = `The country "${name}" you were looking for was not found. Please make sure you enter the English name of the country.`;

        // leegmaken inputveld na elke zoekopdracht
        document.getElementById('inputField').value = "";
    }

}

// event aanmaken input field
const input = document.getElementById("inputField");
input.addEventListener("search", (event) => {
    getCountryInfo(event)
})

// event aanmaken Search button
const button = document.getElementById("search-button");
button.addEventListener("click", (event) => {
    getCountryInfo(event)
})



