//TODO with delete button


document.querySelector('.add_button').addEventListener('click',addtask);

document.addEventListener('keypress',function(event){
    if(event.keyCode===13||event.which===13)
        addtask();
});
var tasks=[];

function addtask()
{
    var task,html,newHtml,id,newTask;
    task=document.querySelector('.add_task').value;
    
    html='<div id="%id%"><li>%List%</li><button class="delete_btn">Delete</button></div>'
    id=calculateID();

    
    newTask=new Task(task,id);
    tasks.push(newTask);

    newHtml=html.replace('%List%',task);
    newHtml=newHtml.replace('%id%',newTask.id);
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
            });
            FieldArray[0].focus();
}
calculateID=function(){
    if(tasks.length>0)
        ID=tasks[tasks.length-1].id+1;
    else
        ID=0;
    return ID;
}

var Task=function(task,id){
    this.task=task;
    this.id=id;
}

document.querySelector('.tasks_list').addEventListener('click',deleteTask);


function deleteTask(event){
    var taskID,index,ids,el;
    taskID=event.target.parentNode.id;
    ids=tasks.map(function(current){
        return current.id;
    })
    taskID=parseInt(taskID);
    index=ids.indexOf(taskID);

    if(index!=-1)
    {
        tasks.splice(index,1);
    }
    el=document.getElementById(taskID);
    el.parentNode.removeChild(el);
}







 

