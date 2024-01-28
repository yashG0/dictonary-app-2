const getData = async (word) => {
    // Constructing the URL for the dictionary API

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;



    try {
        // Using the Fetch API to make an asynchronous request to the API
        const res = await fetch(url);

        // Parsing the response as JSON
        const data = await res.json();

        // Checking if the response is not okay (status code other than 200)
        if (!res.ok) {
            console.error('Error fetching data:', data);
        }

        // Logging the data to html
        // console.log(data);

        displayWord.innerText = data[0].word

        data[0].phonetics.forEach(ele => {
            if (ele.text) {
                wordPhonetic.innerText = ele.text
            }
            wordPhonetic.innerText = 'Not Found';

        });

        wordMeaning.innerText = data[0].meanings[0].definitions[0].definition

        const exampleArray = data[0].meanings[2].definitions;
        // console.log(exampleArray);
        exampleArray.forEach((err) => {
            if (err.example) {
                wordExample.innerText = err.example;
            }
            wordExample.innerText = 'Not Found';

        })
        if(data[0].meanings[0].synonyms){
            wordSynonyms.innerText = data[0].meanings[0].synonyms;
            
        }
        wordSynonyms.innerText = 'Not Found';

    } catch (error) {
        // Handling any errors that may occur during the fetch operation
        console.error('Error during fetch operation:', error);
    }
};
const displayWord = document.querySelector('#display-word');
const wordPhonetic = document.querySelector('.phonetic');
const wordMeaning = document.querySelector('#meaning');
const wordExample = document.querySelector('#example');
const wordSynonyms = document.querySelector('#synonyms');
const inputData = document.querySelector('#input-data');

const clearField = () => {
    inputData.value = '';
}

inputData.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        // Prevent the default behavior of the Enter key (form submission)
        e.preventDefault();

        // Trim any leading or trailing whitespaces from the entered word
        const word = inputData.value.trim();

        if (word === '') {
            window.alert('Enter some text');
        } else {
            console.log(word);
            getData(word);
            clearField();
        }
    }
});

