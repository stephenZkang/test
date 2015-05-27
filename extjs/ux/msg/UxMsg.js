Ext.BLANK_IMAGE_URL = '../../resources/images/default/s.gif';

Ext.UxMsg = function(){
    var msgCt;
    var uxMsgObj;
    var optsg = {ghostD:'t'};
    function createBox(t, s){
        return ['<div class="uxmsg">',
                '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
                '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>', t, '</h3>', s, '</div></div></div>',
                '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
                '</div>'].join('');
    }
    return {
        alert : function(options){
            var opts = {autoClose:true, ghostD:'t',position:'t-t', time:2, title:'提示'};
            Ext.apply(opts,options);
            if(!msgCt){
                msgCt = Ext.DomHelper.insertFirst(document.body, {id:'uxmsg-div'}, true);
                msgCt.setStyle({position:"absolute", top:'10px',"z-index":20000,width:"240px"});
            }
            msgCt.alignTo(document.body, opts.position);
            var m = Ext.DomHelper.append(msgCt, {html:createBox(opts.title, opts.msg)}, true);
            var ghostD = 't';
            if(opts.position == 'br-br' || opts.position == 'b-b' || opts.position == 'bl-bl'){
                ghostD = 'b';
                m.setY(m.getY() - m.getHeight());
            }
            if(opts.position == 'l-l' ){
                ghostD = 'l';
            }
            if(opts.position == 'r-r' ){
                ghostD = 'r';
            }
            opts.ghostD = ghostD;
            optsg.ghostD = ghostD;
            
            m.fadeIn({endOpacity: 1,easing: 'easeOut', duration: .5});
            
            if(opts.autoClose){
                m.pause(opts.time).ghost(opts.ghostD, {remove:true});
            }else{
                uxMsgObj = m;
                return uxMsgObj;
            }
        },
        close:function(m){
            if(m){
                m.ghost(optsg.ghostD, {remove:true});
            }
        }
//        ,
//        init : function(){
//            var lb = Ext.get('lib-bar');
//            if(lb){
//                lb.show();
//            }
//        }
    };
}();
//Ext.onReady(Ext.UxMsg.init, Ext.UxMsg);