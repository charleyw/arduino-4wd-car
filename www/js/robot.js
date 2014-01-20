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
        setInterval(timeIntervalCallback, 500);

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
        var outputEl = document.getElementById('result'),
            leftSpeed,
            rightSpeed;
        leftSpeed = leftJoystick.deltaY() > 145 || leftJoystick.deltaY() < -145 ? 255 : Math.round((-leftJoystick.deltaY())/150 * 255);
        rightSpeed = rightJoystick.deltaY() > 145 || rightJoystick.deltaY() < -145 ? 255 : Math.round((-rightJoystick.deltaY())/150 * 255);
        outputEl.innerHTML = '<b>Left Speed: </b>'
            + leftSpeed
            + ' <b>right Speed: </b>'
            + rightSpeed;
        bluetooth.send(leftSpeed+","+rightSpeed+"a");

    }

    return {
        initialize: initialize
    }
})();