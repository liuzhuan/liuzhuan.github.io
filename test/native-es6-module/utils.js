console.info('utils is running...');

export function addText(txt) {
    const div = document.createElement('div');
    div.textContent = txt;
    document.body.appendChild(div);
}

export function showTime() {
    return 'Timestamp is: ' + Date.now();
}