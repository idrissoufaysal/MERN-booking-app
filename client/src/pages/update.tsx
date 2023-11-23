import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

interface Book {
  title: string;
  desc: string;
  price: number;
  imageUrl: File | number;
}

const Update = () => {
  const [book, setBook] = useState<Book>({
    title: "",
    desc: "",
    price: 0,
    imageUrl: 0,
  });
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const bookId = location.pathname.split("/")[2];

  useEffect(() => {
    console.log("index: ", bookId);
    const oneBook = async () => {
      try {
        const res = await axios.get("http://localhost:5000/books/" + bookId);
        console.log("index: ", id);
        const response = res.data;  
       // setBook(res.data);
        console.log(res.data);

        setTitle(response.title);
        setDesc(response.desc);
        setPrice(response.price);
        //setImageUrl(response.imageUrl);
      } catch (e: any) {
        console.log(e.response.data);
         setError(true);
      }
    };
    oneBook();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFile = (e: React.ChangeEventHandler<HTMLInputElement> | any) => {
    //setBook((prev) => ({ ...prev, imageUrl: e.target.files[0] }));
    setImageUrl(e.target.files);
    console.log(e.target.files);
    //setFileName(e.target.files[0].name)
  };

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const formData = new FormData();
    // formData.append("title", book.title);
    // formData.append("desc", book.desc);
    // formData.append("price", book.price.toString());
    // formData.append("file", book.imageUrl.toString());

    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("price", price.toString());
    console.log("photo :"+imageUrl[0]);

      formData.append('file', imageUrl[0]);
    //formData.append("file", imageUrl);
    //formData.append('id',)
     
    try {
      await axios.put(`http://localhost:5000/books/${bookId}`, formData,
      {
        headers:{'Content-Type':'application/x-www-form-urlencoded'}
      });
      navigate("/");
    } catch (err: any) {
      console.log(err.response.data);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Mise a jour</h1>
      <input
        type="text"
        placeholder="titre du livre..."
        name="title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
       // onChange={handleChange}
      />
      <textarea
        rows={2}
        placeholder="description...."
        name="desc"
        value={desc}
        onChange={(e)=>setDesc(e.target.value)}
        //onChange={handleChange}
      />
      <input
        type="number"
        placeholder="prix $$"
        name="price"
        value={price}
        onChange={(e)=>setPrice(e.target.valueAsNumber)}
        //onChange={handleChange}
      />
      <input
        type="file"
        placeholder="fichier"
        name="imageUrl"
        //onChange={ev=>setImageUrl(ev.target.files)}
        onChange={handleFile}
      />
      <button className="formButton" onClick={handleClick}>
        Modifier
      </button>
      {error && "un probleme est survenu lors de la modification"}
      <Link to="/" className="link">
        voire tous les livre
      </Link>
    </div>
  );
};

export default Update;
