const fromText = document.querySelector('.from-text');
const toText = document.querySelector('.to-text');
const selectTag = document.querySelectorAll('select');
const exchangeIcon = document.querySelector('.exchange');
const translateBtn = document.querySelector('button');
const icons = document.querySelectorAll('.row i');

selectTag.forEach((tag,id) => {
    for (const country_code in countries) {
        //selecting by default  English to Hindi
        let selected;
        if (id == 0 && country_code == "en-GB") { 
            selected = "selected";
        } else if (id == 1 && country_code == "hi-IN") {
            selected = "selected";
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option); //adding options in the select tag.

    }
})

//Exchange the textarea and select tag
exchangeIcon.addEventListener('click', () => {
    let tempText = fromText.value;
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempLang;
})


translateBtn.addEventListener("click", () => {
    let text = fromText.value;
    translateFrom = selectTag[0].value; //getting fromSelect Tag value
    translateTo = selectTag[1].value;   //getting toSelect Tag value
    console.log(text, translateFrom, translateTo);
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        console.log(data);
        toText.value = data.responseData.translatedText;
    });
});


icons.forEach(icon => {
    icon.addEventListener('click', ({ target }) => {
        if (target.classList.contains("fa-copy")) {
            if (target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
            }
            else {
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            let utterance;
            if (target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            }
            else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    })
})





