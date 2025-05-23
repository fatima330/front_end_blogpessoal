/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */

import axios from "axios";

const api = axios.create( {//crinado uma instancia da biblioteca axios 
    baseURL: "https://blogpessoal-b1ok.onrender.com"
})

export const cadastrarUsuario = async ( url: string, dados: Object, setDados: Function ) => { // construiu e exportou a função assincrona chamada resposta
    const resposta = await api.post(url, dados) 
    setDados(resposta.data)
}

export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}