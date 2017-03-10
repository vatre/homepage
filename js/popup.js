$(document).ready(function() {
    var popupMapping = {
        //"c": "calculator",
    }

    function openPopupContainer() {
        $("#popup-container").css('display', 'initial');
    }

    function openPopup(key) {
        var sel = "#" + popupMapping[key];
        $(sel).css('display', 'initial');
    }
});
