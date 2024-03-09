import React, { useState } from 'react';

const AddBookForm = ({ onAddBook }) => {
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    owner: '',
    coverImage: null,
    pdfFile: null,
  });

  const handleAddBook = (e) => {
    e.preventDefault();

    if (!newBook.title || !newBook.author || !newBook.coverImage) {
      alert('Por favor, ingrese al menos el título, el autor y la imagen del libro.');
      return;
    }

    // Llamar a la función onAddBook con el nuevo libro y su imagen
    onAddBook({
      id: Date.now(),
      likes: 0,
      isEditable: false,
      ...newBook,
    });

    // Reiniciar el estado para el próximo libro
    setNewBook({ title: '', author: '', owner: '', coverImage: null, pdfFile: null });
  };

  const onDropImage = (e) => {
    const image = e.target.files[0];

    if (image) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewBook((prevBook) => ({
          ...prevBook,
          coverImage: reader.result,
        }));
      };

      reader.readAsDataURL(image);
    }
  };

  // Nueva función para manejar la subida de PDF
  const onDropPdf = (e) => {
    const pdf = e.target.files[0];
    setNewBook((prevBook) => ({ ...prevBook, pdfFile: pdf }));
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h3>Agregar Nuevo Libro</h3>
      <form onSubmit={handleAddBook}>
        <div style={{ margin: '10px 0' }}>
          <p>Seleccione la imagen del libro</p>
          <input type="file" accept="image/*" onChange={onDropImage} />
          {/* Mostrar la imagen previa si está disponible */}
          {newBook.coverImage && (
            <div>
              <p>Imagen del libro:</p>
              <img
                src={newBook.coverImage}
                alt="Portada del libro"
                style={{ width: '100px', height: '150px', marginBottom: '5px' }}
              />
            </div>
          )}
        </div>
        <div style={{ margin: '10px 0' }}>
          <p>Seleccione el archivo PDF (opcional)</p>
          <input type="file" accept=".pdf" onChange={onDropPdf} />
        </div>
        <label>
          Título:
          <input
            type="text"
            value={newBook.title}
            onChange={(e) =>
              setNewBook((prevBook) => ({
                ...prevBook,
                title: e.target.value,
              }))
            }
          />
        </label>
        <br />
        <label>
          Autor:
          <input
            type="text"
            value={newBook.author}
            onChange={(e) =>
              setNewBook((prevBook) => ({
                ...prevBook,
                author: e.target.value,
              }))
            }
          />
        </label>
        <br />
        <label>
          Dueño:
          <input
            type="text"
            value={newBook.owner}
            onChange={(e) =>
              setNewBook((prevBook) => ({
                ...prevBook,
                owner: e.target.value,
              }))
            }
          />
        </label>
        <br />
        <button type="submit">Agregar Libro</button>
      </form>
    </div>
  );
};

export default AddBookForm;
