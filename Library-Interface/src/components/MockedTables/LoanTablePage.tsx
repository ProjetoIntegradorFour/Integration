import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import plusIcon from "../../assets/img/plus.png";
import trashIcon from "../../assets/img/trash.png";
import editIcon from "../../assets/img/edit.png";

interface Emprestimo {
  id: number;
  aluno: string;
  livro: string;
  status: string;
  data: string; // YYYY-MM-DD
}

interface FilterState {
  id: string;
  aluno: string;
  livro: string;
  status: string;
  data: string;
}

// EmprestimosPage - refatorado (Opção B)
// Mantém todas as funcionalidades originais (filtros, seleção, adição, edição inline, exclusão, localStorage)
export default function EmprestimosPage(): JSX.Element {
  // estados principais
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [filteredEmprestimos, setFilteredEmprestimos] = useState<Emprestimo[]>([]);

  // seleção / UI
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<FilterState>({ id: "", aluno: "", livro: "", status: "", data: "" });

  // modais
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // add / edit forms
  const [newEmprestimo, setNewEmprestimo] = useState<Omit<Emprestimo, "id">>({ aluno: "", livro: "", status: "", data: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<Omit<Emprestimo, "id">>({ aluno: "", livro: "", status: "", data: "" });

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
      const stored = localStorage.getItem("emprestimos");
      if (stored) {
        const parsed: Emprestimo[] = JSON.parse(stored);
        setEmprestimos(parsed);
        setFilteredEmprestimos(parsed);
        return;
      }
    } catch (err) {
      console.warn("Erro ao ler localStorage", err);
    }

    // dados exemplo caso não tenha nada no local
    const exemplo: Emprestimo[] = [
      { id: 1, aluno: "João Silva", livro: "Dom Casmurro", status: "Ativo", data: "2024-01-15" },
      { id: 2, aluno: "Maria Santos", livro: "O Cortiço", status: "Devolvido", data: "2024-01-10" },
      { id: 3, aluno: "Pedro Oliveira", livro: "Memórias Póstumas", status: "Atrasado", data: "2024-01-05" },
    ];

    setEmprestimos(exemplo);
    setFilteredEmprestimos(exemplo);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("emprestimos", JSON.stringify(emprestimos));
    } catch (err) {
      console.warn("Erro ao salvar localStorage", err);
    }
  }, [emprestimos]);

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
      let result = emprestimos.slice();
      if (filters.id) result = result.filter(r => r.id.toString().includes(filters.id));
      if (filters.aluno) result = result.filter(r => r.aluno.toLowerCase().includes(filters.aluno.toLowerCase()));
      if (filters.livro) result = result.filter(r => r.livro.toLowerCase().includes(filters.livro.toLowerCase()));
      if (filters.status) result = result.filter(r => r.status.toLowerCase().includes(filters.status.toLowerCase()));
      if (filters.data) result = result.filter(r => r.data.includes(filters.data));

      setFilteredEmprestimos(result);
      setCurrentPage(1);
    };

    apply();
  }, [emprestimos, filters]);

  /* ----------------------------------
     Paginação (memos)
     ---------------------------------- */
  const totalPages = useMemo(() => Math.max(1, Math.ceil(filteredEmprestimos.length / rowsPerPage)), [filteredEmprestimos]);

  const currentRows = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredEmprestimos.slice(start, start + rowsPerPage);
  }, [currentPage, filteredEmprestimos]);

  /* ----------------------------------
     Seleção de linhas
     ---------------------------------- */
  const handleRowSelect = useCallback((id: number) => {
    setSelectedRows(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  }, []);

  const handleSelectAll = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedRows(currentRows.map(r => r.id));
    else setSelectedRows([]);
  }, [currentRows]);

  /* ----------------------------------
     Adicionar
     ---------------------------------- */
  const handleAddOpen = () => {
    setNewEmprestimo({ aluno: "", livro: "", status: "", data: "" });
    setShowAddModal(true);
  };

  const handleAddConfirm = () => {
    if (!newEmprestimo.aluno.trim() || !newEmprestimo.livro.trim() || !newEmprestimo.status.trim() || !newEmprestimo.data.trim()) {
      alert("Preencha todos os campos: Aluno, Livro, Status e Data.");
      return;
    }

    const newId = emprestimos.length > 0 ? Math.max(...emprestimos.map(e => e.id)) + 1 : 1;
    const entry: Emprestimo = { id: newId, aluno: newEmprestimo.aluno.trim(), livro: newEmprestimo.livro.trim(), status: newEmprestimo.status.trim(), data: newEmprestimo.data.trim() };
    setEmprestimos(prev => [...prev, entry]);
    setShowAddModal(false);
  };

  const handleAddCancel = () => {
    setShowAddModal(false);
    setNewEmprestimo({ aluno: "", livro: "", status: "", data: "" });
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
    setEmprestimos(prev => prev.filter(e => !selectedRows.includes(e.id)));
    setSelectedRows([]);
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => setShowDeleteModal(false);

  /* ----------------------------------
     Editar inline
     ---------------------------------- */
  const handleEditToggle = () => {
    if (editingId === null) {
      if (selectedRows.length !== 1) {
        alert("Selecione exatamente uma linha para editar.");
        return;
      }
      const id = selectedRows[0];
      const row = emprestimos.find(e => e.id === id)!;
      setEditingId(id);
      setEditValues({ aluno: row.aluno, livro: row.livro, status: row.status, data: row.data });
    } else {
      if (!editValues.aluno.trim() || !editValues.livro.trim() || !editValues.status.trim() || !editValues.data.trim()) {
        alert("Preencha todos os campos: Aluno, Livro, Status e Data.");
        return;
      }

      setEmprestimos(prev => prev.map(e => e.id === editingId ? { id: e.id, aluno: editValues.aluno.trim(), livro: editValues.livro.trim(), status: editValues.status.trim(), data: editValues.data.trim() } : e));
      setEditingId(null);
      setEditValues({ aluno: "", livro: "", status: "", data: "" });
      setSelectedRows([]);
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditValues({ aluno: "", livro: "", status: "", data: "" });
    setSelectedRows([]);
  };

  /* ----------------------------------
     Misc
     ---------------------------------- */
  const clearFilters = () => setFilters({ id: "", aluno: "", livro: "", status: "", data: "" });
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
                      <label>ID</label>
                      <input value={filters.id} onChange={(e) => setFilters(prev => ({ ...prev, id: e.target.value }))} placeholder="Filtrar por ID" />
                    </div>

                    <div className="filter-field">
                      <label>Aluno</label>
                      <input value={filters.aluno} onChange={(e) => setFilters(prev => ({ ...prev, aluno: e.target.value }))} placeholder="Filtrar por aluno" />
                    </div>

                    <div className="filter-field">
                      <label>Livro</label>
                      <input value={filters.livro} onChange={(e) => setFilters(prev => ({ ...prev, livro: e.target.value }))} placeholder="Filtrar por livro" />
                    </div>

                    <div className="filter-field">
                      <label>Status</label>
                      <input value={filters.status} onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))} placeholder="Filtrar por status" />
                    </div>

                    <div className="filter-field">
                      <label>Data</label>
                      <input value={filters.data} onChange={(e) => setFilters(prev => ({ ...prev, data: e.target.value }))} placeholder="Filtrar por data" />
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

            <button className="edit-btn" onClick={handleEditToggle} title={editingId ? "Salvar edição" : "Editar selecionado"}>
              <img src={editIcon} alt={editingId ? "Salvar" : "Editar"} className="button-icon" />
            </button>

            {editingId !== null && (
              <button className="cancel-edit-btn" onClick={handleEditCancel}>Cancelar</button>
            )}
          </div>
        </div>
      </div>

      {/* TABELA */}
      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" onChange={handleSelectAll} checked={selectedRows.length === currentRows.length && currentRows.length > 0} />
              </th>
              <th>ID</th>
              <th>NOME DO ALUNO</th>
              <th>LIVRO</th>
              <th>STATUS</th>
              <th>DATA</th>
            </tr>
          </thead>

          <tbody>
            {currentRows.map((emprestimo) => (
              <tr key={emprestimo.id} className={selectedRows.includes(emprestimo.id) ? "selected" : ""}>
                <td>
                  <input type="checkbox" checked={selectedRows.includes(emprestimo.id)} onChange={() => handleRowSelect(emprestimo.id)} />
                </td>

                <td>{emprestimo.id}</td>

                <td>
                  {editingId === emprestimo.id ? (
                    <input className="inline-edit" value={editValues.aluno} onChange={(e) => setEditValues(prev => ({ ...prev, aluno: e.target.value }))} />
                  ) : (
                    emprestimo.aluno
                  )}
                </td>

                <td>
                  {editingId === emprestimo.id ? (
                    <input className="inline-edit" value={editValues.livro} onChange={(e) => setEditValues(prev => ({ ...prev, livro: e.target.value }))} />
                  ) : (
                    emprestimo.livro
                  )}
                </td>

                <td>
                  {editingId === emprestimo.id ? (
                    <input className="inline-edit" value={editValues.status} onChange={(e) => setEditValues(prev => ({ ...prev, status: e.target.value }))} />
                  ) : (
                    <span className={`status-badge status-${emprestimo.status.toLowerCase()}`}>{emprestimo.status}</span>
                  )}
                </td>

                <td>
                  {editingId === emprestimo.id ? (
                    <input type="date" className="inline-edit" value={editValues.data} onChange={(e) => setEditValues(prev => ({ ...prev, data: e.target.value }))} />
                  ) : (
                    emprestimo.data
                  )}
                </td>
              </tr>
            ))}

            {currentRows.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "18px 0" }}>Nenhum registro</td>
              </tr>
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
            <div className="modal-header">Adicionar Novo Empréstimo</div>
            <div className="modal-body">
              <div className="modal-field">
                <label>Nome do Aluno</label>
                <input value={newEmprestimo.aluno} onChange={(e) => setNewEmprestimo(prev => ({ ...prev, aluno: e.target.value }))} placeholder="Digite o nome do aluno" />
              </div>

              <div className="modal-field">
                <label>Livro</label>
                <input value={newEmprestimo.livro} onChange={(e) => setNewEmprestimo(prev => ({ ...prev, livro: e.target.value }))} placeholder="Digite o nome do livro" />
              </div>

              <div className="modal-field">
                <label>Status</label>
                <select value={newEmprestimo.status} onChange={(e) => setNewEmprestimo(prev => ({ ...prev, status: e.target.value }))}>
                  <option value="">Selecione o status</option>
                  <option value="Ativo">Ativo</option>
                  <option value="Devolvido">Devolvido</option>
                  <option value="Atrasado">Atrasado</option>
                  <option value="Renovado">Renovado</option>
                </select>
              </div>

              <div className="modal-field">
                <label>Data</label>
                <input type="date" value={newEmprestimo.data} onChange={(e) => setNewEmprestimo(prev => ({ ...prev, data: e.target.value }))} />
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