const comprehend = new AWS.Comprehend();


// DETECT DOMINANT LANGUAGE
const textParams =  {
    //text: 'STRING VALUE'; get this from userInput <form onSubmit = 'blah()'/>
}
comprehend.detectDominantLanguage(textParams, function(err, data) {
        if(err) {
            console.log(err, err.stack);
        } else {
            console.log(data); //get relevant data, and put it in chatlog database
        }
});


// DETECT KEY PHRASE
const keyphraseParams = {
    // LanguageCode: en | es | fr | de | it | pt,
    // text: 'STRING VALUE';
}

comprehend.detectKeyPhrases(keyphraseParams, function(err, data) {
    if(err) {
        console.log(err, err.stack);
    } else {
        console.log(data); //get relevant data, and put it in topic schema
    }
})


// DETEXT TEXT SENTIMENT
const sentimentParams = {
    // LanguageCode: en | es | fr | de | it | pt,
    // text: 'STRING VALUE';
}

comprehend.detectSentiment(sentimentParams, function(err, data) {
    if(err) {
        console.log(err, err.stack);
    } else {
        console.log(data); // get relevant data, and put it in chatlog schema
    }
})


