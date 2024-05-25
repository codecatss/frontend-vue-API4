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

function formatCNPJ(input) {
    // Remove caracteres não numéricos
    let cnpj = input.replace(/\D/g, '');

    // Adiciona os pontos, barras e traço de acordo com o tamanho do CNPJ
    if (cnpj.length > 2) {
        cnpj = cnpj.substring(0, 2) + '.' + cnpj.substring(2);
    }
    if (cnpj.length > 6) {
        cnpj = cnpj.substring(0, 6) + '.' + cnpj.substring(6);
    }
    if (cnpj.length > 10) {
        cnpj = cnpj.substring(0, 10) + '/' + cnpj.substring(10);
    }
    if (cnpj.length > 15) {
        cnpj = cnpj.substring(0, 15) + '-' + cnpj.substring(15);
    }

    // Atualiza o valor do input
    return cnpj;
}


export {
    get_data_by_cnpj,
    formatCNPJ,
    validation_cnpj
}