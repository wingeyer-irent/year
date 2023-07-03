let lastSelection='';
class clsSelection {
    #dates;
    constructor() {
        this.#dates = [];
    }
    add(argDate) {
        this.#dates.push(argDate);
    }
}
var currentSelection;

function clearSelection() {
    currentSelection = new clsSelection();
    $('div.day').removeClass('selected');
}
function beginSelection() { }
function endSelection() { }

function select(argSelection, argEventData){
    if(lastSelection==''){
        lastSelection=argSelection;
    }
    if (!argEventData.ctrlKey && !argEventData.shiftKey && $('div').hasClass('selected')){
        if(lastSelection.selector!=argSelection.selector&&argSelection.length>0){
            console.log(lastSelection.selector);
            console.log(argSelection.selector);
            clearSelection();
            argSelection.addClass('selected');
            console.log(lastSelection.selector);
            console.log(argSelection.selector);
        }else{
            argSelection.removeClass('selected');
            console.log(lastSelection.selector);
            console.log(argSelection.selector);
        }
    }else{
        argSelection.hasClass('selected') ? argSelection.removeClass('selected') : argSelection.addClass('selected');
            console.log(lastSelection.selector);
            console.log(argSelection.selector);
    }
    
}