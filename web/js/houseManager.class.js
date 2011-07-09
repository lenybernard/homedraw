var HouseManager = $.inherit(
    {
        __constructor : function(room,tool,zoom) {
		this.rooms = Array(room);
		this.room = room;
		this.tool = tool;
		this.zoom = zoom;
		this.origin = new Point(0,0);
		this.origin_move_point = new Point(0,0);
		this.is_moving = 0;
        },
        /* get all the rooms */
        getRooms : function() {
            return this.rooms;
        },
        /* get the current room */
        getRoom : function() {
            return this.rooms[this.rooms.length-1];
        },
        getTool : function() {
            return this.tool;
        },
        setTool : function(tool) {
            this.tool = tool;
        },
        getOrigin : function() {
            return this.origin;
        },
        setOrigin : function(x,y) {
            this.origin = new Point(x,y);
        },
        getOriginMovePoint : function() {
            return this.origin_move_point;
        },
        setOriginMovePoint : function(x,y) {
            this.origin_move_point = new Point(x,y);
        },
        initMove : function() {
            this.is_moving = 0;
        },
        startMove : function() {
            this.is_moving = 1;
        },
        isMoving : function() {
            return this.is_moving;
        },
        getZoom : function() {
            return this.zoom;
        },
        setZoom : function(zoom) {
            this.zoom = zoom;
        },
        getType : function() {
            return "HouseManager";
        },
        addRoom : function(room){
            this.rooms.push(room);
        },draw: function(){
            for(var i= 0; i < this.rooms.length; i++){
                this.rooms[i].draw(this.zoom);
            }
        },clearCanva: function(){
            $("#drawer").html("<div class='live-notice'></div><div id='buffer'></div>");
        }

    },
    {
        staticMember : 'staticHouseManager'
    });
