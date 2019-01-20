;(function($,window,document,undefined){

  var Carrousel;
  Carrousel = function (elm) {
      var self = this;

      this.elm = elm;
      this.wrapUl = elm.find('ul.wrap_ul');
      this.ggLeft = elm.find('div.gg_left');
      this.ggRight = elm.find('div.gg_right');
      this.picLiItems = elm.find('li.li_item');
      this.firstPicLi = this.picLiItems.first();
      this.lastPicLi = this.picLiItems.last();
      this.buttonLeft = elm.find('button.toggle__button--left');
      this.buttonRight = elm.find('button.toggle__button--right');
      this.flage = true;

      this.setting = {
        "width": 1140,            //幻灯片宽度
        "height": 500,            //幻灯片高度
        "firstPicWidth": 360,     //第一张图片宽
        "firstPicHeight": 500,    //第一张图片高度
        "scale": 0.88,			 //比例大小
        "speed": 500,              //切换速度
        "verticalAlign": "middle", //中间模式 top bottom
        'autoPlay': true,		  //是否自动播放
        'delay': 2000
      };

      $.extend(this.setting, this.getSetting());

      self.setSetingValue();
      self.setPicUlLiItems();

      this.ggLeft.click(function () {
          if (self.flage) {
              self.flage = false;
              self.carrouselRight('left');
          }
      });

      this.buttonLeft.click(function () {
          if (self.flage) {
              self.flage = false;
              self.carrouselRight('left');
          }
      });

      this.ggRight.click(function () {
          if (self.flage) {
              self.flage = false;
              self.carrouselRight('right');
          }
          ;
      });

      this.buttonRight.click(function () {
        if (self.flage) {
            self.flage = false;
            self.carrouselRight('right');
        }
        ;
      });

      if (self.setting.autoPlay) {
          self.autoPlay();
          self.elm.hover(function () {
              clearInterval(self.timer);
          }, function () {
              self.autoPlay();
          });
      }

  };

Carrousel.prototype={

  autoPlay:function(){
    var self=this;
    self.timer=setInterval(function(){
      self.ggLeft.click();
    }, this.setting.delay);

  },

  carrouselRight:function(dir){

    var _self=this;
    var zIndexArr=[];

    if(dir==='left'){

      this.picLiItems.each(function(){

        var self=$(this);
        var prev=self.prev().get(0)?self.prev():_self.lastPicLi;
        var width=prev.width();
        var height=prev.height();
        var zIndex=prev.css('zIndex');
        var top=prev.css('top');
        var opacity=prev.css('opacity');
        var left=prev.css('left');
        zIndexArr.push(zIndex);
        self.animate({
          width:width,
          height:height,
          top:top,
          opacity:opacity,
          left:left
        }, _self.setting.speed,function(){
          _self.flage=true;
        });
      });
      this.picLiItems.each(function(i){
        $(this).css('zIndex',zIndexArr[i]);
      });


    }else if(dir==='right'){

      this.picLiItems.each(function(){

        var self=$(this);
        var next=self.next().get(0)?self.next():_self.firstPicLi;
        var width=next.width();
        var height=next.height();
        var zIndex=next.css('zIndex');
        var top=next.css('top');
        var opacity=next.css('opacity');
        var left=next.css('left');
        zIndexArr.push(zIndex);
        self.animate({
          width:width,
          height:height,
          zIndex:zIndex,
          top:top,
          opacity:opacity,
          left:left
        }, _self.setting.speed,function(){
          _self.flage=true;
        });
      });
      this.picLiItems.each(function(i){
        $(this).css('zIndex',zIndexArr[i]);
      });

    }
  },

  setVerticalAlign:function(height){
    var self=this;
    var verticalAlign=self.setting.verticalAlign;
    var top=0;

    if(verticalAlign==='middle'){
      top=(self.setting.height-height)/2;
    }else if(verticalAlign==='top'){
      top=0;
    }else if(verticalAlign==='bottom'){
      top=self.setting.height-height;
    }else{
      top=0;
    }
    return top;
  },

  setPicUlLiItems:function(){
    var self=this;
    var slcieItems=this.picLiItems.slice(1);
    var sliceSize=slcieItems.length/2;
    var rightItems=slcieItems.slice(0,sliceSize);
    var level=Math.floor(this.picLiItems.length/2);
    var leftItems=slcieItems.slice(sliceSize);

    var rw=this.setting.firstPicWidth;
    var rh=this.setting.firstPicHeight;
    var gap=((this.setting.width-rw)/2)/level;

    var firstOffsetLeft=(self.setting.width-self.setting.firstPicWidth)/2;

    rightItems.each(function(i){
      level--;
      rw=rw*self.setting.scale;
      rh=rh*self.setting.scale;
      $(this).css({
        zIndex:level,
        width:rw,
        height:rh,
        left:firstOffsetLeft+self.setting.firstPicWidth+(gap*++i)-rw,
        top:self.setVerticalAlign(rh)
      });

    });

    var lw=rightItems.last().width();
    var lh=rightItems.last().height();
    var oloop=Math.floor(this.picLiItems.length/2);

    leftItems.each(function(i){

      $(this).css({
        zIndex:i,
        width:lw,
        height:lh,
        left:i*gap,
        top:self.setVerticalAlign(lh)
      });

      oloop--;
      lw=lw/self.setting.scale;
      lh=lh/self.setting.scale;

    });
  },

  setSetingValue:function(){
    var self=this;
    self.elm.css({
      width:this.setting.width,
      height:this.setting.height
    });

    self.wrapUl.css({
      width:this.setting.width,
      height:this.setting.height
    });

    var btnW=(this.setting.width-this.setting.firstPicWidth)/2;
    var btnH=this.setting.height;
    self.ggLeft.css({
      width:btnW,
      height:btnH,
      zIndex:Math.ceil(this.picLiItems.length / 2)
    });
    self.ggRight.css({
      width:btnW,
      height:btnH,
      zIndex:Math.ceil(this.picLiItems.length / 2)
    });

    self.firstPicLi.css({
      width:this.setting.firstPicWidth,
      height:this.setting.firstPicHeight,
      left:btnW,
      zIndex:Math.floor(this.picLiItems.length / 2),
      top:0
    });
  },

  getSetting:function(){
    var self=this;
    var setting=self.elm.attr('data-setting');

    if(setting&&setting!=''){
      return $.parseJSON(setting);
    }else{
      return {};
    }
  }



};

Carrousel.init=function(elms){
    var self=this;

    elms.each(function(){
      new self($(this));
    });
  };


window.Carrousel=Carrousel;

})(jQuery,window,document);
