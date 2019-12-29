//TODO with delete button
var total=0,tasksDone=0;

document.querySelector('.add_button').addEventListener('click',addtask);

document.addEventListener('keypress',function(event){
    if(event.keyCode===13||event.which===13)
        addtask();
});
var tasks=
{
    csLearning:[],
    household:[],
    Entertainment:[]
};

function addtask()
{
    var task,html,newHtml,id,newTask,taskType,taskType_list;
    task=document.querySelector('.add_task').value;
    if(task!=='')
    {
        taskType=document.querySelector('.taskType').value;

        if(taskType==='csLearning'){
            html='<div id="csLearning-%id%"><li>%List%</li><input type="checkbox" class="Done_btn">Done</input></div>';
            taskType_list='.csLearning';
        }
        else if(taskType==='household'){
            html='<div id="household-%id%"><li>%List%</li><input type="checkbox" class="Done_btn">Done</input></div>';
            taskType_list='.household';
        }
        else{
            html='<div id="Entertainment-%id%"><li>%List%</li><input type="checkbox" class="Done_btn">Done</input></div>';
            taskType_list='.Entertainment'
        }

        newTask=new Task(task,taskType);
        tasks[taskType].push(newTask);
            

        newHtml=html.replace('%List%',task);
        newHtml=newHtml.replace('%id%',newTask.id);
        document.querySelector(taskType_list).insertAdjacentHTML('beforeend',newHtml);
        clearfield();
        total++;
        Donetasks(taskType);
    }
};   

function clearfield()
{
            var fields,FieldArray;
            fields=document.querySelectorAll('.add_task');
            FieldArray=Array.prototype.slice.call(fields);
            FieldArray.forEach(function(current,index,array){
                current.value="";
            });
            FieldArray[0].focus();
}


var Task=function(task,type){
    this.task=task;
    id=new Date();
    this.id=id.getTime();
    this.type=type;
    this.done=false;
}

document.querySelector('.tasks_list').addEventListener('click',done);

function done(event)
{

    var taskID,ID,index,splitID,ids;
    taskID=event.target.parentNode.id;
    splitID=taskID.split('-');
       
    ID=parseInt(splitID[1]);

    ids=tasks[splitID[0]].map(function(current){
        return current.id;
    });
    index=ids.indexOf(ID);
    if(!tasks[splitID[0]][index].done)
    {         
        tasks[splitID[0]][index].done=true;
        tasksDone++;
        Donetasks(splitID[0]);
    }
}


function Donetasks(type)
{
    var total_type=0,tasksDone_type=0;
    tasks[type].forEach(function(current)
    {
        if(current.done){
            tasksDone_type++;
        }
        total_type++;
    });
    document.querySelector('.done_'+type).textContent='Done'+' '+tasksDone_type+'/'+total_type;
    document.querySelector('.tasks_done').textContent='Total tasks Done'+' '+tasksDone+'/'+total;
}












 

