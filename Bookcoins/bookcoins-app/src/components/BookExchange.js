import React, { useState, useEffect } from 'react';
import AddBookForm from './AddBookForm';
import julioVerneImage from './images/80 dias.jpeg'; // Asegúrate de tener la ruta correcta

const BookExchange = () => {
  const [books, setBooks] = useState([
    { id: 1, title: 'La vuelta al mundo en 80 días', author: 'Julio Verne', likes: 0, exchangeFile: null, coverImage: julioVerneImage, isEditable: false, owner: 'Dueño 2' },
    // ...otros libros
  ]);

  const [userBooks, setUserBooks] = useState([]);

  const [selectedBook, setSelectedBook] = useState(null);

  const handleLike = (id) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, likes: book.likes + 1, likeClicked: true } : book
      )
    );
  };

  const handleExchange = (id) => {
    const bookToExchange = books.find((book) => book.id === id);

    if (bookToExchange.exchangeFile) {
      console.log(`Intercambiando libro con ID: ${id}`);
    } else {
      alert('Necesitas subir primero un archivo PDF.');
    }
  };

  const onAddBook = (newBook) => {
    setUserBooks((prevBooks) => [
      ...prevBooks,
      {
        id: userBooks.length + 1,
        ...newBook,
        likes: 0,
        exchangeFile: null,
        isEditable: false,
      },
    ]);
  };

  const handleEdit = (id) => {
    setUserBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, isEditable: true } : { ...book, isEditable: false }
      )
    );
  };

  const onDelete = (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este libro?');
    if (confirmDelete) {
      setUserBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    }
  };

  const onSaveEdit = (id, editedBook) => {
    setUserBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, ...editedBook, isEditable: false } : book
      )
    );
  };

  const handlePdfUpload = (id, file) => {
    setUserBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, exchangeFile: file } : book
      )
    );
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedBook(null);
      setUserBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === userBooks.length + 1 ? { ...book, coverImage: reader.result } : book
        )
      );
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // Colocar los botones de Like e Intercambiar debajo del libro de Julio Verne al cargar la página
    setSelectedBook(1);
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: 'auto', padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '550px' }}>
      <h2 style={{ fontSize: '2em', margin: '20px 0', color: '#333', textAlign: 'center' }}>
        Libros Disponibles
      </h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', paddingTop: '10px' }}>
        {[...books, ...userBooks].map((book) => (
          <div key={book.id} style={{ marginBottom: '20px', textAlign: 'center', width: '200px', border: '1px solid #ddd', padding: '3px' }}>
            <img src={book.coverImage} alt={`Portada de ${book.title}`} style={{ width: '100px', height: '150px', marginBottom: '5px' }} />
            <p>Título: {book.title}</p>
            <p>Autor: {book.author}</p>
            <p>Dueño: {book.owner}</p>
            <p>Likes: {book.likes}</p>
            {book.isEditable ? (
              <div>
                <p>Editar Libro:</p>
                <label>
                  Título:
                  <input type="text" value={book.title} onChange={(e) => setUserBooks((prevBooks) => prevBooks.map((b) => (b.id === book.id ? { ...b, title: e.target.value } : b)))} />
                </label>
                <br />
                <label>
                  Autor:
                  <input type="text" value={book.author} onChange={(e) => setUserBooks((prevBooks) => prevBooks.map((b) => (b.id === book.id ? { ...b, author: e.target.value } : b)))} />
                </label>
                <br />
                <button style={{ padding: '3px' }} onClick={() => onSaveEdit(book.id, {})}>
                  Guardar
                </button>
                <label>
                  Subir archivo PDF:
                  <input type="file" accept=".pdf" onChange={(e) => handlePdfUpload(book.id, e.target.files[0])} />
                </label>
                <br />
                <label>
                  Subir imagen de portada:
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files[0])} />
                </label>
              </div>
            ) : (
              <div>
                {book.owner !== 'Dueño 2' && (
                  <>
                    <button style={{ padding: '8px', backgroundColor: '#4CAF50', color: 'white', marginBottom: '5px' }} onClick={() => handleEdit(book.id)}>
                      Editar
                    </button>
                    <button style={{ padding: '8px', backgroundColor: '#FF0000', color: 'white', marginBottom: '5px' }} onClick={() => onDelete(book.id)}>
                      Eliminar
                    </button>
                  </>
                )}
                {book.id === 1 && selectedBook === book.id && (
                  <div style={{ marginTop: '5px' }}>
                    <button
                      style={{ padding: '5px', backgroundColor: '#4CAF50', color: 'white', display: book.likeClicked ? 'none' : 'block' }}
                      onClick={() => {
                        handleLike(book.id);
                      }}
                    >
                      Like
                    </button>
                    <button style={{ padding: '5px', backgroundColor: '#008CBA', color: 'white' }} onClick={() => handleExchange(book.id)}>
                      Intercambiar
                    </button>
                    <label style={{ marginTop: '5px' }}>
                      Subir archivo PDF:
                      <input type="file" accept=".pdf" onChange={(e) => handlePdfUpload(book.id, e.target.files[0])} />
                    </label>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <AddBookForm onAddBook={onAddBook} />
    </div>
  );
};

export default BookExchange;
