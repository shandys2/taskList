import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom'


export default function TaskForm() {

    const navigate = useNavigate();
    const params = useParams();

    const [task, setTask] = useState({
        title: '',
        description: ''
    })
    const [loading, setLoading] = useState(false)
    const [editing, setEditing] = useState(false)

    const loadTask = async(id)=>{
       const res = await fetch(`http://localhost:3000/tasks/${id}`)
       const data = await res.json();
       setTask({title: data.title, description: data.description})
       setEditing(true)
    }

    useEffect(()=>{
        if(params.id){
            loadTask(params.id)
        }else{
            setTask({title: '', description:''})
            setEditing(false)
        }

    },[params.id])

    const handleChange = e => setTask({ ...task, [e.target.name]: e.target.value })


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        if(editing){
            
            const res = await fetch(`http://localhost:3000/tasks/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify(task),
                headers:{'Content-Type':'application/json'}
            })
            const data = await res.json();
          
        }else{
            const res = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                body: JSON.stringify(task),
                headers:{'Content-Type':'application/json'}
            })
            const data = await res.json();
        }

      
        setLoading(false)
        navigate('/')
    }

    return (
        <Grid container direction='column' alignItems='center' justifycontents='center'>
            <Grid item xs={3}>
                <Card sx={{ mt: 5 }} style={{ backgroundColor: '#1e272e', padding: "1rem" }}>
                    <Typography variant='5' textAlign='center' color='white'>{editing ? 'Actualizar registro':'Crear registro'}</Typography>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <TextField variant='filled'
                                label='Write your title'
                                sx={{ display: 'block', margin: '.5rem 0' }}
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                                onChange={handleChange}
                                name="title"
                                value={task.title}
                            />

                            <TextField variant='filled'
                                label='Write your description'
                                multiline rows={4}
                                sx={{ display: 'block', margin: '.5rem 0' }}
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                                onChange={handleChange}
                                name="description"
                                value={task.description}
                            />

                            <Button variant='contained' color='primary' type='submit' disabled={!task.title || !task.description}>
                                {loading ?<CircularProgress color='inherit' size={24}/> : 'Guardar'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}