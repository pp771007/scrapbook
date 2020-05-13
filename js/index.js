var app = new Vue({
    el: '#app',
    data: {
        items: [],
        newItem: {},
        settings: {
            bgColor: "#000000"
        }
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
            document.body.style.backgroundColor = this.settings.bgColor;
        }
    },
    created: function () {
        var items = localStorage.getItem("items");
        if (items) {
            this.items = JSON.parse(items);
        }

        var settings = localStorage.getItem("settings");
        if (settings) {
            this.settings = JSON.parse(settings);
        }
        this.changeBgColor();
        
    },
    watch: {
        items: function(value) {
            var str = JSON.stringify(value);
            localStorage.setItem("items", str);
        },
        settings: {
            handler(value) {
                var str = JSON.stringify(value);
                localStorage.setItem("settings", str);
            },
            deep: true
        }
    }
});

function copyDisabledTextToClipboard(element) {
    $(element).select();
    document.execCommand("copy");
}