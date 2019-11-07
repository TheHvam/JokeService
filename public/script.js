function update(){
    document.querySelector('#oprettedeJokes').innerHTML = '';
    document.querySelector('#setup').value = " ";
    document.querySelector('#punchLine').value = " ";
    document.querySelector('#alleJokes').innerHTML = " ";
    getJokes();
    getOtherSites();
}

async function getOtherSites() {
    const [template, jokeResponse] = await Promise.all(
        [fetch('othersites.hbs'), fetch('https://krdo-joke-registry.herokuapp.com/api/services')]);
    const [templateText, otherjokes] = await Promise.all(
        [template.text(), jokeResponse.json()]);
    const compiledTemplate = Handlebars.compile(templateText);
    let jokesHTML = '';
    otherjokes.forEach(otherjoke => {
        jokesHTML += compiledTemplate({
            name: otherjoke.name,
            address: " " + otherjoke.address
        });
    });
    document.querySelector('#alleJokes').innerHTML = jokesHTML;
};

async function getJokes() {
    const [template, jokeResponse] = await Promise.all(
        [fetch('joke.hbs'), fetch('/api/jokes')]);
    const [templateText, jokes] = await Promise.all(
        [template.text(), jokeResponse.json()]);
    const compiledTemplate = Handlebars.compile(templateText);
    let jokesHTML = '';
    jokes.forEach(joke => {
        jokesHTML += compiledTemplate({
            setup: joke.setup,
            punchline: joke.punchline
        });
    });
        document.querySelector('#oprettedeJokes').innerHTML = jokesHTML;
};

//onclick
function setOnClick() {
    document.querySelector('#knapOpretJoke').onclick = () => {
        console.log("Entered OnClick");
        const joke = {
            setup: document.querySelector('#setup').value,
            punchline: document.querySelector('#punchLine').value
        };
            fetch('/api/joke', {
                method: "POST",
                body: JSON.stringify(joke),
                headers: {'Content-Type': 'application/json'}
            })
                .then(response => {
                if (response.status >= 400)
                    throw new Error(response.status);
                else
                    update();
                return response.json();
            })
                .then(resultat => console.log(`Resultat: %o`, resultat))
                .catch(fejl => console.log('Fejl: ' + fejl));
    };
};

setOnClick();
update();