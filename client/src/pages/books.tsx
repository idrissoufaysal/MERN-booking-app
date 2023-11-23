import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import typeMessage from "../function";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={50} ref={ref} variant="filled" {...props} />;
});

function Books() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [succes, setSucces] = React.useState(false);
  const [message,setMessage]=useState('');

  useEffect(() => {
    const AllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/books");
        console.log(res.data);
        setBooks(res.data);
      } catch (e) {
        console.log(e);
        setError(true);
        setOpen(true)
      }
    };
    AllBooks();
  }, []);

  const handleDelete = async (
    id: React.MouseEventHandler<HTMLAnchorElement> | number
  ) => {
    try {
     const res= await axios.delete(`http://localhost:5000/books/${id}`);
        console.log(res.data);
        setMessage(res.data)
      window.location.reload();
      setSucces(true)
    } catch (e:any) {
      console.log(e.response.data);
      setError(true);
      setOpen(true);
    }
  };

  function errFunction(e:string) {
    return <div>
    <Snackbar open={open} autoHideDuration={500}>
     <Alert severity="error" sx={{ width: "100%" }}>
      {e}
     </Alert>
    </Snackbar>;
    </div>
  }
  

  return (
    <div>
      <h1>Agent b13 books shop</h1>
      <Stack sx={{ alignItems: "center", gap: "20px" }}>
        <div className="books">
          {books.map(
            (book: {
              id: number;
              imageUrl: string;
              title: string;
              desc: string;
              price: number;
            }) => (
              <div key={book.id} className="book">
                <Card
                  sx={{
                    width: 300,
                    backgroundColor: "blueGrey",
                    borderRadius: "10px",
                  }}
                >
                  {book.imageUrl && (
                    <CardMedia
                      component="img"
                      alt="livre"
                      height="140"
                      image={`http://localhost:5000/${book.imageUrl}`}
                      sx={{border:1}}
                    ></CardMedia>
                  )}

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {book.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {book.desc}
                    </Typography>
                    <Typography variant="h4" color="text.secondary">
                      {book.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        color="error"
                        onClick={() => handleDelete(book.id)}
                      >
                        Supprimer
                      </Button>
                      <Button variant="contained" startIcon={<EditIcon />}>
                        <Link
                          to={`/update/${book.id}`}
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          Modifier
                        </Link>
                      </Button>
                    </Stack>
                  </CardActions>
                </Card>
              </div>
            )
          )}
        </div>

        <Button
          disableElevation
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            bgcolor: "#9A3B3B",
            height: "40px",
            width: "150px",
            fontSize: "1.2em",
            borderRadius: "10px",
          }}
        >
          <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
            Ajouter
          </Link>
        </Button>
      </Stack>
 {succes && typeMessage({m:message,type:'success',op:open,func:setOpen(false)})} 
      {open? typeMessage({m:"une erreur au serveur",type:'error',op:open,func:setOpen(false)}):""}
    </div>
  );
}

export default Books;
