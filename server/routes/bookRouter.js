const Book = require("../models/Book");
const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");

////
const storage = multer.diskStorage({
  destination: "Images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });
////

//* Afficher tous les livres
router.get("/", async (req, res) => {
  try {
    const data = await Book.findAll();
    if (!data) {
      return res.status(404).json("Ressource non trouvable");
    }
    return res.status(200).json(data); 
  } catch (e) {
    console.log(e);
    return res.status(500).json("Erreur serveur");
  }
});

//* Afficher un livre spécifique
router.get("/:bookId", async (req, res) => {
  try {
    const id = req.params.bookId;
    console.log(id);
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json("Livre non trouvé chercher encore");
    }
    return res.status(200).json(book);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Erreur serveur");
  }
});

//* Ajouter un livre
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { title, desc, price } = req.body;
    console.log(req.file);
    if (req.file) {
      // Accédez au chemin du fichier correctement
      const newBook = await Book.create({
        title: title,
        desc: desc,
        price: price,
        imageUrl: req.file.path, // Utilisez req.file.path pour obtenir le chemin de l'image
      });

      return res
        .status(200)
        .json({ message: "Livre ajouté avec succès", book: newBook });
    } else {
      return res
        .status(400)
        .json({ message: "Aucun fichier image n'a été téléchargé." });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json("Erreur serveur");
  }
});

// Modifier un livre
router.put("/:id",upload.single('file'), async (req, res) => {
  try {
    const bookId = req.params.id;
    console.log(bookId);
     await Book.update(req.body,{
      where: {id:bookId},
    });
    res.status(200).json("Livre modifié avec succès");
    
  } catch (e) {
    console.log(e.message);
    return res.status(500).json("Erreur serveur");   
  }
});

// Supprimer un livre
router.delete("/:id" ,async (req, res) => {
  try {
    const Bookid = req.params.id;
    console.log("index: "+Bookid);
    const deleteBook = await Book.destroy({
      where: { id: Bookid },
    });

    if (deleteBook === 1) {
      return res.status(200).json("Livre supprimé avec succès");
    } else {
      return res.status(404).json("Livre non trouvé");
    }
  } catch (e) {
    console.log(e.message);
    return res.status(500).json("Erreur serveur");
  }
});

module.exports = router;
