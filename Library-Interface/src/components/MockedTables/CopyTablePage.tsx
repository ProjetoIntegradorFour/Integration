import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import plusIcon from "../../assets/img/plus.png";
import trashIcon from "../../assets/img/trash.png";
import editIcon from "../../assets/img/edit.png";

interface Copia {
  ISBN: number;
  livro: string;
  status: string;
  aluno: string;
}

interface FilterState {
  ISBN: string;
  livro: string;
  status: string;
  aluno: string;
}

export default function CopiaTablePage(): JSX.Element {
  // estados principais
  const [copia, setcopia] = useState<Copia[]>([]);
  const [filteredcopia, setFilteredcopia] = useState<Copia[]>([]);

  // seleção / UI
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<FilterState>({ ISBN: "", livro: "", status: "", aluno: ""});

  // modais
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // add / edit forms
  const [newCopia, setNewCopia] = useState<Omit<Copia, "ISBN">>({ livro: "", status: "", aluno: "" });
  const [editingISBN, setEditingISBN] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<Omit<Copia, "ISBN">>({ livro: "", status: "", aluno: "" });

  // paginação
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 14;

  // ref para fechar filtro ao clicar fora
  const filterRef = useRef<HTMLDivElement | null>(null);

  /* -------------------------------
     Load / persist (localStorage)
     ------------------------------- */
  useEffect(() => {
    try {
      const stored = localStorage.getItem("copia");
      if (stored) {
        const parsed: Copia[] = JSON.parse(stored);
        setcopia(parsed);
        setFilteredcopia(parsed);
        return;
      }
    } catch (err) {
      console.warn("Erro ao ler localStorage", err);
    }

    // Iniciar com array vazio
    setcopia([]);
    setFilteredcopia([]);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("copia", JSON.stringify(copia));
    } catch (err) {
      console.warn("Erro ao salvar localStorage", err);
    }
  }, [copia]);

  /* ----------------------------------
     Fechar filtro ao clicar fora
     ---------------------------------- */
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setShowFilter(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  /* ----------------------------------
     Aplicar filtros
     ---------------------------------- */
  useEffect(() => {
    const apply = () => {
      let result = copia.slice();
      if (filters.ISBN) result = result.filter(r => r.ISBN.toString().includes(filters.ISBN));
      if (filters.livro) result = result.filter(r => r.livro.toLowerCase().includes(filters.livro.toLowerCase()));
      if (filters.status) result = result.filter(r => r.status.toLowerCase().includes(filters.status.toLowerCase()));
      if (filters.aluno) result = result.filter(r => r.aluno.toLowerCase().includes(filters.aluno.toLowerCase()));

      setFilteredcopia(result);
      setCurrentPage(1);
    };

    apply();
  }, [copia, filters]);

  /* ----------------------------------
     Paginação (memos)
     ---------------------------------- */
  const totalPages = useMemo(() => Math.max(1, Math.ceil(filteredcopia.length / rowsPerPage)), [filteredcopia]);

  const currentRows = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredcopia.slice(start, start + rowsPerPage);
  }, [currentPage, filteredcopia]);

  /* ----------------------------------
     Seleção de linhas
     ---------------------------------- */
  const handleRowSelect = useCallback((ISBN: number) => {
    setSelectedRows(prev => (prev.includes(ISBN) ? prev.filter(x => x !== ISBN) : [...prev, ISBN]));
  }, []);

  const handleSelectAll = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedRows(currentRows.map(r => r.ISBN));
    else setSelectedRows([]);
  }, [currentRows]);

  /* ----------------------------------
     Adicionar
     ---------------------------------- */
  const handleAddOpen = () => {
    setNewCopia({ livro: "", status: "", aluno: "" });
    setShowAddModal(true);
  };

  const handleAddConfirm = () => {
    if ( !newCopia.livro.trim() || !newCopia.status.trim() || !newCopia.aluno.trim() ) {
      alert("Preencha todos os campos: Livro, Status e Aluno.");
      return;
    }

    const newISBN = copia.length > 0 ? Math.max(...copia.map(e => e.ISBN)) + 1 : 1;
    const entry: Copia = { ISBN: newISBN, livro: newCopia.livro.trim(), status: newCopia.status.trim(), aluno: newCopia.aluno.trim() };
    setcopia(prev => [...prev, entry]);
    setShowAddModal(false);
  };

  const handleAddCancel = () => {
    setShowAddModal(false);
    setNewCopia({ livro: "", status: "", aluno: "" });
  };

  /* ----------------------------------
     Deletar
     ---------------------------------- */
  const handleDeleteOpen = () => {
    if (selectedRows.length === 0) {
      alert("Selecione ao menos uma linha para deletar.");
      return;
    }
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setcopia(prev => prev.filter(e => !selectedRows.includes(e.ISBN)));
    setSelectedRows([]);
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => setShowDeleteModal(false);

  /* ----------------------------------
     Editar inline
     ---------------------------------- */
  const handleEditToggle = () => {
    if (editingISBN === null) {
      if (selectedRows.length !== 1) {
        alert("Selecione exatamente uma linha para editar.");
        return;
      }
      const ISBN = selectedRows[0];
      const row = copia.find(e => e.ISBN === ISBN)!;
      setEditingISBN(ISBN);
      setEditValues({ livro: row.livro, status: row.status, aluno: row.aluno });
    } else {
      if ( !editValues.livro.trim() || !editValues.status.trim() || !editValues.aluno.trim()) {
        alert("Preencha todos os campos: Aluno, Livro, Status e Data.");
        return;
      }

      setcopia(prev => prev.map(e => e.ISBN === editingISBN ? { ISBN: e.ISBN, livro: editValues.livro.trim(), status: editValues.status.trim(), aluno: editValues.aluno.trim()} : e));
      setEditingISBN(null);
      setEditValues({ livro: "", status: "", aluno: "" });
      setSelectedRows([]);
    }
  };

  const handleEditCancel = () => {
    setEditingISBN(null);
    setEditValues({ livro: "", status: "", aluno: "" });
    setSelectedRows([]);
  };

  /* ----------------------------------
     Misc
     ---------------------------------- */
  const clearFilters = () => setFilters({ ISBN: "", livro: "", status: "", aluno: "" });
  const hasActiveFilters = useMemo(() => Object.values(filters).some(v => v !== ""), [filters]);

  /* ----------------------------------
     Render
     ---------------------------------- */
  return (
    <div className="table-page-container">
      {/* HEADER */}
      <div className="table-header">
        <div className="header-buttons-container">
          <div className="table-controls">
            <div className="filter-container" ref={filterRef}>
              <button className={`filter-btn ${hasActiveFilters ? "active" : ""}`} onClick={() => setShowFilter(s => !s)}>
                Filter
                {hasActiveFilters && <span className="filter-indicator" />}
              </button>

              {showFilter && (
                <div className="filter-popup">
                  <div className="filter-header">
                    <h3>Filtrar por</h3>
                    <button className="close-filter-btn" onClick={() => setShowFilter(false)}>×</button>
                  </div>

                  <div className="filter-fields">
                    <div className="filter-field">
                      <label>ISBN</label>
                      <input 
                        value={filters.ISBN} 
                        onChange={(e) => setFilters(prev => ({ ...prev, ISBN: e.target.value }))} 
                        placeholder="Filtrar por ISBN" 
                      />
                    </div>

                    <div className="filter-field">
                      <label>Livro</label>
                      <input 
                        value={filters.livro} 
                        onChange={(e) => setFilters(prev => ({ ...prev, livro: e.target.value }))} 
                        placeholder="Filtrar por livro" 
                      />
                    </div>

                    <div className="filter-field">
                      <label>Status</label>
                      <input 
                        value={filters.status} 
                        onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))} 
                        placeholder="Filtrar por status" 
                      />
                    </div>

                    <div className="filter-field">
                      <label>Aluno</label>
                      <input 
                        value={filters.aluno} 
                        onChange={(e) => setFilters(prev => ({ ...prev, aluno: e.target.value }))} 
                        placeholder="Filtrar por aluno" 
                      />
                    </div>
                  </div>

                  <div className="filter-actions">
                    <button className="clear-filters-btn" onClick={clearFilters}>Limpar Filtros</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="table-buttons">
            <button className="add-btn" onClick={handleAddOpen} title="Adicionar">
              <img src={plusIcon} alt="Adicionar" className="button-icon" />
            </button>

            <button className="delete-btn" onClick={handleDeleteOpen} title="Deletar">
              <img src={trashIcon} alt="Deletar" className="button-icon" />
            </button>

            <button className="edit-btn" onClick={handleEditToggle} title={editingISBN ? "Salvar edição" : "Editar selecionado"}>
              <img src={editIcon} alt={editingISBN ? "Salvar" : "Editar"} className="button-icon" />
            </button>

            {editingISBN !== null && (
              <button className="cancel-edit-btn" onClick={handleEditCancel}>Cancelar</button>
            )}
          </div>
        </div>
      </div>

      {/* TABELA - VAZIA */}
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
              <th>ISBN</th>
              <th>NOME DO LIVRO</th>
              <th>STATUS</th>
              <th>NOME DO ALUNO</th>
            </tr>
          </thead>

          <tbody>
            {currentRows.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "18px 0"}}>
                  Nenhuma cópia cadastrada
                </td>
              </tr>
            ) : (
              currentRows.map((copia) => (
                <tr key={copia.ISBN} className={selectedRows.includes(copia.ISBN) ? "selected" : ""}>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={selectedRows.includes(copia.ISBN)} 
                      onChange={() => handleRowSelect(copia.ISBN)} 
                    />
                  </td>

                  <td>{copia.ISBN}</td>

                  <td>
                    {editingISBN === copia.ISBN ? (
                      <input 
                        className="inline-edit" 
                        value={editValues.livro} 
                        onChange={(e) => setEditValues(prev => ({ ...prev, livro: e.target.value }))} 
                      />
                    ) : (
                      copia.livro
                    )}
                  </td>

                  <td>
                    {editingISBN === copia.ISBN ? (
                      <input 
                        className="inline-edit" 
                        value={editValues.status} 
                        onChange={(e) => setEditValues(prev => ({ ...prev, status: e.target.value }))} 
                      />
                    ) : (
                      <span className={`status-badge status-${copia.status.toLowerCase()}`}>{copia.status}</span>
                    )}
                  </td>

                  <td>
                    {editingISBN === copia.ISBN ? (
                      <input 
                        className="inline-edit" 
                        value={editValues.aluno} 
                        onChange={(e) => setEditValues(prev => ({ ...prev, aluno: e.target.value }))} 
                      />
                    ) : (
                      copia.aluno
                    )}
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINAÇÃO */}
      <div className="pagination">
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Anterior</button>
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Próxima</button>
      </div>

      {/* MODAL ADD */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-container" role="dialog" aria-modal="true">
            <div className="modal-header">Adicionar Nova Cópia</div>
            <div className="modal-body">
              <div className="modal-field">
                <label>Nome do Livro</label>
                <input 
                  value={newCopia.livro} 
                  onChange={(e) => setNewCopia(prev => ({ ...prev, livro: e.target.value }))} 
                  placeholder="Digite o nome do livro" 
                />
              </div>

              <div className="modal-field">
                <label>Status</label>
                <select 
                  value={newCopia.status} 
                  onChange={(e) => setNewCopia(prev => ({ ...prev, status: e.target.value }))}
                >
                  <option value="">Selecione o status</option>
                  <option value="Ativo">Ativo</option>
                  <option value="Ativo">Devolvido</option>
                  <option value="Atrasado">Atrasado</option>
                  <option value="Atrasado">Renovado</option>
                </select>
              </div>

              <div className="modal-field">
                <label>Nome do Aluno</label>
                <input 
                  value={newCopia.aluno} 
                  onChange={(e) => setNewCopia(prev => ({ ...prev, aluno: e.target.value }))} 
                  placeholder="Digite o nome do aluno" 
                />
              </div>
            </div>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={handleAddCancel}>Cancelar</button>
              <button className="confirm-btn" onClick={handleAddConfirm}>Confirmar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DELETE */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-container" role="dialog" aria-modal="true">
            <div className="modal-header">Confirmar exclusão</div>
            <div className="modal-body">
              <p>Tem certeza que deseja deletar {selectedRows.length} registro(s)?</p>
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={handleDeleteCancel}>Cancelar</button>
              <button className="confirm-btn delete-confirm-btn" onClick={handleDeleteConfirm}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}