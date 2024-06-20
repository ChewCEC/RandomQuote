addEventListener('DOMContentLoaded', () => {

    let quoteTags = document.querySelector('.quote-tags');
    let quoteText = document.getElementById('quote-text');
    let copyQuote = document.getElementById('copy-quote');
    let newQuote = document.getElementById('new-quote');
    let quoteAutor = document.getElementById('quote-Autor');

    async function getQuote() {
        fetch('https://api.quotable.io/random')
            .then(response => response.json())
            .then(data => {
                quoteText.textContent = '"'+data.content+'"';
                quoteAutor.textContent = data.author;
                
                quoteTags.innerHTML = '';
                data.tags.forEach(tag => {
                    let tagElement = document.createElement('span');
                    tagElement.classList.add('tag');
                    tagElement.textContent = tag;
                    quoteTags.appendChild(tagElement);
                });
            });
    };

    if (getQuote){
        newQuote.addEventListener('click', getQuote);
    }

    copyQuote.addEventListener('click', () => {
        let text = quoteText.textContent;
        navigator.clipboard.writeText(text);
    });

    getQuote();

});