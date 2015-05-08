/* This object is a class to hold image loading into javascript 
 * create by Yaliang, 5/8/2015
 * ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
 */
function loadedImage(selector,file_index) {
    this.selector = selector;
    this.controller = $(this.selector)[0];
    if (typeof(file_index) == "undefined") {
        this.file_index = 0;
    } else {
        this.file_index = file_index;
    }
    this.reader = new FileReader();
    this.get_file = function(){
        // if the index is over the range of current file list, return false;
        if (this.controller.files.length <= this.file_index) {
            return false;
        }
        this.file = this.controller.files[this.file_index];
        // if the file is undifined, return false
        if (typeof(this.file) == "undefined") {
            return false;
        }

        return true;
    };
    this.parseEXIFdata = function(callback, data){
        if (!this.get_file()) {
            return false
        }
        // define onload callback function 
        // ref: http://stackoverflow.com/questions/27254735/filereader-onload-with-result-and-parameter
        this.reader.onload = (function(root, callback, data){
            // root is this instance, 
            // callback is a callback function
            // data is and object including all data need to pass to callback
            return function(e){
                // parse exif data and store into exifdata
                var image = new Image;
                image.src = e.target.result;
                root.image = image;
                root.src = image.src;
                image_with_exif = EXIF.getData(image, function() {});
                root.exifdata = image_with_exif.exifdata;
                // if callback list not empty, call the last callback function
                if (typeof(callback) != "undefined") {
                    data.self = root;
                    callback(data);
                }
            }
        })(this, callback, data);

        // read file data
        this.reader.readAsDataURL(this.file);

        return true;
    }
    this.crop_into_canvas_and_image = function(data) {
        // config can include width and height
        if (!(('width' in data) && ('height' in data))) {
            return false;
        }
        this.canvas_ready = false;

        var callback = function(callback_data) {
            var root = callback_data.self;
            var image = root.image;
            var canvas = document.createElement("canvas");
            var orientation = root.exifdata.Orientation;
            console.log(orientation);
            var sourceX=0;
            var sourceY=0;
            var destX=0;
            var destY=0;
            var sourceWidth = root.image.width;
            var sourceHeight = root.image.height;
            var destWidth = data.width;
            var destHeight = data.height;

            canvas.width = data.width;
            canvas.height = data.height;
            
            if (sourceHeight < sourceWidth) {
                destWidth = sourceWidth*(destHeight/sourceHeight);
                destX = (canvas.width - destWidth)/2;
            } else if (sourceHeight > sourceWidth) {
                destHeight = sourceHeight*(destWidth/sourceWidth);
                destY = (canvas.height - destHeight)/2;
            }

            var context = canvas.getContext("2d");

            switch(orientation){
                case 8:
                    context.translate(canvas.width/2,canvas.height/2);
                    context.rotate(-90*Math.PI/180);
                    context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, destX-canvas.width/2, destY-canvas.height/2, destWidth, destHeight);
                    context.rotate(90*Math.PI/180);
                    context.translate(-canvas.width/2,-canvas.height/2);
                    break;
                case 3:
                    context.translate(canvas.width/2,canvas.height/2);
                    context.rotate(180*Math.PI/180);
                    context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, destX-canvas.width/2, destY-canvas.height/2, destWidth, destHeight);
                    context.rotate(-180*Math.PI/180);
                    context.translate(-canvas.width/2,-canvas.height/2);
                    break;
                case 6:
                    context.translate(canvas.width/2,canvas.height/2);
                    context.rotate(90*Math.PI/180);
                    context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, destX-canvas.width/2, destY-canvas.height/2, destWidth, destHeight);
                    context.rotate(-90*Math.PI/180);
                    context.translate(-canvas.width/2,-canvas.height/2);
                    break;
                default:
                    context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
            }

            root.canvas = canvas;

            var cropped_image = new Image();
            cropped_image.src = canvas.toDataURL();
            cropped_image.width = data.width;
            cropped_image.height = data.height;
            root.cropped_image = cropped_image;

            root.canvas_ready = true;
        }
        
        this.parseEXIFdata(callback, data);

        return true;
    };

    return this;
}