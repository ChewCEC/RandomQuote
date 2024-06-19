addEventListener('DOMContentLoaded', () => {

    let quoteTags = document.querySelectorAll('.quote-tags');
    let quoteText = document.getElementById('.quote-text');
    let copyQuote = document.getElementById('.copy-quote');
    let newQuote = document.getElementById('.new-quote');


    async function getQuote() {
        fetch('https://api.quotable.io/random')
            .then(response => response.json())
            .then(data => {
                return data;
            });
    };

    async function changeQuote(){
        data = await getQuote();
        quoteText.textContent = data.content;
        quoteTags.textContent = data.tags;
    };

    newQuote.addEventListener('click', changeQuote);

    copyQuote.addEventListener('click', () => {
        let text = quoteText.textContent;
        navigator.clipboard.writeText(text);
    });


});