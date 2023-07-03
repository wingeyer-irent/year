var precio = '';
$(document).ready(function () {
    moment.locale('es-es');
    $('body').prepend(createYear(2023));
    clearSelection();
});
$(window).load(function () {
    setupDemoDialog();
});

function finalizar() {

    const finalizar = document.getElementById("finalizar");

    x = $("#dias.day").toArray();
    console.log(x);
    xxx = $('#precio.content').toArray();
    console.log(xxx);

}

