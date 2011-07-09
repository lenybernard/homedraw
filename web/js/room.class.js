var Room = $.inherit(
    {
        __constructor : function(points,label) {
            this.points = points;
            this.label = label;
            this.finished = false;
            this.marge = Math.sqrt(10*10+10*10); /* space btw 2 points */
        },
        getPoints : function() {
            return this.points;
        },
        getLabel : function() {
            return this.label;
        },
        addPoint : function(point){
            point = getNearestNodePoint(point.getX(),point.getY());
            for(i in this.points)
            {
                var pt = this.points[i];                
                if(this.compare2Points(point,pt)){
                    if(parseInt(i) == 0){
                        if(this.points.length<3){
                            alert("La pièce que vous avez éssayé de faire ne compte qu'un seul mur !");
                            return false;
                        }
                        this.finish();
                        this.label = prompt("Pièce terminée ! Quel est le nom de la pièce ?");
                        point.setX(pt.getX());
                        point.setY(pt.getY());
                        $(".points.inactive").removeClass('inactive');
                    }else{
                        alert("Vous avez fermé la pièce en laissant un mur en dehors. Vous devez faire une boucle !");
                        return false;
                    }
                }
            }
            
            this.points.push(point);
            
            var gr = new jsGraphics("drawer");
            var p = $("#drawer").position();
            if(this.points.length > 1){
                var previousPoint = this.getPointByNumber(this.points.length-2);
                var lastPoint = this.getPointByNumber(this.points.length-1);
                gr.setColor("#0c0c0c");
                gr.setStroke(3);
                gr.drawLine(p.left+previousPoint.getX()/houseManager.getZoom(),p.top+previousPoint.getY()/houseManager.getZoom(),p.left+lastPoint.getX()/houseManager.getZoom(),p.top+lastPoint.getY()/houseManager.getZoom());
                if(this.isFinished() != true)
                    $("#drawer").append('<div class="points inactive" id="point-'+parseInt(p.left+lastPoint.getX()-this.marge)+'-'+parseInt(p.top+lastPoint.getY()-this.marge)+'" style="position:absolute;left:'+parseInt(p.left+lastPoint.getX()-this.marge)+'px;top:'+parseInt(p.top+lastPoint.getY()-this.marge)+'px;width:'+this.marge*2+'px;height:'+this.marge*2+'px;">');
            }else{
                $("#drawer").append('<div class="points" id="point-'+parseInt(p.left+point.getX()-this.marge)+'-'+parseInt(p.top+point.getY()-this.marge)+'" style="position:absolute;left:'+parseInt(p.left+point.getX()-this.marge)+'px;top:'+parseInt(p.top+point.getY()-this.marge)+'px;width:'+this.marge*2+'px;height:'+this.marge*2+'px;">');
            }
            gr.paint();
        },
        finish : function(i){
            this.finish = true;
        },
        isFinished : function(){
            return this.finish;
        },
        getPointByNumber : function(i){
            return this.points[i];
        },
        getDistance : function(pointA, pointB){
            var deltaX, deltaY;
            if(pointA.getX()>pointB.getX()){
                deltaX = pointA.getX()-pointB.getX();
            }
            else{
                deltaX = pointB.getX()-pointA.getX();
            }
            if(pointA.getY()>pointB.getY()){
                deltaY = pointA.getY()-pointB.getY();
            }
            else{
                deltaY = pointB.getY()-pointA.getY();
            }
            return Math.sqrt(deltaX*deltaX+deltaY*deltaY);
        },
        compare2Points : function(pointA, pointB){
            var distance = this.getDistance(pointA, pointB)
            return (distance<this.marge+this.marge/2)? true  : false;
        },
        removeLastPointAdded : function(){
            this.points.pop();
        },
        draw: function(){
            var gr = new jsGraphics("drawer");
            var drawablePts = new Array();
            for(var i= 0; i < this.points.length; i++)
            {
                var p = $("#drawer").position();
                if(this.points[i].getX() <= ($("#drawer").width())*houseManager.getZoom() && 
                   this.points[i].getY() <= ($("#drawer").height())*houseManager.getZoom()){
                    drawablePts.push(this.points[i]);
                }else{
                    drawablePts.push(0);                    
                }
            }
            var previousPoint, currentPoint;
            console.log(drawablePts);
            for(i= 0; i < drawablePts.length; i++)
            {
                if(i > 0){
                    if(drawablePts[i]!=0 || drawablePts[i]==0 && drawablePts[i-1]!=0){
                        previousPoint = drawablePts[i-1]!=0 ? drawablePts[i-1] : this.getPointByNumber(i-1);
                        currentPoint = drawablePts[i]!=0 ? drawablePts[i] : this.getPointByNumber(i);
                        var point1,point2;
                        if(previousPoint.getX()/houseManager.getZoom()>$("#drawer").width() || previousPoint.getY()/houseManager.getZoom()>$("#drawer").height()){
                            point1 = drawablePts[i] !=0 ? drawablePts[i] : this.getPointByNumber(i);
                            point2 = putInDrawer(previousPoint,currentPoint);
                        }else if(currentPoint.getX()/houseManager.getZoom()>$("#drawer").width() || currentPoint.getY()/houseManager.getZoom()>$("#drawer").height()){
                            point1 = putInDrawer(currentPoint,previousPoint);
                            point2 = drawablePts[i-1] !=0 ? drawablePts[i-1] : this.getPointByNumber(i-1);
                        }else{
                            point1 = previousPoint;
                            point2 = currentPoint;
                        }
                        gr.setColor("#0c0c0c");
                        gr.setStroke(3);
                        gr.drawLine(p.left+(point1.getX()+houseManager.getOrigin().getX())/houseManager.getZoom(),p.top+(point1.getY()+houseManager.getOrigin().getY())/houseManager.getZoom(),p.left+(point2.getX()+houseManager.getOrigin().getX())/houseManager.getZoom(),p.top+(point2.getY()+houseManager.getOrigin().getY())/houseManager.getZoom());
                        $("#drawer").append('<div class="points" id="point-'+parseInt(p.left+point2.getX()-this.marge)/houseManager.getZoom()+'-'+parseInt(p.top+point2.getY()-this.marge)/houseManager.getZoom()+'" style="position:absolute;left:'+parseInt(p.left+point2.getX()-this.marge)/houseManager.getZoom()+'px;top:'+parseInt(p.top+point2.getY()-this.marge)/houseManager.getZoom()+'px;width:'+this.marge*2+'px;height:'+this.marge*2+'px;">');
                        
                        gr.paint();
                    }
                    /*
                    if(drawablePts[i]!=0 || drawablePts[i]==0 && drawablePts[i-1]!=0){
                        previousPoint = drawablePts[i-1]!=0 ? drawablePts[i-1] : this.getPointByNumber(i-1);
                        var currentPoint = drawablePts[i] !=0 ? drawablePts[i] : this.getPointByNumber(i);
                        var currentPoint = putInDrawer(currentPoint,previousPoint);
                        gr.setColor("#0c0c0c");
                        gr.setStroke(3);
                        gr.drawLine(p.left+(previousPoint.getX())/houseManager.getZoom(),p.top+(previousPoint.getY())/houseManager.getZoom(),p.left+(currentPoint.getX())/houseManager.getZoom(),p.top+(currentPoint.getY())/houseManager.getZoom());
                        $("#drawer").append('<div class="points" id="point-'+parseInt(p.left+currentPoint.getX()-this.marge)/houseManager.getZoom()+'-'+parseInt(p.top+currentPoint.getY()-this.marge)/houseManager.getZoom()+'" style="position:absolute;left:'+parseInt(p.left+currentPoint.getX()-this.marge)/houseManager.getZoom()+'px;top:'+parseInt(p.top+currentPoint.getY()-this.marge)/houseManager.getZoom()+'px;width:'+this.marge*2+'px;height:'+this.marge*2+'px;">');
                    }*/
                }
            }
            gr.paint();
        }
    },
    {
        staticMember : 'staticRoom'
    });