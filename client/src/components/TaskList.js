
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function TaskList() {

    const navigate = useNavigate();
    const loadTasks = async () => {
        const response = await fetch('http://localhost:3000/tasks')
        const data = await response.json();
        setTasks(data);
        console.log(data);
    }

    const [tasks, setTasks] = useState([])

    const handleDelete = async(id)=>{
        const res = await fetch(`http://localhost:3000/tasks/${id}`,{
            method:"DELETE"
        })
        console.log(res);

        //Eliminarlo del frontend
        
        setTasks(tasks.filter(task =>task.id !==id))
    }

   //const handleEdit = async

    useEffect(() => {
        loadTasks();
    }, [])

    return (
        <>
            <h1>Lista de Motos</h1>
            {tasks.map((task) => {
                return (<Card style={{
                    marginBottom: ".7rem",
                    backgroundColor: "#1e272e",
                    color: "white"
                     }} 
                    key={task.id}>
                    <CardContent style={{
                        display:'flex',
                        justifyContent:'space-between'
                    }}>
                        <div><Typography> {task.title}</Typography>
                            <Typography> {task.description}</Typography></div>

                        <div><Button variant='contained' color='primary' onClick={() => navigate(`/tasks/${task.id}/edit`)}>Edit</Button>
                             <Button variant='contained' color='warning' style={{margin:".5rem"}}onClick={() => handleDelete(task.id)}>Delete</Button>
                        </div>
                    </CardContent>
                </Card>
                )
            })}
        </>
    )
}