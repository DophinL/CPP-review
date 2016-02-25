// @require index.less

var BaseComponent = require('/component/BaseComponent/');

var _ = BaseComponent.util;

var Component = BaseComponent.extend({
    name: 'menu',

    template: __inline('./index.tpl'),

    config: function (data) {
        data.getMenuURL = "/users/getCurMenus.do" ;
    },

    init: function (data) {
        var self = this,
            // attrs = window.location.href.split("/"),
            // len = attrs.length,
            // menuCodes = attrs[len-1],
            // menuCode = menuCodes.split(";");
            reg = /\/(?:\w*)\/(\w*)/i,
            pathName = window.location.pathname;
        self.data.showMenuCode = reg.test(pathName)? pathName.match(reg)[1]:"";
    	self.__getMemu();
    },

    __getMemu: function(){
    	var self = this,
    		data = self.data;
    	this.$request({
            url:data.getMenuURL,
            type: 'GET',
            success: function (json) {
                var resultData = json.data;
            	// sessionStorage.userName =  resultData.userName;
            	data.menuList = resultData;
            	self.__selectedMenu();
            	self.$update();
            }
            
        });
    },
    __selectedMenu: function(){
        var self = this,
            data = self.data,
            showMenuCode = data.showMenuCode,
            menuList = data.menuList,
            menuClass = {
                "1": "i-capacity",
                "2": "i-todo",
                "14": "i-progress",
                "15": "i-center",
                "20": "i-permission"
            };
        _.each(menuList, function(i, o){
            o.className = menuClass[o.id];
            if(o.menuCode && o.menuCode == showMenuCode){
                o.selected = true;
            }
            
            var subMenu = o.children;
            if(subMenu.length){
                o.hasChildren = true;
                //有subMenu
                _.each(subMenu, function(j,s){
                    if(s.menuCode && s.menuCode == showMenuCode){
                        s.selected = true;
                        o.selected = true;
                        o.showChildren = true;
                    }
                });
            }
        });


    },
    __clickMenu: function(event, index){
        var self = this,
            menuList = self.data.menuList;
        //已经展示了
        menuList[index].showChildren = !menuList[index].showChildren;
        event.preventDefault();
    }
});

module.exports = Component;