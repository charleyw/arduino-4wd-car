robot = (function(){
    function initialize(){
        $('#forward').click(function(){
            forward();
        });
        $('#backward').click(function(){
            backward();
        });
        $('#left').click(function(){
            turnLeft();
        });
        $('#right').click(function(){
            turnRight();
        });
    }

    function forward(){
        bluetooth.send("w");
    }

    function backward(){
        bluetooth.send("s");
    }

    function turnLeft(){
        bluetooth.send("a");
    }

    function turnRight(){
        bluetooth.send("d");
    }

    return {
        forward: forward,
        backward: backward,
        turnLeft: turnLeft,
        turnRight: turnRight,
        initialize: initialize
    }
})();