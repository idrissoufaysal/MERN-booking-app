import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Book {
  title: string;
  desc: string;
  price: number;
  imageUrl:string |File,
}

function Add() {
  const [book, setBook] = useState<Book>({
    title: "",
    desc: "",
    price: 0,
    imageUrl:''
  });

  const [img, setImg] = useState();

  const [error, setError] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e: { target: { name: string; value: string } }) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFile = (e: React.ChangeEventHandler<HTMLInputElement> | any) => {
    setImg(e.target.files[0]);
    setBook((prev) => ({ ...prev, imageUrl: e.target.files[0] }));
    console.log(e.target.files[0]);
  };

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!img) {
      console.log('ficher non telecharger');
      
      setError(true);
      return;
    }
    
    const formData = new FormData();
    formData.append("title", book.title);
    formData.append("desc", book.desc);
    formData.append("price",book.price.toString());
    formData.append("file", img);
    
    
    try {
      await axios.post("http://localhost:5000/books", formData,
      {
        headers:{'Content-Type':'application/x-www-form-urlencoded'}
      });
      navigate("/");
    } catch (e: any) {
      console.log(e.response.data);
      setError(true);
    }
  };

  return (
    <div className="form">
        <h1>Ajouter un livre</h1>

        <input
          type="text"
          placeholder="titre du livre...."
          name="title"
          onChange={handleChange}
        />

        <textarea
          name="desc"
          rows={3}
          placeholder="Description..."
          onChange={handleChange}
        />

        <input
          type="number"
          placeholder="prix du livre"
          name="price"
          onChange={handleChange}
        />

        <input
          type="file"
          placeholder="ajouter une image !!"
          name="imgUrl"
          onChange={handleFile}
        />

        <button className="formButton" onClick={handleClick}>
          Ajouter +
        </button>
        {error && "erreur lors de l'ajout"}
      <Link className="" to="/">
        Voir tous les livre disponible
      </Link>
    </div>
  );
}
export default Add;
