describe("robot control", function () {
    beforeEach(function(){
        bluetooth = jasmine.createSpyObj('bluetooth', ['send']);
        joystickStub = {
            addEventListener: function(){},
            deltaY: function(){}
        };
        VirtualJoystick = function() {
            return joystickStub;
        }
        jasmine.Clock.useMock();
        setFixtures('<div id="result">something</div>');
    });

    it("should send correspond speed to arduino", function(){
        spyOn(joystickStub, 'deltaY').andReturn(-100);
        robot.initialize();
        jasmine.Clock.tick(501);
        expect(bluetooth.send).toHaveBeenCalledWith('170,170a');
    });

    it("should send max negative speed to arduino when joystick over 145", function(){
        spyOn(joystickStub, 'deltaY').andReturn(146);
        robot.initialize();
        jasmine.Clock.tick(501);
        expect(bluetooth.send).toHaveBeenCalledWith('-255,-255a');
    });

    it("should send max positive speed to arduino when joystick over -145", function(){
        spyOn(joystickStub, 'deltaY').andReturn(-146);
        robot.initialize();
        jasmine.Clock.tick(501);
        expect(bluetooth.send).toHaveBeenCalledWith('255,255a');
    });

});