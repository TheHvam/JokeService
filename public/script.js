const fetch = require('node-fetch');

function update(){
    document.querySelector('#oprettedeJokes').innerHTML = '';
    document.querySelector('#setup').value = " ";
    document.querySelector('#punchLine').value = " ";
    document.querySelector('#alleJokes').innerHTML = " ";
    getJokes();
    getOtherSites();
}

async function getJokesByServer(server) {
    const serverName = server.trim();
    console.log(serverName);
    try {
        const res = await fetch('api/othersites');
        const sites = await res.json();

        const foundSite = sites.find(site => site.name == serverName);

        const siteResponse = await fetch('/api/otherjokes/' + foundSite._id);
        const siteJson = await siteResponse.json();

        async function GETtext(url) {
            const OK = 200;
            let response = await fetch(url);
            if (response.status !== OK)
                throw new Error("GET status code " + response.status);
            return await response.text();
        }

        async function generateJokeList(jokes) {
            let template = await GETtext('joke.hbs');
            let compiledTemplate = Handlebars.compile(template);
            return compiledTemplate({jokes});
        }

        let divJokes = document.getElementById('#alleOtherJokes');
        divJokes.innerHTML = await generateJokeList(siteJson);

    } catch (e) {
        console.log("Error: " + e);
    }
}

function setOnClickV2() {

}

async function getJokesFromOtherSite(siteUrl) {
    const url = 'api/jokes';
    const [template, jokeResponse] = await Promise.all(
        [fetch('joke.hbs'), fetch(siteUrl + url)]);
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
    document.querySelector('#alleOtherJokes').innerHTML = jokesHTML;
};

async function getOtherSites() {
    const [template, jokeResponse] = await Promise.all(
        [fetch('othersites.hbs'), fetch('/api/othersites')]);
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
        const joke = {
            setup: document.querySelector('#setup').value,
            punchline: document.querySelector('#punchLine').value
        };
            fetch('/api/jokes', {
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

update();
setOnClick();