import {useMemo, useState} from "react";
import * as React from "react";
import camera from '../../assets/images/camera.svg';
import '../../App.css';
import MDBox from "../MDBox";

import CardMedia from "@mui/material/CardMedia";
import {Input} from "@mui/material";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as PropTypes from "prop-types";


function VisuallyHiddenInput(props) {
    return null;
}

VisuallyHiddenInput.propTypes = {type: PropTypes.string};
const BotaoUploadImagem = (props) => {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [preview, setPreview] = useState('');

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
        setPreview(URL.createObjectURL(event.target.files[0]));
    };

    const handleUploadImage = () => {
        const formData = new FormData();
        formData.append('image', image);

        // Faz a requisição para o servidor para upload da imagem
        fetch('/upload-image', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                setImageUrl(data.imageUrl);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
       <>
           <MDBox position="relative" width="50%" shadow="xl" borderRadius="xl">
               {preview? (
                   <CardMedia
                       src={preview}
                       component="img"
                       title="teste"
                       sx={{
                           maxWidth: "100%",
                           margin: 0,
                           boxShadow: ({ boxShadows: { md } }) => md,
                           objectFit: "cover",
                           objectPosition: "center",
                       }}
                   />
               ) : (
                   // <Button
                   //     component="label"
                   //     role={undefined}
                   //     variant="contained"
                   //     tabIndex={-1}
                   //     startIcon={<CloudUploadIcon />}
                   //     onClick={handleUploadImage}
                   // >
                   //     Upload file
                   //     <VisuallyHiddenInput type="file" />
                   // </Button>

                    <Input type="file"
                           onChange={handleImageChange}
                           sx={{
                               padding: '10px',
                               border: '1px solid #ddd',
                               borderRadius: '10px',
                           }}
                    >
                        <img src={camera} alt="Selecione uma imagem"/>
                        <ArrowForwardIosIcon/>
                    </Input>
               )}
               <Button onClick={handleUploadImage} >Selecione uma image</Button>
           </MDBox>
       </>

        // <div className="form-group">
        //     <label>{props.title} <span className="text-danger">*</span></label>
        //     <div align={"center"} className="imagem">
        //         <label
        //             id="thumbnail-pro"
        //             style={{backgroundImage: `url(${preview})`}}
        //             className={thumbnail ? 'has-thumbnail' : ''}>
        //             <input type="file" className="imagem"
        //                    onChange={event => setThumbnail(event.target.files[0])}/>
        //             <img src={camera} alt="Selecione uma imagen"/>
        //         </label>
        //         <div className="descricao-foto" id="descicao-foto">
        //             A dimensão recomendada é de 1600 x 838
        //             (mesma proporção do formato utilizado nas páginas de evento no Facebook).
        //             Formato JPEG, GIF ou PNG de no máximo 2MB.
        //             Imagens com dimensões diferentes serão redimensionadas.
        //         </div>
        //     </div>
        // </div>
    )
}

export default BotaoUploadImagem;