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

        /** 当未指定初始选中值时，使用的默认索引值 */
        this._defaultIndex = new Array(this._numCols).fill(0);
        /** 查找初始值的索引值 */
        this._selectedIndex = this._findSelectedIndex(this._data, this._selectedValue);
        /** 查找当前选中的元素 */
        this._selectedItems = this._findSelectedItems(this._data, this._selectedIndex);

        this.initPicker();
    }

    /** 初始化 Picker */
    initPicker() {
        const columnDatas = this._getColumnDatas(this._data, this._selectedIndex);

        this.picker = new Picker({
            data: columnDatas,
            selectedIndex: this._selectedIndex,
            title: this._title
        });

        this.initEvents(this.picker);
    }

    initEvents(picker) {
        var self = this;
        picker.on('picker.select', function(selectedVal, selectedIndex) {
            self._selectedItems = self._findSelectedItems(self._data, selectedIndex);
            if (self._onselect) {
                self._onselect(self._selectedItems);
            }
        });

        picker.on('picker.change', function(index, selectedIndex) {
            self._updateColumns(index, selectedIndex);
        });
    }

    show() {
        if (this.picker) {
            this.picker.show();
        }
    }

    _updateColumns(index, selectedIndex) {
        console.log('update column data: ', index, selectedIndex);
        this._selectedIndex[index] = selectedIndex;

        if (index >= this._numCols - 1) {
            return;
        }

        var stillIndex = this._selectedIndex.slice(0, index+1);
        var updatedIndex = this._selectedIndex.slice(index+1);
        
        var sourcedata = this._data;
        stillIndex.forEach(function(item){
            sourcedata = sourcedata[item].sub;
        });

        var updatedColumns = this._getColumnDatas(sourcedata, updatedIndex);
        // console.log('updated columns:', updatedColumns);

        var picker = this.picker;
        updatedColumns.forEach(function(item, i){
            let column = item;
            let idx = index + i + 1;
            console.log(idx, column);
            picker.refillColumn(idx, column);
            picker.scrollColumn(idx, 0);
        });
    }

    _getColumnDatas(datas, index) {
        let res = [];
        let sourcedata = datas;
        index.forEach(function(item) {
            var column = sourcedata.map(function(item){
                return {
                    text: item.text,
                    value: item.value
                }
            });
            res.push(column);

            if (!sourcedata[item]) {
                sourcedata = sourcedata[0].sub
            } else {
                sourcedata = sourcedata[item].sub;
            }
        });
        return res;
    }

    /** 返回选中的元素数据，每个数组元素格式为：`{ text: "text", value: "23" }` */
    _findSelectedItems(datas, index) {
        var res = [];
        var lastItem = null;
        index.forEach(function(item, idx) {
            var item = lastItem ? lastItem[item] : datas[item];
            res.push({
                text: item.text,
                value: item.value
            });
            lastItem = item.sub;
        });

        return res;
    }

    /**
     * 从 datas 中查找 values 指定的数值所在的索引值
     * 若 values == null, 则返回 `_defaultIndex`
     * 若数组对应的值未找到，则后面的所有数值都是 0
     * @param {Array} datas 待查找数组
     * @param {Array} values 待匹配数值数组
     * @param {Number} i 层级深度 
     */
    _findSelectedIndex(datas, values, i = 0) {
        if (!datas) return;
        if (!values) return this._defaultIndex;
        if (values.length <= 0) return this._defaultIndex;
        
        var currentValue = values[i];
        if (currentValue == undefined) {
            currentValue = 0;
        }
        
        var currentIndex = datas.findIndex(function(item){ 
            return item.value == currentValue 
        });
        if (currentIndex == -1) {
            let remainingArr = (values.length - i);
            return new Array(remainingArr).fill(0);
        }
        
        var res = [currentIndex];
        if (i < values.length - 1 && datas[currentIndex].hasOwnProperty('sub')) {
            var subres = this._findSelectedIndex(datas[currentIndex].sub, values, i + 1);
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
            
            var cityItems = obj2arr(citydata, 'name');
            if (cityItems) {
                item.sub = cityItems;

                cityItems.forEach(function(item) {
                    var cityid = item.value;
                    var areadata = citydata[cityid];
                    if (areadata.area) {
                        // console.log('areadata:', areadata.area);
                        var areaitem = obj2arr(areadata.area, 'name');
                        if (areaitem) {
                            item.sub = areaitem;
                        }
                    }
                })
            }
        });

        /** 将 obj 对象转换为数组  */
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