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

    beforeEach(function(){
        setFixtures('<select id="deviceList"></select><a href="#single" id="connectDevice" data-transition="flip" data-role="button">Start</a>');
        $('#deviceList').selectmenu();
    });

    it("should show available devices after initialize", function () {
        bluetooth.initialize();
        expect($('#deviceList option').length).toBe(2);
        expect($('#deviceList option')[0].value).toBe('1234');
        expect($('#deviceList option')[1].value).toBe('testdevice');
        expect($("#deviceList")).toContainHtml('<option value="1234" selected="selected">charleyw</option>');
    });

    it("should connect to device when click button", function () {
        spyOn(bluetoothSerial, "connect");
        bluetooth.initialize();
        $('#connectDevice').click();
        expect(bluetoothSerial.connect).toHaveBeenCalled();
    });
});