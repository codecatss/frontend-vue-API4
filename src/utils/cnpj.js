const url = 'https://www.receitaws.com.br/v1/cnpj/';

async function get_data_by_cnpj(cnpj){
    const response = await fetch(url+cnpj);
    const data = await response.json();
    return data;
}

function validation_cnpj(cnpj){
    const regex = /^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})$/;
    const cnpjFormatted = cnpj.replace(regex, (match, p1, p2, p3, p4, p5) => {
        let formatted = '';
        if (p1) formatted += p1;
        if (p2) formatted += '.' + p2;
        if (p3) formatted += '.' + p3;
        if (p4) formatted += '/' + p4;
        if (p5) formatted += '-' + p5;
        return formatted;
    });
    return cnpjFormatted;
}

export {
    get_data_by_cnpj,
    validation_cnpj
}