/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        $(document).bind('deviceready', this.deviceReady);
    },
    deviceReady: function () {
        $('#bluetooth').bind('pagebeforeshow', function (event) {
            bluetoothSerial.list(app.ondevicelist, function () {
                app.showStatus("error");
            });
        });

        $("#connectDevice").ontouchstart = app.connect;
        $("#connectDevice").click = app.connect;
    },

    connect: function () {
        app.showStatus("connect");
        console.log("connect");
        var device = $('#deviceList input[data-cacheval="true"]').val();
        console.log("Requesting connection to " + device);
        bluetoothSerial.connect(device, app.onConnect, app.onDisconnect);
    },
    disconnect: function (event) {
        if (event) {
            event.preventDefault();
        }
        bluetoothSerial.disconnect(app.ondisconnect);
    },
    onConnect: function () {
        app.showStatus("connected");
        $("#connectDevice").text("Connected");
    },
    onDisconnect: function () {
        app.showStatus("failed");
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // deviceready Event Handler
    //
    ondevicelist: function (devices) {
        var option;

//        app.showStatus("Device num: " + devices);
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
            app.showStatus("device name: " + device.name);
            $("#deviceList").append(option).append($('<label>',{for:device.name ,text:device.name}));
            $("#deviceList").append(option);
        });

        if (devices.length === 0) {
            option = document.createElement('option');
            option.innerHTML = "No Bluetooth Devices";
            $("#deviceList").appendChild(option);
        }

        $("#deviceList").trigger('create');
        app.showStatus("list all devices");

    },

    showStatus: function (message) {
        $('.error').html(message);
        $('.error').fadeIn(400).delay(1000).fadeOut(400); //fade out after 3 seconds
    },
    onMenuBtnClick: function () {

    }
};
