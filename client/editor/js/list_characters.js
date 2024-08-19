const createTableRow = (character) => {
    return (`<tr>
                <th scope="row">${character.id}</th>
                <td>${character.name}</td>
                <td>${character.name2}</td>
                <td>${character.jedi}</td>
                <td class="text-end">
                    <button type="button" class="mx-1 btn btn-sm btn-outline-info">show</button>
                    <button type="button" class="mx-1 btn btn-sm btn-outline-warning" onclick="updateCharacter(${character.id})">edit</button>
                    <button type="button" class="mx-1 btn btn-sm btn-outline-danger" onclick="deleteCharacter(${character.id})">delete</button>
                </td>
            </tr>`);
}

const getCharacters = async () => {
    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = '';
    try {
        const response = await fetch('http://localhost:3000/api/characters');
        const result = await response.json();
        result.characters.forEach( character => {
            tableBody.innerHTML += createTableRow(character);
        });
        
    } catch (error) {
        console.error(error.message)
    }
}

const updateCharacter = (id) => {
    window.location.pathname = "/editor/update_character/"+id;
}

const deleteCharacter = async (id) => {
    try {
        const response = await fetch('http://localhost:3000/api/characters/'+id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        if (result) getCharacters();
        
    } catch (error) {
        console.error(error.message)
    }
}

getCharacters()