/* This object is a class to handle custom touch event
 * create by Yaliang, 4/27/2015
 */
touch = {
    touchInitialize: function(selector, pullTopFunc) {
        this.topOverPixel = 0;
        this.selector = selector;
        $(this.selector).stop();
        this.stop = true;
        if ($(this.selector).children(".touch-scroll-bar").length == 0) {
            $(this.selector).prepend("<div class='touch-scroll-bar'></div>");
        }
        this.scrollBarElement = $(this.selector).children(".touch-scroll-bar");
        this.touchHideScrollBar();
        $(this.selector).unbind("touchstart").bind("touchstart", function(event){
            touch.touchStartEventHandler(event);
            touch.touchShowScrollBar();
            touch.touchUpdateScrollBar();
        });
        $(this.selector).unbind("touchmove").bind("touchmove", function(event){
            touch.touchMoveEventHandler(event);
            touch.touchUpdateScrollBar();
        });
        $(this.selector).unbind("touchend").bind("touchend", function(event){
            touch.touchEndEventHandler(event);
        });
        if (typeof(pullTopFunc) != "undefined") {
            this.pullTopFunc = pullTopFunc;
            this.pullTopEnable = true;
            if ($(this.selector).children(".touch-top-pull-bar").length == 0) {
                $(this.selector).prepend("<div class='touch-top-pull-bar'>Pull to load</div>");
            }
        } else {
            this.pullTopEnable = false;
        }
    },
    touchStartEventHandler: function(event) {
        $(this.selector).stop();
        this.stop = true;
        this.currentY = event.originalEvent.touches[0].clientY;
        this.moveStartY = this.currentY;
        this.moveStartTime = new Date;
        this.moveSlowCircle = 0;
    },
    touchMoveEventHandler: function(event) {
        event.preventDefault();
        this.lastY = this.currentY;
        this.currentY = event.originalEvent.touches[0].clientY;
        this.moveRate = (1+Math.round(Math.abs(this.currentY-this.lastY) / 10));
        if (this.moveRate > 1) {
            this.moveSlowCircle = 0;
        } else {
            this.moveSlowCircle += 1;
        }
        var newTop = $(this.selector).scrollTop() - (this.currentY-this.lastY);
        $(this.selector).scrollTop(newTop);
        if (this.pullTopEnable) {
            this.topOverPixel = Math.max(0,this.topOverPixel + Math.round(1.0/(1.0*this.topOverPixel/20+1)*(this.currentY-this.lastY))) ;
            $(this.selector).children(".touch-top-pull-bar").height(Math.min(this.topOverPixel,60));
            if (this.topOverPixel >= 40) {
                $(this.selector).children(".touch-top-pull-bar").html("Release to load");
            }
        }
        
        // console.log(this.moveRate);
    },
    touchEndEventHandler: function(event) {
        if ((this.pullTopEnable) && (this.topOverPixel >= 40)) {
            this.pullTopFunc();
            this.topOverPixel = 30;
            $(this.selector).children(".touch-top-pull-bar").animate({height:30},300);
            $(this.selector).children(".touch-top-pull-bar").html("Loading");
        } else {
            this.topOverPixel = 0;
            $(this.selector).children(".touch-top-pull-bar").animate({height:0},300);
            $(this.selector).children(".touch-top-pull-bar").html("Pull to load");
        }
        if (this.moveSlowCircle > 5) {
            touch.touchHideScrollBar();
            return;
        }
        this.moveEndTime = new Date;
        this.moveRate = 1.0 * (this.currentY-this.moveStartY) / (this.moveEndTime-this.moveStartTime) * 30;
        this.stop = false;
        this.touchEndAnimate();
    },
    touchEndAnimate: function() {
        this.moveRate = this.moveRate * 19/20;
        if (Math.abs(this.moveRate) < 1) {
            touch.touchHideScrollBar();
            return;
        }
        $(this.selector).scrollTop(1.0 * $(this.selector).scrollTop() - this.moveRate);
        this.touchUpdateScrollBar();
        setTimeout(function(){
            if (!touch.stop) {
                touch.touchEndAnimate();
            }
        }, 13);
        // console.log(this.moveRate);
    },
    touchShowScrollBar: function() {
        var scrollHeight = $(this.selector)[0].scrollHeight;
        var clippedHeight = $(this.selector).height();
        if (scrollHeight > clippedHeight) {
            this.scrollBarElement.fadeIn();
        }
    },
    touchHideScrollBar: function() {
        this.scrollBarElement.fadeOut();
    },
    touchDestroyScollBar: function() {
        this.scrollBarElement.remove();
    },
    touchUpdateScrollBar: function() {
        var scrollHeight = $(this.selector)[0].scrollHeight;
        var clippedHeight = $(this.selector).height();
        var scrollTop = $(this.selector).scrollTop();
        var offsetTop = $(this.selector).offset().top + Math.round(1.0*scrollTop/scrollHeight * clippedHeight);
        this.scrollBarElement.height(Math.round(1.0*clippedHeight*clippedHeight/scrollHeight - this.topOverPixel));
        this.scrollBarElement.offset({top: offsetTop,right:10});
    },
    touchHideTopLoadingBar: function() {
        this.topOverPixel = 0;
        $(this.selector).children(".touch-top-pull-bar").animate({height:0},300,function(){
            $(touch.selector).children(".touch-top-pull-bar").html("Pull to load");
        });
    }
}