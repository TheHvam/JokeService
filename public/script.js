function update(){
    document.querySelector('#oprettedeJokes').innerHTML = '';
    document.querySelector('#setup').value = " ";
    document.querySelector('#punchLine').value = " ";
    getJokes();
}

async function getOthersites() {
    const [template, siteResponse] = await Promise.all(
        [fetch('othersites.hbs'), fetch('/api/othersites')]);
    const [templateText, sites] = await Promise.all(
        [template.text(), siteResponse.json()]);
    const compiledTemplate = Handlebars.compile(templateText);
    let sitesHTML = '';
    sites.forEach(site => {
        sitesHTML += compiledTemplate({
            name: site.name,
            address: site.address,
        });
    });
    document.querySelector('#oprettedeJokes').innerHTML = sitesHTML;
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
            fetch('/joke', {
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