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

function clearSelection(argClass) {
    currentSelection = new clsSelection();
    $('div.day').removeClass(argClass);
}
function beginSelection() { }
function endSelection() { }

let fisrtShift = '';
function select(argSelection, argEventData){
    if(!argEventData.ctrlKey && !argEventData.shiftKey){
        if($('div').hasClass('selected')&& 
        argSelection.attr('data-dayofyear')!=$('div.selected').attr('data-dayofyear') ||
        argSelection.attr('data-month')!=$('div.selected').attr('data-month')
        ){
            clearSelection('selected shift-selected');
            argSelection.addClass('selected');
        }else{
            argSelection.removeClass('selected');
        }
    }else  if(!argEventData.shiftKey && argEventData.ctrlKey) {
        let x = argSelection.toArray();
        let cont = 0;
        for(let i=0; i<x.length; i++){
            if(x[i].classList.contains('selected')){
                cont=cont+1;
            }
        }
        if(cont>=0 && argSelection.length>1 && argSelection.length!=cont){
            argSelection.addClass('selected');
        }else if(cont == argSelection.length){
            argSelection.removeClass('selected');
        }else{
            argSelection.hasClass('selected') ? argSelection.removeClass('selected') : argSelection.addClass('selected');
        }
        clearSelection('shift-selected');
    }else if(!argEventData.ctrlKey && argEventData.shiftKey){
        if(fisrtShift==''){
            fisrtShift=argSelection;
            fisrtShift.addClass('shift-selected');
        }else{
            fisrtShift.removeClass('shift-selected');
            console.log(argSelection);
            console.log(fisrtShift);
            console.log(fisrtShift.attr('data-month'));
            fisrtShift='';
            if(fisrtShift.selector.contains('month')){
                console.log('contiene mes');
            }
        }
    }
}

