import React, { useState, useEffect } from 'react'
import './Tarefa.css'
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import { BsPlusLg } from "react-icons/bs";

function Tarefas() {

    const [tarefa, setTarefa] = useState('')
    const [data, setData] = useState([]);

    const apiURL = 'https://todo-list-iy82.onrender.com/tarefas'

    // GET 
    useEffect(() => {
        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                setData(data)
            })
            .catch(error => console.error(error));
    }, []);

    // POST 
    const submitTarefa = () => {
        if (tarefa === '') {
            alert("Digite uma tarefa válida!");
        } else {
            const novoItem = {
                id: Math.random(),
                todo: tarefa,
                status: false,
            };

            fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoItem),
            })
                .then(response => response.json())
                .then(() => {
                    setTarefa('');
                    fetch(apiURL)
                        .then(response => response.json())
                        .then(data => {
                            setData(data);
                        })
                        .catch(error => {
                            console.error('Erro:', error);
                        });
                })
                .catch(error => {
                    console.error('Erro:', error);
                });
        }
    };

    // PATCH
    const handleStatus = (id) => {
        const novaLista = data.map((item) => {
            if (item.id === id) {
                const novoStatus = !item.status;

                fetch(`${apiURL}/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status: novoStatus }),
                })
                    .then(response => response.json())
                    .then(updatedUser => {
                        console.log('Status do usuário atualizado:', updatedUser);
                    })
                    .catch(error => {
                        console.error('Erro ao atualizar o status do usuário:', error);
                    });

                return {
                    ...item,
                    status: novoStatus,
                };
            }
            return item;
        });

        setData(novaLista);
    }

    // DELETE 
    const eraseTask = (id) => {
        fetch(`${apiURL}/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                const novaLista = data.filter(item => item.id !== id);
                setData(novaLista)
                    .then(data => {
                        setData(novaLista);
                    })
                    .catch(error => {
                        console.error('Erro:', error);
                    })
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    };

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