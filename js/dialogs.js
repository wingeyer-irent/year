/* Allows only numbers */
$("#precio_dia").keydown(function(event){
    if(event.shiftKey){
        event.preventDefault();
    }
    if(event.keyCode !=46 && event.keyCode !=8 && event.keyCode != 37 && event.keyCode !=39){
        if($(this).val().length>=11){
            event.preventDefault();
        }
    }
    if (event.keyCode < 48 || event.keyCode > 57 ){
        if (event.keyCode < 96 || event.keyCode > 105){
            if(event.keyCode !=46 && event.keyCode !=8 && event.keyCode !=37 && event.keyCode !=39){
                event.preventDefault();
            }
        }
    }
});

function setupDemoDialog() {
    var dlg = $('#dialog_demo').dialog({
        autoOpen: false,
        height: 'auto',
        width: 900,
        modal: true,
        resizable: false,
        draggable: true,
        open: function (event, ui) {},
        close: function (event, ui) {},
        buttons: [
            {   
                /*BOTON OK*/
                id: 'button_ok',
                text: 'Ok',
                click: function (capturar) {
                    let argContents = document.getElementById('precio_dia').value;
                    let x = $("div#dias.selected").toArray();
                    if(argContents!=''){
                        for (let i = 0; i < x.length; i++) {
                            /* Add price for each selected day */
                            let dayYear = '[data-dayofyear="'+ x[i].getAttribute("data-dayofyear") + '"]';
                            if($(dayYear).find('#precio').length){
                                $(dayYear).find('#precio').text(argContents);
                            }else{
                                $(dayYear).append('<div class="content" id="precio" >' + argContents + '</div>');
                            }
                        }
                    }else{
                        for (let i = 0; i < x.length; i++) {
                            /* Delete price on empty field*/
                            let dayYear = '[data-dayofyear="'+ x[i].getAttribute("data-dayofyear") + '"]';
                            $(dayYear).find('#precio').remove();
                        }
                        $('[data-dayofyear="365"]').find('#precio').remove();
                    }
                    $(this).dialog('close');
                    $('#precio_dia').val('');
                }
            },
            /*BOTON CERRAR*/
            {
                id: 'button_Close',
                text: 'Close',
                click: function () {
                    $(this).dialog('close');
                    $('#precio_dia').val('');
                }
            }

        ]
    });
    dlg.parent().appendTo(jQuery("body:first"));
}

function openDemoDialog() {
    $('#dialog_demo').dialog('open');
    return false;
}