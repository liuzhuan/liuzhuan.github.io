class TreePicker {
    /**
     * 
     * @param {Object}   options 配置项
     * @param {String}   options.title 联动列表的标题
     * @param {Array}    options.data 原始数据，数据格式固定，三个关键节点为 text, value, sub
     * @param {Number}   options.numCols 联动列数，不大于 `options.data` 的层级深度，默认为 2
     * @param {Array}    options.selectedValue 初始化数组 [value1, value2, ...]
     * @param {Function} options.onselect 选择成功回调函数, 函数参数为选中的元素数组
     */
    constructor(options) {
        this._data = options.data;
        this._title = options.title;
        this._numCols = options.numCols || 2;
        this._onselect = options.onselect;

        this._selectedValue = options.selectedValue;
        if (options.numCols 
            && options.selectedValue
            && options.selectedValue.length > options.numCols
            ) {
            this._selectedValue = options.selectedValue.slice(0, options.numCols);
        }
        
        this._selectedIndex = this._findSelectedIndex(this._data, this._selectedValue);
        this._selectedItems = this._findSelectedItems(this._selectedIndex);

        this.initPicker();
    }

    /** 初始化 Picker */
    initPicker() {
        const selectedIndex = this._findSelectedIndex(this._data, this._selectedValue);
        const data = this._getColumnDatas(this._data, selectedIndex);
        console.log('before picker: ', data);

        if (!data) return;

        this.picker = new Picker({
            data: data,
            selectedIndex: selectedIndex,
            title: this._title
        });

        this.initEvents(this.picker);
    }

    initEvents(picker) {
        var self = this;
        picker.on('picker.select', function(selectedVal, selectedIndex) {

        });

        picker.on('picker.change', function(index, selectedIndex) {

        });
    }

    show() {
        if (this.picker) {
            this.picker.show();
        }
    }

    _getColumnDatas(datas, indexes, i = 0) {
        if (!indexes) return;

        var items = datas.map(item => (
            { text: item.text, value: item.value }
        ));
        
        var currentIndex = 0;
        if (indexes && indexes.length > 0) {
            currentIndex = indexes[i];
        }
        
        var currentItem = datas[currentIndex];
        
        if (!currentItem) {
            return items;
        }
        
        if (!currentItem.hasOwnProperty('sub')) {
            return items;
        }
        
        if (i + 1 >= indexes.length) {
            return items;
        }
        
        var subdatas = currentItem.sub;
        var subitems = getColumnDatas(subdatas, indexes, i+1);
        return [items].concat([subitems]);
    }

    /** 返回选中的元素数据，每个数组元素格式为：`{ text: "text", value: "23" }` */
    _findSelectedItems(values) {
        // TODO: return the selected items
    }

    /** 搜索选中的索引值 */
    _findSelectedIndex(datas, values, i = 0) {
        if (!datas) return;
        if (!values) return;
        if (values.length <= 0) return;
        
        var currentValue = values[i];
        if (!currentValue) return;
        
        var currentIndex = findIndexFromArray(datas, 'value', currentValue);
        if (currentIndex == -1) return [0];
        
        var res = [currentIndex];
        if (i < values.length - 1 && datas[currentIndex].hasOwnProperty('sub')) {
            var subres = findSelectedIndex(datas[currentIndex].sub, values, i + 1);
            return res.concat(subres);
        } else {
            return res;
        }
    }

    /** 获取选中的元素 */
    getSelectedItems() {
        return this._selectedItems;
    }

    /**
     * 解析轻松筹地区数据，返回规范化的数据格式
     * @param {Object} pdata 省份数据
     * @param {Object} cdata 城市数据
     */
    static parseQscArea(pdata, cdata) {
        let res = obj2arr(pdata['CN']);
        res.forEach(function(item) {
            var pid = item.value;
            var citydata = cdata[pid];
            console.log(citydata);
        })

        function obj2arr(obj, attr = null) {
            if (!obj) return null;

            var arr = [];
            var keys = Object.keys(obj);
            keys.forEach(function(key) {

                var item = {
                    text: attr ? obj[key][attr] : obj[key],
                    value: key
                }

                arr.push(item);
            });

            return arr;
        }

        return res;
    }
}

/**
 * 寻找匹配元素所在索引值，如果没有找到，返回 -1
 * @param {Array} datas 原始数据 
 * @param {String} key 需要匹配的键值
 * @param {*} value 需要匹配的数值
 */
function findIndexFromArray(datas, key, value) {
  for (var i = 0; i < datas.length; i++) {
    if (datas[i][key] == value) {
      return i;
    }
  }
  
  return -1;
}