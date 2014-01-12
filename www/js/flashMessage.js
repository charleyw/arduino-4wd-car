flash = (function() {
    var flashMessage = '#flash-message';

    function show() {
        $(flashMessage).fadeIn(400).delay(1000).fadeOut(400); //fade out after 3 seconds
    }

    function changeMessageStyle(style) {
        $(flashMessage).removeClass();
        $(flashMessage).addClass(style);
    }

    function info(message){
        $(flashMessage).html(message);
        changeMessageStyle('info');
        show();
    }
    function error(message){
        $(flashMessage).html(message);
        changeMessageStyle('info');
        show();
    }

    return {
        info: info,
        error: error
    }
})();