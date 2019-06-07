import Vue from 'vue';
import msgBox from './MessageBox'

export var MessageBox = (function(){

    var defaults = {//默认值
        title:'',
        content:'',
        cancel:'',
        ok:'',
        handleCancel:null,
        handleOK:null

    };

    //可以与组件结合  返回新类
    var MyComponent = Vue.extend(msgBox);
    
    return function(ops){//配置参数
        for(var attr in ops){
            defaults[attr] = ops[attr];
        }

        var vm = new MyComponent({
            el:document.createElement('div'),//不会多出  
            data:{
                title:defaults.title,
                content:defaults.content,
                cancel:defaults.cancel,
                ok:defaults.ok
            },
            methods:{
                handleCancel(){
                    defaults.handleCancel && defaults.handleCancel.call(this); 
                    document.body.removeChild(vm.$el);
                },
                handleOK(){
                    defaults.handleOK && defaults.handleOK.call(this); 
                    document.body.removeChild(vm.$el);
                }
            }
        });

        document.body.appendChild(vm.$el);
    }

})();