var TotalTasks=0,TotalDone;
/*
localStorage.removeItem('categories');
localStorage.removeItem('cat');
localStorage.removeItem('tasks');
localStorage.removeItem('TotalDone');
localStorage.removeItem('TotalTasks');

*/
document.querySelector('.add_cate_btn').addEventListener('click',addCategory);

var categories=[];


function addCategory()
{
    var category;
    console.log(tasks);
    category=document.querySelector('.task_cate').value;
    categories.push(category);
    StoreCategory(categories);
    CategoryMaker(category);
}

function CategoryMaker(category)
{
    var htmlOption,htmlTitle;

    if(category!=='')
    {   
        if(!tasks[category])
        {
            tasks[category]=[];
        }

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

if(!localStorage.getItem('cat'))
{
    var tasks=new Object();
    TotalTasks=0,TotalDone=0;
}

function addTask()
{
    var taskType,task,newTask;
    task=document.querySelector('.add_task').value;
    taskType=document.querySelector('.taskType').value;
    newTask=new Task(task,taskType);
    tasks[taskType].push(newTask);
    StoreTask(tasks);
    TaskMaker(newTask);
}


function TaskMaker(newTask)
{
    var html;
    if(newTask.task!=='')
    {

        html='<div id="%task_type-%id%"><li>%List%</li><input type="checkbox" class="Done_btn">Done</input></div>';

        html=html.replace('%task_type-%id%',newTask.type+'-'+newTask.id);
        html=html.replace('%List%',newTask.task);

        document.querySelector('.'+newTask.type).insertAdjacentHTML('beforeend',html);

        clearFields();

        TotalTasks++;
        CalcDone(newTask.type);
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
        StoreDone(TotalDone);
        StoreTask(tasks);
        CalcDone(splitid[0]);
    }
    else if((tasks[splitid[0]][index].done))
    {

        tasks[splitid[0]][index].done=false;
        TotalDone--;
        StoreDone(TotalDone);
        StoreTask(tasks);
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



function StoreCategory(categories)
{


    localStorage.setItem('categories',JSON.stringify(categories));
    localStorage.setItem('cat',6);

}


window.onload=function(){
    if(localStorage.getItem('cat'))
    {
        TotalTasks=0;
        categories=JSON.parse(localStorage.getItem('categories'));
        tasks=JSON.parse(localStorage.getItem('tasks'));
        TotalDone=JSON.parse(localStorage.getItem('TotalDone'));
        TotalTasks=JSON.parse(localStorage.getItem('TotalTasks'));
        //var Categories=JSON.parse(localStorage.getItem('categories'));
        //var Tasks=JSON.parse(localStorage.getItem('tasks'));
        //console.log(tasks);
        categories.forEach(function(current){
            CategoryMaker((current));
            CalcDone(current);
            if(tasks[current])
            {
                tasks[current].forEach(function(curr){
                    TaskMaker(curr);
                });
            }
            
            
            
        });
    }

}

function StoreTask(tasks)
{

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function StoreDone(TotalDone,TotalTasks)
{
    localStorage.setItem('TotalDone',JSON.stringify(TotalDone));
}








