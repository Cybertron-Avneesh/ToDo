/*
localStorage.removeItem('categories');
localStorage.removeItem('cat');
localStorage.removeItem('tasks');
localStorage.removeItem('TotalDone');
localStorage.removeItem('TotalTasks');
localStorage.removeItem('Maker');


*/


var init=function(categories,TotalDone,TotalTasks,tasks)
{



    var Adder={
        addCategory:function()
        {
            var category;
            category=document.querySelector('.task_cate').value;
            categories.push(category);
            storing.StoreCategory(categories);
            Maker.CategoryMaker(category);
        },
        addTask:function()
        {
            var taskType,task,newTask;
            task=document.querySelector('.add_task').value;
            taskType=document.querySelector('.taskType').value;
            newTask=new Task(task,taskType);
            tasks[taskType].push(newTask);
            storing.StoreTask(tasks);
            Maker.TaskMaker(newTask);
        }        
    }
    document.querySelector('.add_cate_btn').addEventListener('click',Adder.addCategory);

    var Maker={
        CategoryMaker:function(category)
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
        },

        TaskMaker:function(newTask)
        {
            var html;
            if(newTask.task!=='')
            {

                html='<div id="%task_type-%id%"><li>%List%</li><input type="checkbox" class="Done_btn" id="check-0">Done</input></div>';

                html=html.replace('%task_type-%id%',newTask.type+'-'+newTask.id);
                html=html.replace('%List%',newTask.task);
                html=html.replace('check-0','check'+'-'+newTask.id);
                document.querySelector('.'+newTask.type).insertAdjacentHTML('beforeend',html);

                clearFields();

                TotalTasks++;
                CalcDone(newTask.type);
            }

        },
        calcDone:function(category){
            var done_cate=0,total_cate=0;
            tasks[category].forEach(function(current){
                if(current.done){
                    done_cate++;
                    document.querySelector('#check-'+current.id).checked=true;
               }
                total_cate++;
            });
            document.querySelector('.done_'+category).textContent='Done'+' '+done_cate+'/'+total_cate;
            document.querySelector('.TasksDone').textContent='Done'+' '+TotalDone+'/'+TotalTasks;
        }

    }
    /*
    Maker.prototype.calcDone=function(category){
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
    */


    document.querySelector('.add_button').addEventListener('click',Adder.addTask);




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


    function CalcDone(category){
        var done_cate=0,total_cate=0;
        tasks[category].forEach(function(current){
            if(current.done){
                done_cate++;
                    //document.querySelector('.Done_btn').checked=true;
                    //console.log(document.querySelector('#check-'+current.id).checked);
           }
            total_cate++;
        });
        document.querySelector('.done_'+category).textContent='Done'+' '+done_cate+'/'+total_cate;
        document.querySelector('.TasksDone').textContent='Done'+' '+TotalDone+'/'+TotalTasks;
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
            storing.StoreDone(TotalDone);
            storing.StoreTask(tasks);
            Maker.calcDone(splitid[0]);
        }
        else if((tasks[splitid[0]][index].done))
        {

            tasks[splitid[0]][index].done=false;
            TotalDone--;
            storing.StoreDone(TotalDone);
            storing.StoreTask(tasks);
            Maker.calcDone(splitid[0]);
        }
    }


    var storing={
        StoreCategory:function(categories)
        {


            localStorage.setItem('categories',JSON.stringify(categories));
            localStorage.setItem('cat',6);

        },


        StoreTask:function(tasks)
        {

            localStorage.setItem('tasks',JSON.stringify(tasks));
        },

        StoreDone:function(TotalDone)
        {
            localStorage.setItem('TotalDone',JSON.stringify(TotalDone));
        }

    }

    return Maker;

}




window.onload=function(){
    var categories=[],TotalDone=0,TotalTasks=0,tasks=new Object(),Maker;

    if(localStorage.getItem('cat'))
    {
        TotalTasks=0;
        categories=JSON.parse(localStorage.getItem('categories'));
        tasks=JSON.parse(localStorage.getItem('tasks'));
        TotalDone=JSON.parse(localStorage.getItem('TotalDone'));
    }

    Maker=init(categories,TotalDone,TotalTasks,tasks)

    if(localStorage.getItem('cat'))
    {


        categories.forEach(function(current){
            Maker.CategoryMaker((current));
            if(tasks[current])
            {
                tasks[current].forEach(function(curr){
                    Maker.TaskMaker(curr);
                });
            }   
            Maker.calcDone(current);

        });
    }

}






