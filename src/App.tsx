import React,{FC,ChangeEvent,useState} from 'react';
import './App.scss';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import PlaylistAddSharpIcon from '@mui/icons-material/PlaylistAddSharp';
import { ITask } from './TaskInterface';
import moment from 'moment';
import TodoItem from './Components/TodoItem';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const App:FC = function App() {
  //define states//
  const [task, setTask]=useState<string>("");
  const [completionDate, setCompletionDate]=useState<Date | null>(null);
  const [todoList, updateTodoList]=useState<ITask[]>([]);

  //change event on task input text to get latest value
  const getNewTask = (event:ChangeEvent<HTMLInputElement>):void =>{
    setTask(event.target.value);
  }

  //Create a new task and push to TodoList
  const addNewTask = ():void =>{
    const newTask:ITask = {taskName:task,completionDate:completionDate};
    updateTodoList([...todoList,newTask]);
    setTask("");
    setCompletionDate(null);
  }

  //Finished Tasks - remove from todo list
  const finishedTask = (taskName:string):void=>{
    updateTodoList(todoList.filter((item)=>{
      return item.taskName !== taskName;
    }))
  }

  return (
    <div className="App">
      <header className="App-header">
        <TextField value={task} id="standard-basic" label="Enter task..." variant="standard" name="taskName" onChange={getNewTask}/>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker disablePast value={completionDate} onChange={newValue=>setCompletionDate(moment(newValue).toDate())} />
        </LocalizationProvider>
        <Button id="addTask" variant="contained" size="large" startIcon={<PlaylistAddSharpIcon />} onClick={addNewTask}>Add To List <></></Button>
      </header>
      <div className='list-wrapper'>
        
        {todoList.length!==0 && 
        <div>
          <List>
            <ListItem>
                <ListItemText primary="Task description" secondary="Completion date"></ListItemText>
            </ListItem>
          </List>
        
          <List sx={{display:'flex',  width: '100%', bgcolor: 'background.paper', flexGrow:'columns' }}>
            {todoList.map((task:ITask,key:number)=>{
              return <TodoItem key={key} task={task} removeTask={finishedTask}/>
            })}
          </List>
        </div>
        }
        {
          todoList.length===0 && <Typography variant="h3" component="h2">
          To do list is empty!
        </Typography>
        }
      </div>
    </div>
  );
}

export default App;
