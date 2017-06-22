// import TreePicker from './TreePicker.js';

var nameEl = document.querySelector('#name');
var outputEl = document.querySelector('#output');

var data = TreePicker.parseQscArea(provinces, source);

var treepicker = new TreePicker({
    data: data, // 原始数据
    numCols: 3, // 可见的列数
    selectedValue: ['56', '81', '82'], // 当前选中的ID号
    onselect: onTreeSelected // 选择回调函数
});

var treepicker2 = new TreePicker({
    data: data,
    numCols: 2,
    selectedValue: ['20', '21'],
    onselect: onTreeSelected2
});

render(nameEl, treepicker.getSelectedItems());
render(outputEl, treepicker2.getSelectedItems());

function onTreeSelected(items) {
    render(nameEl, items);
}

function onTreeSelected2(items) {
    render(outputEl, items);
}

nameEl.onclick = function() {
    treepicker.show();
}

outputEl.onclick = function() {
    treepicker2.show();
}

function render(dom, items) {
    console.log('selected items:', items);
    var str = items.map(item => item.text).join('/');
    dom.innerHTML = str;
}