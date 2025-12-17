import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";

import editIcon from "../../assets/img/edit.png";

interface Atraso {
  id: number;
  aluno: string;
  livro: string;
  multa: string;
  data: string;
}

interface FilterState {
  id: string;
  aluno: string;
  livro: string;
  multa: string;
  data: string;
}

const DEFAULT_FILTERS: FilterState = {
  id: "",
  aluno: "",
  livro: "",
  multa: "",
  data: "",
};

const AtrasosPage: React.FC = () => {
  const [atrasos, setAtrasos] = useState<Atraso[]>([]);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [showFilter, setShowFilter] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [newAtraso, setNewAtraso] = useState<Omit<Atraso, "id">>({
    aluno: "",
    livro: "",
    multa: "",
    data: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<Omit<Atraso, "id">>({
    aluno: "",
    livro: "",
    multa: "",
    data: "",
  });

  // paginação
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 14;

  const filterRef = useRef<HTMLDivElement | null>(null);

  /** Carrega dados do localStorage */
  useEffect(() => {
    const stored = localStorage.getItem("atrasos");

    if (stored) {
      setAtrasos(JSON.parse(stored));
    } else {
      const exemploAtrasos: Atraso[] = [
        { id: 1, aluno: "João Silva", livro: "Dom Casmurro", multa: "R$ 5,00", data: "2024-01-15" },
        { id: 2, aluno: "Maria Santos", livro: "O Cortiço", multa: "R$ 10,00", data: "2024-01-10" },
        { id: 3, aluno: "Pedro Oliveira", livro: "Memórias Póstumas", multa: "R$ 15,50", data: "2024-01-05" },
        { id: 4, aluno: "Ana Costa", livro: "Iracema", multa: "R$ 7,00", data: "2024-01-20" },
        { id: 5, aluno: "Carlos Lima", livro: "O Guarani", multa: "R$ 12,00", data: "2024-01-18" },
      ];
      setAtrasos(exemploAtrasos);
    }
  }, []);

  /** Persistência */
  useEffect(() => {
    localStorage.setItem("atrasos", JSON.stringify(atrasos));
  }, [atrasos]);

  /** Fecha o filtro ao clicar fora */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /** Filtros aplicados com memoization */
  const filteredAtrasos = useMemo(() => {
    return atrasos.filter((a) => {
      if (filters.id && !a.id.toString().includes(filters.id)) return false;
      if (filters.aluno && !a.aluno.toLowerCase().includes(filters.aluno.toLowerCase())) return false;
      if (filters.livro && !a.livro.toLowerCase().includes(filters.livro.toLowerCase())) return false;
      if (filters.multa && !a.multa.toLowerCase().includes(filters.multa.toLowerCase())) return false;
      if (filters.data && !a.data.includes(filters.data)) return false;
      return true;
    });
  }, [atrasos, filters]);

  /** Paginação */
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredAtrasos.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.max(1, Math.ceil(filteredAtrasos.length / rowsPerPage));

  /** Seleção de linhas */
  const handleRowSelect = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedRows(currentRows.map((r) => r.id));
    else setSelectedRows([]);
  };

  /** Adicionar registro */
  const handleAddConfirm = () => {
    const { aluno, livro, multa, data } = newAtraso;

    if (!aluno || !livro || !multa || !data) return alert("Preencha todos os campos!");

    const newId = atrasos.length ? Math.max(...atrasos.map((a) => a.id)) + 1 : 1;

    const entry: Atraso = { id: newId, ...newAtraso };

    setAtrasos((prev) => [...prev, entry]);
    setShowAddModal(false);
    setNewAtraso({ aluno: "", livro: "", multa: "", data: "" });
  };

  /** Exclusão */
  const handleDeleteConfirm = () => {
    setAtrasos((prev) => prev.filter((a) => !selectedRows.includes(a.id)));
    setSelectedRows([]);
    setShowDeleteModal(false);
  };

  /** Edição */
  const handleEditToggle = () => {
    if (editingId === null) {
      if (selectedRows.length !== 1) return alert("Selecione exatamente uma linha.");

      const id = selectedRows[0];
      const atraso = atrasos.find((a) => a.id === id)!;

      setEditingId(id);
      setEditValues({ aluno: atraso.aluno, livro: atraso.livro, multa: atraso.multa, data: atraso.data });
    } else {
      const { aluno, livro, multa, data } = editValues;
      if (!aluno || !livro || !multa || !data) return alert("Preencha todos os campos!");

      setAtrasos((prev) =>
        prev.map((a) => (a.id === editingId ? { id: a.id, ...editValues } : a))
      );

      setEditingId(null);
      setEditValues({ aluno: "", livro: "", multa: "", data: "" });
      setSelectedRows([]);
    }
  };

  const hasActiveFilters = () => Object.values(filters).some((v) => v !== "");

  return (
    <div className="table-page-container">
      <div className="table-header">
        <div className="header-buttons-container">
          <div className="table-controls">
            <div className="filter-container" ref={filterRef}>
              <button
                className={`filter-btn ${hasActiveFilters() ? "active" : ""}`}
                onClick={() => setShowFilter(!showFilter)}
              >
                Filter
                {hasActiveFilters() && <span className="filter-indicator"></span>}
              </button>

              {showFilter && (
                <div className="filter-popup">
                  <div className="filter-header">
                    <h3>Filtrar por</h3>
                    <button className="close-filter-btn" onClick={() => setShowFilter(false)}>×</button>
                  </div>

                  <div className="filter-fields">
                    {Object.keys(filters).map((key) => (
                      <div className="filter-field" key={key}>
                        <label>{key.toUpperCase()}</label>
                        <input
                          value={(filters as any)[key]}
                          onChange={(e) => setFilters((prev) => ({ ...prev, [key]: e.target.value }))}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="filter-actions">
                    <button className="clear-filters-btn" onClick={() => setFilters(DEFAULT_FILTERS)}>
                      Limpar Filtros
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="table-buttons">

            <button className="edit-btn" onClick={handleEditToggle}>
              <img src={editIcon} className="button-icon" />
            </button>

            {editingId && (
              <button className="cancel-edit-btn" onClick={() => setEditingId(null)}>
                Cancelar
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedRows.length === currentRows.length && currentRows.length > 0}
                />
              </th>
              <th>ID</th>
              <th>ALUNO</th>
              <th>LIVRO</th>
              <th>MULTA</th>
              <th>DATA</th>
            </tr>
          </thead>

          <tbody>
            {currentRows.map((row) => (
              <tr key={row.id} className={selectedRows.includes(row.id) ? "selected" : ""}>
                <td>
                  <input type="checkbox" checked={selectedRows.includes(row.id)} onChange={() => handleRowSelect(row.id)} />
                </td>

                <td>{row.id}</td>

                {["aluno", "livro", "multa", "data"].map((field) => (
                  <td key={field}>
                    {editingId === row.id ? (
                      <input
                        className="inline-edit"
                        value={(editValues as any)[field]}
                        onChange={(e) => setEditValues((prev) => ({ ...prev, [field]: e.target.value }))}
                      />
                    ) : (
                      (row as any)[field]
                    )}
                  </td>
                ))}
              </tr>
            ))}

            {currentRows.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "15px 0" }}>
                  Nenhum registro encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>Anterior</button>
        <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Próxima</button>
      </div>

      {/* MODAL ADD */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">Adicionar Novo Registro</div>

            <div className="modal-body">
              {["aluno", "livro", "multa", "data"].map((f) => (
                <div className="modal-field" key={f}>
                  <label>{f.toUpperCase()}</label>
                  <input
                    type={f === "data" ? "date" : "text"}
                    value={(newAtraso as any)[f]}
                    onChange={(e) => setNewAtraso((prev) => ({ ...prev, [f]: e.target.value }))}
                  />
                </div>
              ))}
            </div>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowAddModal(false)}>Cancelar</button>
              <button className="confirm-btn" onClick={handleAddConfirm}>Confirmar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DELETE */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">Confirmar exclusão</div>
            <div className="modal-body">
              <p>Deseja realmente excluir {selectedRows.length} registro(s)?</p>
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>Cancelar</button>
              <button className="confirm-btn delete-confirm-btn" onClick={handleDeleteConfirm}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AtrasosPage;