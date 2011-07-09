var Point = $.inherit(
    {

        __constructor : function(x,y,position) {
                this.x = x;
		this.y = y;
		this.position = position;
        },

        getX : function() {
            return this.x;
        },
        getY : function() {
            return this.y;
        },
        setX : function(x) {
            this.x = x;
        },
        setY : function(y) {
            this.y = y;
        },

        getPosition : function() {
            return this.position;
        },
        getType : function() {
            return "Point";
        }

    },
    {
        staticMember : 'staticPoint'
    });
