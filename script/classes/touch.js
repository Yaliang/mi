/* This object is a class to handle custom touch event
 * create by Yaliang, 4/27/2015
 */
touch = {
    touchInitialize: function(selector) {
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
        })
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
        // console.log(this.moveRate);
    },
    touchEndEventHandler: function(event) {
        if (this.moveSlowCircle > 5) {
            touch.touchHideScrollBar();
            return;
        }
        this.moveEndTime = new Date;
        this.moveRate = (this.currentY-this.moveStartY) / (this.moveEndTime-this.moveStartTime) * 50;
        this.stop = false;
        this.touchEndAnimate();
    },
    touchEndAnimate: function() {
        this.moveRate = this.moveRate * 29/30;
        if (Math.abs(this.moveRate) <= 0.1) {
            touch.touchHideScrollBar();
            return;
        }
        $(this.selector).scrollTop($(this.selector).scrollTop() - this.moveRate);
        this.touchUpdateScrollBar();
        setTimeout(function(){
            if (!touch.stop) {
                touch.touchEndAnimate();
            }
        }, 40);
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
        this.scrollBarElement.height(Math.round(1.0*clippedHeight*clippedHeight/scrollHeight));
        this.scrollBarElement.offset({top: offsetTop,right:10});
    }
}