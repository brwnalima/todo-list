import React, { useState, useEffect } from 'react'
import './Tarefa.css'
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import { BsPlusLg } from "react-icons/bs";

function Tarefas() {

    const [tarefa, setTarefa] = useState('')
    const [data, setData] = useState([]);

    const apiURL = 'https://todo-list-iy82.onrender.com/tarefas'


    useEffect(() => {
        // GET 
        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                setData(data)
                console.log(data);
            })
            .catch(error => console.error(error));
    }, []);

    const submitTarefa = () => {

        if (tarefa === '') {
            alert("Digite uma tarefa válida!")
        } else {
            const novoItem = {
                id: Math.random(),
                todo: tarefa,
                status: false,
            };
            setData([...data, novoItem]);
            setTarefa('')
        }
    }

    const handleStatus = (id) => {
        const novaLista = data.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    status: !item.status,
                };
            }
            return item;
        });

        setData(novaLista);
    }

    const eraseTask = (id) => {
        const indice = data.findIndex((item) => item.id === id);

        if (indice !== -1) {
            const novaLista = [...data];
            novaLista.splice(indice, 1);
            setData(novaLista);
        }
    }

    return (
        <div className='content'>
            <div className="header">
                <h1>Tarefas</h1>
            </div>

            <div className="tasks-wrapper">

                <div className="task-adding">
                    <input
                        type="text"
                        placeholder='Digite a tarefa'
                        value={tarefa}
                        onChange={(e) => setTarefa(e.target.value)}
                    />
                    <button className='submit' onClick={submitTarefa}><BsPlusLg /></button>
                </div>

                {data.map((item) => {
                    return (
                        <ul className="list" key={item.id}>
                            <li className={item.status ? "done" : "notDone"}>
                                <button onClick={() => handleStatus(item.id)}>
                                    {item.status ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                                </button>

                                <p>{item.todo}</p>

                                <button className='erase' onClick={() => eraseTask(item.id)}><LuTrash2 /></button>
                            </li>
                        </ul>
                    )
                })}
            </div>


        </div>
    )
}

export default Tarefas