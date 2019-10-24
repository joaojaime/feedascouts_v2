export function arrayToCSV ({ headers, rows = [] }, separateBy = ';') {
    const arr = [];

    if (headers) arr.push(headers);

    arr.push(...rows);

    const csvData = arr.map(e => e.map(scapeField).join(separateBy)).join('\n');

    return csvData;
}

export function downloadCSV (filename, data) {
    const csvData = arrayToCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function scapeField(field) {
    const innerValue = field ? field.toString() : '';
    let result = innerValue.replace(/"/g, '""');
    if (result.search(/("|,|\n)/g) >= 0)
        result = `"${result}"`;
    return result.trim();
}