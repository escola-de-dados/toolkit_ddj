import { useState, useEffect } from "react";
import yaml from 'js-yaml'

import Head from "next/head";

export default function Home() {
  
  const [toolsData, setToolsData] = useState([]);

  const getUpdatedData = async() => {
    const updatedData = await fetch('/toolkit_ddj/data/tools.yml').then(res => res.text()).then(data => yaml.load(data));
    console.log(updatedData);
    setToolsData([...updatedData]);
  }

  useEffect(()=>{
    getUpdatedData();
  }, [])

  return (
    <div>
      <Head>
        <title>Caixa de Ferramentas | Jornalismo de Dados</title>
        <meta name="description" content="Explore mais de 140 ferramentas para jornalistas de dados e colabore para aumentar a base." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        {toolsData.length > 0 ?
        toolsData.map((tool, index) => {
          return(
            <div key={index} style={{marginBottom: "50px"}}>
              <h2>{tool.nome}</h2>
              <p><a href={tool.link}>{tool.link}</a></p>
              <p><a href={tool.github}>{tool.github}</a></p>
              <p>Descrição: {tool["descrição"]}</p>
              <p>Categoria: {tool.categoria}</p>
              {Array.isArray(tool.plataforma) ?
                <div>
                  <p>Plataformas:</p>
                  <ul>
                  {tool.plataforma.map((plataforma, index) => {
                      return(
                        <li key={index}>{plataforma}</li>
                      )
                    })}
                  </ul>
                </div>
              :
              <p>Plataforma: {tool.plataforma}</p>
              }
            </div>
          )
        })
        :
        <div>Loading...</div>
        }
      </div>
    </div>
  );
}