interface Book {
  id: string;
  titulo: string;
  autor: string;
  aquisicao: string;
  retorno: string;
}

const mockData: Book[] = [
  { id: "123 A456L", titulo: "O Hobbit", autor: "J. R. R. Tolkien", aquisicao: "01/06/25", retorno: "20/06/25" },
  { id: "456 B789M", titulo: "Moby Dick", autor: "Herman Melville", aquisicao: "02/07/25", retorno: "02/08/25" },
  { id: "789 C101N", titulo: "Maus", autor: "Art Spiegelman", aquisicao: "03/07/25", retorno: "18/07/25" },
  { id: "101 D112O", titulo: "A Psicologia das cores", autor: "Eva Heller", aquisicao: "04/09/25", retorno: "28/09/25" },
  { id: "112 E131P", titulo: "Harry Potter", autor: "J. K. Rowling", aquisicao: "05/08/25", retorno: "01/09/25" },
];

export default function Table() {
  return (
    <div className="custom-table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Aquisição</th>
            <th>Retorno</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((book, index) => (
            <tr key={index}>
              <td>{book.id}</td>
              <td>{book.titulo}</td>
              <td>{book.autor}</td>
              <td>{book.aquisicao}</td>
              <td>{book.retorno}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
