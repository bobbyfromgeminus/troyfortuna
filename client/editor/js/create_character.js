function cleanString(input) {
    let cleaned = input.replace(/[^a-zA-Z0-9 ]/g, '');
    cleaned = cleaned.replace(/ /g, '_');
    return cleaned.toLowerCase();
}


document.querySelector('#newcharacter').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const characterData = {};

    formData.forEach((value, key) => {    
        characterData[key] = value;
    });
    characterData.name2 = cleanString(characterData.name);

    const jsonOutput = JSON.stringify(characterData);
    const response = await fetch('http://localhost:3000/api/characters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonOutput
    });
    const result = await response.json();
    if (result.message) window.location.pathname = "/editor/characters";
    else if (result.error) alert(result.error);
    
});