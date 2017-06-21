// import TreePicker from './TreePicker.js';

var nameEl = document.querySelector('#name');
var outputEl = document.querySelector('#output');

var treepicker = new TreePicker({
    data: TreePicker.parseQscArea(provinces, source),
    onselect: onTreeSelected
});

function onTreeSelected(items) {
    console.log('on tree selected items:', items);
}

nameEl.onclick = function() {
    treepicker.show();
}