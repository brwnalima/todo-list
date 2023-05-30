import React, { useState } from 'react'
import './Tarefa.css'
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import { BsPlusLg } from "react-icons/bs";



const list = [
    {
        id: 1,
        todo: 'Tomar café',
        status: true
    },
    {
        id: 2,
        todo: 'Tomar banho',
        status: true
    },
    {
        id: 3,
        todo: 'Estudar',
        status: false
    },
    {
        id: 4,
        todo: 'Trabalhar',
        status: false
    },

]

function Tarefas() {

    const [tarefa, setTarefa] = useState('')
    const [lista, setLista] = useState(list)

    const submitTarefa = () => {

        if (tarefa === '') {
            alert("Digite uma tarefa válida!")
        } else {
            const novoItem = {
                id: Math.random(),
                todo: tarefa,
                status: false,
            };
            setLista([...lista, novoItem]);
            setTarefa('')
        }
    }

    const handleStatus = (id) => {
        const novaLista = lista.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    status: !item.status,
                };
            }
            return item;
        });

        setLista(novaLista);
    }

    const eraseTask = (id) => {
        const indice = lista.findIndex((item) => item.id === id);

        if (indice !== -1) {
            const novaLista = [...lista];
            novaLista.splice(indice, 1);
            setLista(novaLista);
        }
    }

    return (
        <div className='content'>
            <div className="header">
                {/* <FaRegListAlt/> */}
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
                    <button className='submit' onClick={submitTarefa}><BsPlusLg/></button>
                </div>

                {lista.map((item) => {
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