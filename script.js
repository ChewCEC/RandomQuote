addEventListener('DOMContentLoaded', () => {

    let quoteTags = document.querySelector('.quote-tags');
    let quoteText = document.getElementById('quote-text');
    let copyQuote = document.getElementById('copy-quote');
    let newQuote = document.getElementById('new-quote');
    let quoteAutor = document.getElementById('quote-Autor');
    let apiQuotable = document.getElementById('api-quotable');
    let apiZen = document.getElementById('api-zen');
    let apiFavqs = document.getElementById('api-favqs');


    const API_QUOTABLE = 'https://api.quotable.io/random'
    const API_ZEN = 'https://zenquotes.io/api/random/'
    const API_FAVQS = 'https://favqs.com/api/qotd'
    let currentApi = "" 

    async function getQuote(quoteSource) {
        try {
            const response = await fetch(quoteSource);
            const data = await response.json();

            if (quoteSource === API_QUOTABLE) {
                currentApi = API_QUOTABLE
                quoteText.textContent = '"' + data.content + '"';
                quoteAutor.textContent = data.author;

                quoteTags.innerHTML = '';
                data.tags.forEach(tag => {
                    let tagElement = document.createElement('span');
                    tagElement.classList.add('tag');
                    tagElement.textContent = tag;
                    quoteTags.appendChild(tagElement);
                });
                
            }
            else if (quoteSource === API_ZEN) {
                currentApi = API_ZEN
                quoteText.textContent = '"' + data[0].q + '"';
                quoteAutor.textContent = data[0].a;
                quoteTags.innerHTML = '';
                tagElement = document.createElement('span');
                tagElement.classList.add('tag');
                tagElement.textContent = 'no tags available';
                quoteTags.appendChild(tagElement);
            }
            else if (quoteSource === API_FAVQS) {
                currentApi = API_FAVQS
                quoteText.textContent = '"' + data.quote.body + '"';
                quoteAutor.textContent = data.quote.author;
                quoteTags.innerHTML = 'No tags available';
                if (data.quote.tags.length) {
                    quoteTags.innerHTML = '';
                    data.quote.tags.forEach(tag => {
                        let tagElement = document.createElement('span');
                        tagElement.classList.add('tag');
                        tagElement.textContent = tag;
                        quoteTags.appendChild(tagElement);
                    });
                }
            }
            else {
                quoteText.textContent = 'Error';
            }

        } catch (error) {
            quoteText.textContent = 'Error fetching quote';
            console.error('Error:', error);
        }
  
    };


newQuote.addEventListener('click', () => getQuote(currentApi? currentApi : API_QUOTABLE));

copyQuote.addEventListener('click', () => {
    let text = quoteText.textContent;
    navigator.clipboard.writeText(text);
});

apiQuotable.addEventListener('click', () => {
    getQuote(API_QUOTABLE);
});

apiZen.addEventListener('click', () => {
    getQuote(API_ZEN);
});

apiFavqs.addEventListener('click', () => {
    getQuote(API_FAVQS);

});

getQuote(API_QUOTABLE);


});