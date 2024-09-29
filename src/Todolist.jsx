import React, { useState, useEffect } from "react";
import './TodoList.css'
import Icone from './assets/lista.png'



function TodoList (){


    const listaStorage = localStorage.getItem('Lista');
    let parsedLista = [];
    try {
      parsedLista = listaStorage ? JSON.parse(listaStorage) : [];
    } catch (e) {
      console.error("Erro ao parsear localStorage:", e);
      parsedLista = [];
    }
    const [lista, setLista] = useState(parsedLista);
const [novoItem, setNovoItem] = useState("");

useEffect(() => {
    // Atualiza o localStorage toda vez que a lista mudar, garantindo que seja sempre um array válido
    if (lista) {
      localStorage.setItem('Lista', JSON.stringify(lista));
    }
  }, [lista]);


function adicionaItem(form) {
    form.preventDefault();
    if (!novoItem) {
        return;
    }
    setLista([...lista, {text: novoItem, isCompleted: false}])
    setNovoItem("");
    document.getElementById('input-entrada').focus();
}

    function clicou(index){
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deleta (index){
        const listaAux = [...lista];
        listaAux.splice(index,1);
        setLista(listaAux);
    }

    function deletaTudo(){
        setLista([]);
    }

    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <form onSubmit={adicionaItem}>
                <input 
                id="input-entrada"
                type="text" 
                value={novoItem}
                onChange={(e) => {setNovoItem(e.target.value)}}
                placeholder="Adicione uma Tarefa..."/>
                <button type="submit" className="add">Add</button>
            </form>

            <div className="listaTarefas">
                <div style={{textAlign:'center'}}>
                {
                    lista.length <1
                    ?
                    <img className="icone-central" src={Icone} />
                    :

                    lista.map((item, index)=>(
                <div 
                key={index}
                className={item.isCompleted ? "item completo" : "item"}>
                    <span onClick={()=>{clicou(index)}}>{item.text}</span>
                    <button onClick={()=>{deleta(index)}} className="del">Deletar</button>
                </div>
                    ))
                    
                }
                {
                    lista.length > 0 &&
                    <button onClick={()=>{ deletaTudo()}}className="deleteAll">Deletar todos</button>
                }
                
                </div>
            </div>
        </div>


        
    )
}

export default TodoList