var rooms = new Room(new Array(),"room");
var tools = "draw";
var zoom = 1;
var houseManager = new HouseManager(rooms,tools,zoom);

$(document).ready(function(){
    $("#drawer").mousemove(function(e){
        if(houseManager.getTool() == "draw"){
            drawMouseOver(e);
        }else if(houseManager.getTool() == "move"){
            if(houseManager.isMoving() !=0){
                var p = $("#drawer").position();
                var cursor;
                if(BrowserDetect.browser == "Firefox"){
                    cursor = new Point(e.pageX-p.left,e.pageY-p.top,1);
                }else{
                    e = window.event;
                    cursor = new Point(e.x-p.left,e.y-p.top,1);
                }
                var newOrigin = new Point(parseInt(housemanager.getOriginMovePoint.getX()-cursor.getX()-houseManager.getOrigin().getX()),parseInt(housemanager.getOriginMovePoint.getY()-cursor.getY()-houseManager.getOrigin().getY()));
                $("#drawer").css("background-position", newOrigin.getX()+"px "+newOrigin.getY()+"px");
                houseManager.setOrigin(newOrigin.getX(),newOrigin.getY());
                clearCanva();
                redraw();
            }
        }
    });
    $("#drawer").mousedown(function(e){
        if(houseManager.getTool() == "draw"){
            addPoint(e);
        }else if(houseManager.getTool() == "move"){
            var p = $("#drawer").position();
            var cursor;
            if(BrowserDetect.browser == "Firefox"){
                cursor = new Point(e.pageX-p.left,e.pageY-p.top,1);
            }else{
                e = window.event;
                cursor = new Point(e.x-p.left,e.y-p.top,1);
            }
            houseManager.setOriginMovePoint(cursor.getX(),cursor.getY());
            houseManager.startMove();
        }
    });
    $("#drawer").mouseup(function(e){
        if(houseManager.getTool() == "draw"){
            addPoint(e);
        }else if(houseManager.getTool() == "move"){
            houseManager.initMove();
        }
    });
    
    $('#zoom').slider({
            value:1,
            min: 1,
            max: 3,
            step: -1,
            slide: function( event, ui ) {
                  $('#drawer').attr('class','zoom-'+ui.value);
                  houseManager.setZoom(ui.value);
                  clearCanva();
                  redraw();
            }
    });
});

function setTool(tool){
    houseManager.setTool(tool);
    $('#drawer').removeClass("draw");
    $('#drawer').removeClass("move");
    $('#drawer').addClass(tool);
    $('#actions li').attr("class","");
    $('#actions li#'+tool).addClass("active");
}
function eraseHouse(){
    if(confirm("Etes-vous sur ? Cette action va totalement supprimer ce qui a été fait jusqu'à présent")){
        houseManager = new HouseManager(new Room(new Array(),"room"),houseManager.getTool());
        houseManager.clearCanva();
        redraw();
    }
}

