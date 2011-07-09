function drawMouseOver(e){
    if(houseManager.getRoom().getPoints().length){
            var p = $("#drawer").position();
            $("#buffer").html("");
            var gr = new jsGraphics("buffer");
            gr.setColor("#0c0c0c");
            gr.setStroke(3);
            var cursor;
            var previousPoint = houseManager.getRoom().getPointByNumber(houseManager.getRoom().points.length-1);
            if(BrowserDetect.browser == "Firefox"){
                point = new Point(e.pageX-p.left,e.pageY-p.top,1);
                cursor = new Point(e.pageX-p.left,e.pageY-p.top,1);
            }else{
                e = window.event;
                point = new Point(e.x-p.left,e.y-p.top,1);
                cursor = new Point(e.x-p.left,e.y-p.top,1);
            }
            var distance = houseManager.getRoom().getDistance(previousPoint,cursor);
            $(".live-notice").html("<p>"+Math.round(distance/50)*houseManager.getZoom()+"m</p>");
            $(".live-notice").attr("style","position:absolute;top:"+parseInt(e.y-30)+"px;left:"+parseInt(e.x+30)+"px");          
            gr.drawLine(p.left+previousPoint.getX()/houseManager.getZoom(),p.top+previousPoint.getY()/houseManager.getZoom(),p.left+cursor.getX(),p.top+cursor.getY());
            gr.paint();            
        }
}

function addPoint(e){
        var p = $("#drawer").position();
        var point;
        if(BrowserDetect.browser == "Firefox"){
            point = new Point(e.pageX-p.left,e.pageY-p.top,1);
        }else{
            e = window.event;
            point = new Point(e.x-p.left,e.y-p.top,1);
        }
        houseManager.getRoom().addPoint(point);
        // Check if the room is completely walled
        if(houseManager.getRoom().isFinished() == true){
            $(".live-notice").html("");
            houseManager.addRoom(new Room(new Array(),"room"));
        }
}
function clearCanva(){
    houseManager.clearCanva();
}
function redraw(){
    houseManager.draw();
}

function getNearestNodePoint(x,y){
    var _x, _y= 0;
    _x = parseInt(computeNearestCoordinate(x)*houseManager.getZoom());
    _y = parseInt(computeNearestCoordinate(y)*houseManager.getZoom());
    return new Point(_x,_y);
}

function computeNearestCoordinate(number){
    var nearestCoordinate;
    var a = number;
    var b = number+1;
    if(number>9){
        a= (Math.round(number/10))*10;
        b= (Math.round(number/10)+1)*10;
    }
    if(Math.abs(a-number)<Math.abs(b-number))
        nearestCoordinate = a;
    else
        nearestCoordinate = b;
    return nearestCoordinate;
}

function putInDrawer(pt,pt2){
    var p = $("#drawer").position();
    var point, point2;
    if((pt.getX()/houseManager.getZoom())+houseManager.getOrigin().getX()>$("#drawer").width() || (pt.getY()/houseManager.getZoom())+houseManager.getOrigin().getY()>$("#drawer").height()){
        point = new Point(pt.getX(),pt.getY());
        point2 = new Point(pt2.getX(),pt2.getY());
    }else{
        point = new Point(pt2.getX(),pt2.getY());
        point2 = new Point(pt.getX(),pt.getY());
    }
    
    var a = 0;
    if(point.getX() != point2.getX()/* && point.getY() != point2.getY()*/){
        a = (point.getY()-point2.getY())/(point.getX()-point2.getX());
    }
    var k = point.getY()-(a)*point.getX();
    var _x = point.getX();
    var _y = point.getY();
    if(point.getX()/houseManager.getZoom()>$("#drawer").width()){
        _x = $("#drawer").width();
        _y = a*_x+k;
    }if(point.getY()/houseManager.getZoom()>$("#drawer").height()){
        _x = a!=0 ? (_y-k)/a : k;
        _y = $("#drawer").height();
    }
    point.setX(_x);
    point.setY(_y);
    return point;
}