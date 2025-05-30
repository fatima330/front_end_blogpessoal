import { useNavigate } from "react-router-dom";
import CardTemas from "../cardtemas/CardTemas"
import { useContext, useEffect, useState } from "react";
import type Tema from "../../../models/Tema";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { DNA } from "react-loader-spinner";

function ListaTemas() {

    const navigate = useNavigate(); //rotas

    const [temas, setTemas] = useState<Tema[]>([]) //lista vazia

    const {usuario, handleLogout} = useContext(AuthContext) //chamando a context pra expulsar e logar de novo
    const token = usuario.token

    async function buscarTemas(){
        try{
            await buscar('/temas', setTemas,{headers:{Authorization: token}
            })
        }catch(error: any){
            if(error.toString().includes('403')){
                handleLogout() //se der erro ele disloga

            }
        }
    }

    useEffect(() => {
        if(token === ''){
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        buscarTemas()
    }, [temas.length])



    return (
        <>
        {temas.length === 0 && (
            <DNA
            visible={true}
            height="200"
            width="200"
            ariaLabel="dns-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper mx-auto"
            />
        )}


            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8">
                                        {temas.map((tema) => ( <CardTemas key={tema.id} tema={tema} />))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListaTemas;