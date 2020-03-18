var app = new Vue({
    el: '#app',
    data: {
        items: [],
        newItem: "",
    },
    methods: {
        create: function () {
            if (this.newItem) {
                this.items.push(this.newItem);
                this.newItem = "";
            }
        },
        remove: function (index) {
            this.items.splice(index, 1);
        },
        copy: function (index) {
            copyDisabledTextToClipboard("#item" + index);
        }
    },
    mounted: function () {
        var items = localStorage.getItem("items");
        if (items == null || items == undefined) { return; }
        this.items = JSON.parse(items);
    },
    updated: function () {
        var str = JSON.stringify(this.items);
        localStorage.setItem("items", str);
    }
});

function copyDisabledTextToClipboard(element) {
    $(element).select();
    document.execCommand("copy");
}