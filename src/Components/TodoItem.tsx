import React from "react";
import { TaskProps } from "../TaskInterface";
import { Checkbox, Divider, ListItem, ListItemIcon, ListItemText } from "@mui/material";

const TodoItem = ({task,removeTask}:TaskProps)=>{
    return (
        <span>
        <ListItem>
            <ListItemIcon>
                <Checkbox
                edge="start"
                checked={false}
                tabIndex={-1}
                disableRipple
                onChange={()=>{removeTask(task.taskName)}}
                />
            </ListItemIcon>
            <ListItemText
            primary={task.taskName}
            secondary={task.completionDate?.toLocaleDateString("en-In")}
            />
        </ListItem>
         <Divider variant="inset" component="li" />
         </span>
    )
}
export default TodoItem