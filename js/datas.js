// Converte YYYY-MM-DD para exibição sem criar Date, evitando deslocamentos de fuso.
export function formatarData(data) {
    const [ano, mes, dia] = data.split("-");

    return `${dia}/${mes}/${ano}`;
}
