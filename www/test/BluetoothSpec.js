describe("bluetooth view", function () {
    bluetoothSerial = {
        list: function (onDevicesList, onError) {
            onDevicesList([
                {uuid: '1234', name: 'charleyw'},
                {address: 'testdevice', name: 'hc-h6'}
            ]);
        },
        connect: function (device, onConnect, onDisconnect) {
        }
    }

    it("should show available devices after initialize", function () {
        setFixtures('<fieldset data-role="controlgroup" id="deviceList"></fieldset>');
        bluetooth.initialize();
        expect($('#deviceList input').length).toBe(2);
        expect($('#deviceList input')[0].value).toBe('1234');
        expect($('#deviceList input')[1].value).toBe('testdevice');
    });

    it("should connect to device when click button", function () {
        bluetoothSerial.list = function(){}
        setFixtures('<fieldset data-role="listview" id="deviceList" class="ui-listview"><div class="ui-radio"><label for="charleyw" class="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-radio-on">charleyw</label><input name="device" type="radio" id="charleyw" value="1234" data-cacheval="false"></div><div class="ui-radio"><label for="hc-h6" class="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-radio-off">hc-h6</label><input name="device" type="radio" id="hc-h6" value="testdevice" data-cacheval="true"></div></fieldset><a href="#single" id="connectBtn" data-transition="flip" data-role="button">Start</a>');
        spyOn(bluetoothSerial, "connect");
        bluetooth.initialize();
        $('#connectBtn').click();
        expect(bluetoothSerial.connect).toHaveBeenCalled();
    });
});