
var TotalTasks=0,TotalDone=0;

document.querySelector('.add_cate_btn').addEventListener('click',addCategory);

function addCategory()
{
    var category,htmlOption,htmlTitle;
    category=document.querySelector('.task_cate').value;
    if(category!=='')
    {
        tasks[category]=[];

        htmlOption='<option value="%Category%">%category%</option>'

        htmlOption=htmlOption.replace('%Category%',category);
        htmlOption=htmlOption.replace('%category%',category);

        document.querySelector('.taskType').insertAdjacentHTML('beforeend',htmlOption);

        htmlTitle='<div><h3>Title</h3><h5 class="category_task_done">Done 0/0</h5><ol class="task_type"></ol></div>'

        htmlTitle=htmlTitle.replace('Title','->'+category);
        htmlTitle=htmlTitle.replace('category_task_done','done_'+category);
        htmlTitle=htmlTitle.replace('task_type',category);

        document.querySelector('.tasks_done').insertAdjacentHTML('beforeend',htmlTitle);

        clearFields();
    }
}


document.querySelector('.add_button').addEventListener('click',addTask);


var tasks=new Object();


function addTask()
{
    var task,html,taskType,newTask;
    task=document.querySelector('.add_task').value;
    taskType=document.querySelector('.taskType').value;

    if(task!=='')
    {

        newTask=new Task(task,taskType);
        tasks[taskType].push(newTask);

        html='<div id="%task_type-%id%"><li>%List%</li><input type="checkbox" class="Done_btn">Done</input></div>';

        html=html.replace('%task_type-%id%',taskType+'-'+newTask.id);
        html=html.replace('%List%',task);

        document.querySelector('.'+taskType).insertAdjacentHTML('beforeend',html);

        clearFields();

        TotalTasks++;

        CalcDone(taskType);
    }

}


var Task=function(task,type)
{
    this.task=task;
    id=new Date();
    this.id=id.getTime();
    this.type=type;
    this.done=false;
}


function clearFields()
{
    var field;
    field=document.querySelector('.task_cate');
    field.value="";
    filed=document.querySelector('.add_task');
    filed.value="";
}


document.querySelector('.tasks_list').addEventListener('click',taskDone);

function taskDone(event)
{
    var taskid,splitid,ID;
    taskid=event.target.parentNode.id;
    splitid=taskid.split('-');
    ID=parseInt(splitid[1]);
    ids=tasks[splitid[0]].map(function(current){
        return current.id;
    });
    index=ids.indexOf(ID);
    if(!(tasks[splitid[0]][index].done))
    {

        tasks[splitid[0]][index].done=true;
        TotalDone++;
        CalcDone(splitid[0]);
    }
}







function CalcDone(category)
{
    var done_cate=0,total_cate=0;
    tasks[category].forEach(function(current){
        if(current.done){
            done_cate++;
        }
        total_cate++;
    });
    document.querySelector('.done_'+category).textContent='Done'+' '+done_cate+'/'+total_cate;
    document.querySelector('.TasksDone').textContent='Done'+' '+TotalDone+'/'+TotalTasks;
}













 

