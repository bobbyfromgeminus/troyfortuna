function cleanString(input) {
    let cleaned = input.replace(/[^a-zA-Z0-9 ]/g, '');
    cleaned = cleaned.replace(/ /g, '_');
    return cleaned.toLowerCase();
}


document.querySelector('#newcharacter').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const result = {};

    formData.forEach((value, key) => {    
        result[key] = value;
    });
    result.name2 = cleanString(result.name);

    /*
    if (result.equipment) {
        result.equipment = result.equipment.split(',').map(item => item.trim());
    }
    if (result.duel) {
        result.duel = result.duel.split(',').map(item => parseInt(item.trim()));
    }
    */

    const jsonOutput = JSON.stringify(result);
    fetch('http://localhost:3000/api/characters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonOutput
    });
    
});