

import {useMemo, useState} from "react";
import * as React from "react";
import camera from '../../assets/images/camera.svg';
import '../../App.css';



const BotaoUploadImagem =( props) =>{

    const [thumbnail, setThumbnail] = useState(null);
    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]);


    return (
        <div className="form-group">
            <label>{props.title} <span className="text-danger">*</span></label>
            <div align={"center"} className="imagem">
                <label
                    id="thumbnail-pro"
                    style={{backgroundImage: `url(${preview})`}}
                    className={thumbnail ? 'has-thumbnail' : ''}>
                    <input type="file" className="imagem"
                           onChange={event => setThumbnail(event.target.files[0])}/>
                    <img src={camera} alt="Selecione uma imagen"/>
                </label>
                <div className="descricao-foto" id="descicao-foto">
                    A dimensão recomendada é de 1600 x 838
                    (mesma proporção do formato utilizado nas páginas de evento no Facebook).
                    Formato JPEG, GIF ou PNG de no máximo 2MB.
                    Imagens com dimensões diferentes serão redimensionadas.
                </div>
            </div>
        </div>
    )
}

export default BotaoUploadImagem;