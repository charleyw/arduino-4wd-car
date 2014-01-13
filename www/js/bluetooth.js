bluetooth = (function(){
    function bindEvents() {
        $("#connectDevice").on("click", function () {
            connect();
        });
        $("#disconnectDevice").on("click", function () {
            flash.info("disconnect device");
            disconnect();
        });
    }

    function initialize(){
        flash.info("start connect");
        bluetoothSerial.list(onDeviceList, generateFailureFunction("List fail"));
        bindEvents();
    }

    function generateFailureFunction(message) {
        var func = function(reason) {
            var details = "";
            if (reason) {
                details += ": " + JSON.stringify(reason);
            }
            flash.error(message + details);
        };
        return func;
    }


    function connect() {
        flash.info("start connect");
        var device = $('#deviceList option:selected').val();
        console.log("Requesting connection to " + device);
        flash.info("Connect to: "+device);
        bluetoothSerial.connect(device, onConnect, onDisconnect);
    }

    function disconnect(event) {
        if (event) {
            event.preventDefault();
        }
        bluetoothSerial.disconnect(onDisconnect);
    }

    function onConnect() {
        flash.info("Connected");

        $("#connectDevice").text("Connected");
    }

    function onDisconnect(reason) {
        flash.info("Disconnected: " + reason);
    }

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // deviceready Event Handler
    //
    function onDeviceList(devices) {
        var option;
        flash.info("starting find device...")
        // remove existing devices
        $("#deviceList").html("");

        devices.forEach(function (device) {
            option = $('<option>',{text:device.name});
            flash.info(device.name + " addr: " + device.address);
            if (device.hasOwnProperty("uuid")) {
                option.val(device.uuid)
            } else if (device.hasOwnProperty("address")) {
                option.val(device.address);
            } else {
                option.val("ERROR " + JSON.stringify(device));
            }
//            option.html(device.name);
            $("#deviceList").append(option);
        });

        $('#deviceList option:first-of-type').attr("selected", "selected");

        if (devices.length === 0) {
            flash.info("No Bluetooth Devices");
            option = document.createElement('option');
            option.innerHTML = "No Bluetooth Devices";
            $("#deviceList").appendChild(option);
        }

        $('#deviceList').selectmenu("refresh");
    }

    return {
        initialize: initialize,
        onDeviceList: onDeviceList,
        connect: connect,
        disconnect: disconnect
    }

})();