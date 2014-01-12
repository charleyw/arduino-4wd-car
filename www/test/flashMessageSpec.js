define(['jquery', 'jasminejquery', 'underscore', 'js/flashMessage'], function ($, jasmine, _, flash) {
    describe("bluetooth view", function () {
        beforeEach(function() {
            setFixtures('<div id="flash-message" style="display: none"></div>');
        });
        it("it should show message in information style", function () {
            debugger;
            flash.info("something");
            expect($('#flash-message')).toHaveClass('info');
            expect($('#flash-message').html()).toBe("something");
        });
    });
});