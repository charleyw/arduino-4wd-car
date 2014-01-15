robot = (function () {
    var leftJoystick,
        rightJoystick;

    function initialize() {
        // one on the left of the screen
        leftJoystick = new VirtualJoystick({
            container: document.body,
            strokeStyle: 'cyan',
            limitStickTravel: true,
            stickRadius: 150
        });
        // one on the right of the screen
        rightJoystick = new VirtualJoystick({
            container: document.body,
            strokeStyle: 'orange',
            limitStickTravel: true,
            stickRadius: 150
        });
        setInterval(timeIntervalCallback, 1 / 30 * 1000);

        bindEvents();
    }

    function bindEvents() {
        leftJoystick.addEventListener('touchStartValidation', function (event) {
            var touch = event.changedTouches[0];
            if (touch.pageX < window.innerWidth / 2) return true;
            return false
        });

        rightJoystick.addEventListener('touchStartValidation', function (event) {
            var touch = event.changedTouches[0];
            if (touch.pageX >= window.innerWidth / 2) return true;
            return false
        });
    }

    function timeIntervalCallback(){
        var outputEl = document.getElementById('result');
        outputEl.innerHTML = '<b>Left:</b> '
            + (leftJoystick.up() ? ' up' : '')
            + (leftJoystick.down() ? ' down' : '')
            + ' (' + leftJoystick.deltaY() + ') '
            + ' <b>Right:</b> '
            + (rightJoystick.up() ? ' up' : '')
            + (rightJoystick.down() ? ' down' : '')
            + ' (' + rightJoystick.deltaY() + ') ';
    }

    function leftForward() {
        bluetooth.send("lf");
    }

    function leftBackward() {
        bluetooth.send("lb");

    }

    function rightForward() {
        bluetooth.send("rf");
    }

    function rightBackward() {
        bluetooth.send("rb");
    }

    function forward() {
        bluetooth.send("w");
    }

    function backward() {
        bluetooth.send("s");
    }

    function turnLeft() {
        bluetooth.send("a");
    }

    function turnRight() {
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