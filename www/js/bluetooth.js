define(['jquery', "js/flashMessage"],function($, flash){
    function initialize(){
        $("#connectBtn").click(function(){
            connect();
        });
    }

    function connect() {
        flash.info("start connect");
        var device = $('#deviceList input[data-cacheval="true"]').val();
        console.log("Requesting connection to " + device);
        bluetoothSerial.connect(device, onConnect, onDisconnect);
    }

    function disconnect(event) {
        if (event) {
            event.preventDefault();
        }
        bluetoothSerial.disconnect(onDisconnect);
    }

    function onConnect() {
        $("#connectDevice").text("Connected");
    }

    function onDisconnect() {
        flash.info("bt connect failed");
    }

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // deviceready Event Handler
    //
    function onDeviceList(devices) {
        var option;

        // remove existing devices
        $("#deviceList").html("");

        devices.forEach(function (device) {
            option = $('<input>',{name:'device', type:'radio', id:device.name})
            if (device.hasOwnProperty("uuid")) {
                option.val(device.uuid)
            } else if (device.hasOwnProperty("address")) {
                option.val(device.address);
            } else {
                option.val("ERROR " + JSON.stringify(device));
            }
            option.html(device.name);
            $("#deviceList").append(option).append($('<label>',{for:device.name ,text:device.name}));
            $("#deviceList").append(option);
        });

        if (devices.length === 0) {
            option = document.createElement('option');
            option.innerHTML = "No Bluetooth Devices";
            $("#deviceList").appendChild(option);
        }

        $("#deviceList").trigger('create');

    }

    return {
        initialize: initialize,
        onDeviceList: onDeviceList,
        connect: connect,
        disconnect: disconnect
    }

});