var app = new Vue({
    el: '#app',
    data: {
        items: [],
        newItem: {},
        bgColor: "#000000"
    },
    methods: {
        create: function () {
            if (this.newItem.Content) {
                this.items.unshift(this.newItem);
                this.newItem = {};
            }
        },
        remove: function (index) {
            this.items.splice(index, 1);
        },
        copy: function (index) {
            copyDisabledTextToClipboard("#item-content-" + index);
        },
        changeBgColor: function () {
            document.body.style.backgroundColor = this.bgColor;
            localStorage.setItem("bgColor", this.bgColor);
        }
    },
    mounted: function () {
        var items = localStorage.getItem("items");
        if (items) {
            this.items = JSON.parse(items);
        }

        var bgColor = localStorage.getItem("bgColor");
        if (bgColor) {
            this.bgColor = bgColor;
            document.body.style.backgroundColor = this.bgColor;
        }
        
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