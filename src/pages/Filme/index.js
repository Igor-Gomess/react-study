import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import './filme-info.css';
import api from '../../services/api';
import { toast } from 'react-toastify';

function Filme(){
    
    const {id} = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    const [video, setVideo] = useState({});

    useEffect(()=>{
       async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key: "2bae03f4d64cbf5eda6fee5faf331d08",
                    language: "pt-BR",
                }
            })
        .then((response)=>{
            setFilme(response.data);
            setLoading(false);
        })  
        .catch(()=>{
          console.log("Filme não encontrado");
          navigate("/", {replace:true});
          return;
        })  
       } 

       async function loadVideo(){
        await api.get(`/movie/${id}/videos`,{
            params:{
                api_key: "2bae03f4d64cbf5eda6fee5faf331d08",
                language: "pt-BR",
            }
        })
    .then((response)=>{
        setVideo(response.data.results[0].key);
        setLoading(false);
        console.log(response.data);
    })  
    .catch(()=>{
      console.log("Filme não encontrado");
      navigate("/", {replace:true});
      return;
    })  
   }        
       loadFilme();
       loadVideo();

       return() => {
        console.log("COMPONENTE FOI DESMONTADO")
       }
    },[navigate, id])


    // Salvar filmes
    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvo)=>filmesSalvo.id === filme.id)

        if(hasFilme){
            toast.warn("Esse filme já está na sua lista");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!");
    } // fim salvar filmes

    
    
    if(loading){
       return(
        <div className='filme-info'>
            <h1>Carregando detalhes...</h1>
        </div>
       ) 
    }
    
    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/> 

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a href={`https://www.youtube.com/watch?v=${video}`} target="blank">
                        Trailer
                    </a>
                </button>

            </div>

        </div>
    )
}

export default Filme;