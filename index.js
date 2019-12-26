
document.querySelector('.add_button').addEventListener('click',addtask);

document.addEventListener('keypress',function(event){
    if(event.keyCode===13||event.which===13)
        addtask();
})

function addtask()
{
var task=document.querySelector('.add_task').value;
    var html='<li>List</li>'
    var newHtml=html.replace('List',task);
    document.querySelector('.tasks_list').insertAdjacentHTML('beforeend',newHtml);
    init();
};   

function init()
{
            var fields,FieldArray;
            fields=document.querySelectorAll('.add_task');
            FieldArray=Array.prototype.slice.call(fields);
            FieldArray.forEach(function(current,index,array){
                current.value="";
                console.log('sd');
            });
            FieldArray[0].focus();
}
