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

    function sign(number) {
        return number ? number < 0 ? 1 : -1 : 0;
    }

    function timeIntervalCallback(){
        var outputEl = document.getElementById('result'),
            leftDelta = leftJoystick.deltaY(),
            rightDelta = rightJoystick.deltaY(),
            leftSpeed,
            rightSpeed;
        leftSpeed = leftDelta > 145 || leftDelta < -145 ? sign(leftDelta) * 255 : Math.round((-leftDelta)/150 * 255);
        rightSpeed = rightDelta > 145 || rightDelta < -145 ? sign(rightDelta) * 255 : Math.round((-rightDelta)/150 * 255);
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