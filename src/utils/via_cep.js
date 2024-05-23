async function get_address_by_cep(cep){
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    return data;
}

function format_validation_zip_code(zip_code) {
    let formatted = '';

    if (zip_code.length > 0) {
        formatted += zip_code.slice(0, 5);
    }
    if (zip_code.length > 5) {
        formatted += '-' + zip_code.slice(5, 8);
    }
    return formatted;
}

export {
    get_address_by_cep,
    format_validation_zip_code
}