document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const result = {};

    formData.forEach((value, key) => {    
        result[key] = value;
    });

    if (result.equipment) {
        result.equipment = result.equipment.split(',').map(item => item.trim());
    }
    if (result.duel) {
        result.duel = result.duel.split(',').map(item => parseInt(item.trim()));
    }

    const jsonOutput = JSON.stringify(result);
    console.log(jsonOutput);
});