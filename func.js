document.addEventListener('DOMContentLoaded', () => { // SABKUCH eske andar wrap hoga 
    const input = document.getElementById("to_do_input");
    const btnp = document.getElementById("input_btn");
    const value_added = document.getElementById("to-do_list");
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [] // Stores the tasks , make sure jo set item ki key hai voh hi get item ki key ho , JSON use karege to convert it back to the original form of it 
    tasks.forEach(task=> render_task(task))

    btnp.addEventListener("click", () => {
        const task_text = input.value.trim();
        if (task_text === "") return; // baiscally kuch nahi kar rhe agar empty hua toh 

        const newtask = {
            ID: Date.now(),
            Text: task_text,
            completed: false
        }
        tasks.push(newtask)
        save_tasks();
        render_task(newtask); // yeh yaha call karege toh bina reload ke text add hojega
        input.value = "" //clear input 
        console.log(tasks)
    })

    function save_tasks() {
        // Yeh method ek key value pair leta hai jismai key can be of any type but the value has to be of the "STRING" type only 
        // local storage har baari pooti tarah re-write hoti hai 
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    function render_task(task) { // picks up task and renders it 
        // console.log(task.Text); , Yeh check karne ke liye hai basically 
        const li = document.createElement("li")

        // Here we are adding some properties to the code 

        if (task.completed) li.classList.add("completed")


        // yeh neeche vaala is to actually display the task to the user 

        li.setAttribute("data_id", task.id) // task se id extract kr rhe hai
        li.innerHTML=`
        <span>${task.Text}</span>
        <button>Delete</button>
        `
        // ab yeh ban gaya ab espai kaam karege we can add event listners here 

        li.addEventListener("click",(e)=>{
            if(e.target.tagname === 'BUTTON') return;
            task.completed = !task.completed
            li.classList.toggle('completed')
            save_tasks() // jabhi kuch change karo toh save karna zaroori hai 
        })

        li.querySelector('button').addEventListener("click",(e)=>{
            e.stopPropagation() // prevents toggle from firing 
            // Jaise kyuki li par event listener tha toh delete dabane par bhi class toggle ho rahi thi ab voh nahi hogi 

            tasks = tasks.filter(t => t.id !== task.id)
            li.remove()
            save_tasks() // makes sure ki local storage se na delete ho 

        })

        value_added.appendChild(li)

    }


})






