/* This object is a class to handle custom touch event
 * create by Yaliang, 4/27/2015
 */
touch = {
    touchInitialize: function(selector) {
        this.selector = selector;
        $(this.selector).stop();
        this.stop = true;
        $(this.selector).unbind("touchstart").bind("touchstart", function(event){
            touch.touchStartEventHandler(event);
        });
        $(this.selector).unbind("touchmove").bind("touchmove", function(event){
            touch.touchMoveEventHandler(event);
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
            return;
        }
        $(this.selector).scrollTop($(this.selector).scrollTop() - this.moveRate);
        setTimeout(function(){
            if (!touch.stop) {
                touch.touchEndAnimate();
            }
        }, 13);
        // console.log(this.moveRate);
    }
}