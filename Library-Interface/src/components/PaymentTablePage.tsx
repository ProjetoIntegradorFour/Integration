import React, { useEffect, useRef, useState } from "react";

import plusIcon from "../assets/img/plus.png";
import trashIcon from "../assets/img/trash.png";
import editIcon from "../assets/img/edit.png";

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

const AtrasosPage: React.FC = () => {
  const [atrasos, setAtrasos] = useState<Atraso[]>([]);
  const [filteredAtrasos, setFilteredAtrasos] = useState<Atraso[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterState>({ 
    id: "", 
    aluno: "", 
    livro: "", 
    multa: "", 
    data: "" 
  });

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const [newAtraso, setNewAtraso] = useState<Omit<Atraso, "id">>({ 
    aluno: "", 
    livro: "", 
    multa: "", 
    data: "" 
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<Omit<Atraso, "id">>({ 
    aluno: "", 
    livro: "", 
    multa: "", 
    data: "" 
  });

  // paginação
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 14;

  const filterRef = useRef<HTMLDivElement | null>(null);

  // load localStorage
  useEffect(() => {
    const stored = localStorage.getItem("atrasos");
    if (stored) {
      const parsed: Atraso[] = JSON.parse(stored);
      setAtrasos(parsed);
      setFilteredAtrasos(parsed);
    } else {
      // Dados de exemplo para demonstração
      const exemploAtrasos: Atraso[] = [
        { id: 1, aluno: "João Silva", livro: "Dom Casmurro", multa: "R$ 5,00", data: "2024-01-15" },
        { id: 2, aluno: "Maria Santos", livro: "O Cortiço", multa: "R$ 10,00", data: "2024-01-10" },
        { id: 3, aluno: "Pedro Oliveira", livro: "Memórias Póstumas", multa: "R$ 15,50", data: "2024-01-05" },
        { id: 4, aluno: "Ana Costa", livro: "Iracema", multa: "R$ 7,00", data: "2024-01-20" },
        { id: 5, aluno: "Carlos Lima", livro: "O Guarani", multa: "R$ 12,00", data: "2024-01-18" },
      ];
      setAtrasos(exemploAtrasos);
      setFilteredAtrasos(exemploAtrasos);
    }
  }, []);

  // persist
  useEffect(() => {
    localStorage.setItem("atrasos", JSON.stringify(atrasos));
  }, [atrasos]);

  // fechar filtro clicando fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setShowFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // aplicar filtros
  useEffect(() => {
    let result = atrasos.slice();
    if (filters.id) result = result.filter(a => a.id.toString().includes(filters.id));
    if (filters.aluno) result = result.filter(a => a.aluno.toLowerCase().includes(filters.aluno.toLowerCase()));
    if (filters.livro) result = result.filter(a => a.livro.toLowerCase().includes(filters.livro.toLowerCase()));
    if (filters.multa) result = result.filter(a => a.multa.toLowerCase().includes(filters.multa.toLowerCase()));
    if (filters.data) result = result.filter(a => a.data.includes(filters.data));
    
    setFilteredAtrasos(result);
    setCurrentPage(1);
  }, [atrasos, filters]);

  // paginação
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredAtrasos.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.max(1, Math.ceil(filteredAtrasos.length / rowsPerPage));

  // seleção
  const handleRowSelect = (id: number) => {
    setSelectedRows(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedRows(currentRows.map(r => r.id));
    else setSelectedRows([]);
  };

  // adicionar (abre modal)
  const handleAddOpen = () => {
    setNewAtraso({ aluno: "", livro: "", multa: "", data: "" });
    setShowAddModal(true);
  };

  const handleAddConfirm = () => {
    if (!newAtraso.aluno.trim() || !newAtraso.livro.trim() || !newAtraso.multa.trim() || !newAtraso.data.trim()) {
      alert("Preencha todos os campos: Aluno, Livro, Multa e Data.");
      return;
    }
    const newId = atrasos.length > 0 ? Math.max(...atrasos.map(a => a.id)) + 1 : 1;
    const entry: Atraso = { 
      id: newId, 
      aluno: newAtraso.aluno.trim(), 
      livro: newAtraso.livro.trim(), 
      multa: newAtraso.multa.trim(), 
      data: newAtraso.data.trim() 
    };
    const updated = [...atrasos, entry];
    setAtrasos(updated);
    setShowAddModal(false);
  };

  const handleAddCancel = () => {
    setShowAddModal(false);
    setNewAtraso({ aluno: "", livro: "", multa: "", data: "" });
  };

  // deletar (abre modal)
  const handleDeleteOpen = () => {
    if (selectedRows.length === 0) {
      alert("Selecione ao menos uma linha para deletar.");
      return;
    }
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    const updated = atrasos.filter(a => !selectedRows.includes(a.id));
    setAtrasos(updated);
    setSelectedRows([]);
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  // editar: só quando uma linha selecionada
  const handleEditToggle = () => {
    if (editingId === null) {
      // entrar em modo edição
      if (selectedRows.length !== 1) {
        alert("Selecione exatamente uma linha para editar.");
        return;
      }
      const id = selectedRows[0];
      const atraso = atrasos.find(a => a.id === id)!;
      setEditingId(id);
      setEditValues({ 
        aluno: atraso.aluno, 
        livro: atraso.livro, 
        multa: atraso.multa, 
        data: atraso.data 
      });
    } else {
      // salvar edição
      if (!editValues.aluno.trim() || !editValues.livro.trim() || !editValues.multa.trim() || !editValues.data.trim()) {
        alert("Preencha todos os campos: Aluno, Livro, Multa e Data.");
        return;
      }
      const updated = atrasos.map(a => 
        a.id === editingId ? { 
          id: a.id, 
          aluno: editValues.aluno.trim(), 
          livro: editValues.livro.trim(), 
          multa: editValues.multa.trim(), 
          data: editValues.data.trim() 
        } : a
      );
      setAtrasos(updated);
      setEditingId(null);
      setEditValues({ aluno: "", livro: "", multa: "", data: "" });
      setSelectedRows([]);
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditValues({ aluno: "", livro: "", multa: "", data: "" });
    setSelectedRows([]);
  };

  const clearFilters = () => {
    setFilters({ id: "", aluno: "", livro: "", multa: "", data: "" });
  };

  const hasActiveFilters = () => {
    return filters.id !== "" || filters.aluno !== "" || filters.livro !== "" || filters.multa !== "" || filters.data !== "";
  };

  return (
    <div className="table-page-container">
      <div className="table-header">
        <div className="header-buttons-container">
          <div className="table-controls">
            <div className="filter-container" ref={filterRef}>
              <button 
                className={`filter-btn ${hasActiveFilters() ? 'active' : ''}`}
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
                    <div className="filter-field">
                      <label>ID</label>
                      <input 
                        type="text" 
                        value={filters.id} 
                        onChange={(e) => setFilters(prev => ({ ...prev, id: e.target.value }))}
                        placeholder="Filtrar por ID"
                      />
                    </div>
                    <div className="filter-field">
                      <label>Aluno</label>
                      <input 
                        type="text" 
                        value={filters.aluno} 
                        onChange={(e) => setFilters(prev => ({ ...prev, aluno: e.target.value }))}
                        placeholder="Filtrar por aluno"
                      />
                    </div>
                    <div className="filter-field">
                      <label>Livro</label>
                      <input 
                        type="text" 
                        value={filters.livro} 
                        onChange={(e) => setFilters(prev => ({ ...prev, livro: e.target.value }))}
                        placeholder="Filtrar por livro"
                      />
                    </div>
                    <div className="filter-field">
                      <label>Multa</label>
                      <input 
                        type="text" 
                        value={filters.multa} 
                        onChange={(e) => setFilters(prev => ({ ...prev, multa: e.target.value }))}
                        placeholder="Filtrar por multa"
                      />
                    </div>
                    <div className="filter-field">
                      <label>Data</label>
                      <input 
                        type="text" 
                        value={filters.data} 
                        onChange={(e) => setFilters(prev => ({ ...prev, data: e.target.value }))}
                        placeholder="Filtrar por data"
                      />
                    </div>
                  </div>
                  <div className="filter-actions">
                    <button className="clear-filters-btn" onClick={clearFilters}>
                      Limpar Filtros
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="table-buttons">
            <button className="add-btn" onClick={handleAddOpen}>
              <img src={plusIcon} alt="Adicionar" className="button-icon" />
            </button>

            <button className="delete-btn" onClick={handleDeleteOpen}>
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
              <th>NOME DO ALUNO</th>
              <th>LIVRO</th>
              <th>MULTA</th>
              <th>DATA</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((atraso) => (
              <tr key={atraso.id} className={selectedRows.includes(atraso.id) ? "selected" : ""}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(atraso.id)}
                    onChange={() => handleRowSelect(atraso.id)}
                  />
                </td>
                <td>{atraso.id}</td>

                <td>
                  {editingId === atraso.id ? (
                    <input 
                      className="inline-edit" 
                      value={editValues.aluno} 
                      onChange={(e) => setEditValues(prev => ({ ...prev, aluno: e.target.value }))} 
                    />
                  ) : (
                    atraso.aluno
                  )}
                </td>

                <td>
                  {editingId === atraso.id ? (
                    <input 
                      className="inline-edit" 
                      value={editValues.livro} 
                      onChange={(e) => setEditValues(prev => ({ ...prev, livro: e.target.value }))} 
                    />
                  ) : (
                    atraso.livro
                  )}
                </td>

                <td>
                  {editingId === atraso.id ? (
                    <input 
                      className="inline-edit" 
                      value={editValues.multa} 
                      onChange={(e) => setEditValues(prev => ({ ...prev, multa: e.target.value }))} 
                    />
                  ) : (
                    <span className="multa-value">
                      {atraso.multa}
                    </span>
                  )}
                </td>

                <td>
                  {editingId === atraso.id ? (
                    <input 
                      className="inline-edit" 
                      value={editValues.data} 
                      onChange={(e) => setEditValues(prev => ({ ...prev, data: e.target.value }))} 
                    />
                  ) : (
                    atraso.data
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

      {/* Paginação */}
      <div className="pagination">
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Anterior</button>
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Próxima</button>
      </div>

      {/* MODAL ADD */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-container" role="dialog" aria-modal="true">
            <div className="modal-header">Adicionar Novo Atraso/Pagamento</div>
            <div className="modal-body">
              <div className="modal-field">
                <label>Nome do Aluno</label>
                <input 
                  value={newAtraso.aluno} 
                  onChange={(e) => setNewAtraso(prev => ({ ...prev, aluno: e.target.value }))} 
                  placeholder="Digite o nome do aluno"
                />
              </div>
              <div className="modal-field">
                <label>Livro</label>
                <input 
                  value={newAtraso.livro} 
                  onChange={(e) => setNewAtraso(prev => ({ ...prev, livro: e.target.value }))} 
                  placeholder="Digite o nome do livro"
                />
              </div>
              <div className="modal-field">
                <label>Multa</label>
                <input 
                  value={newAtraso.multa} 
                  onChange={(e) => setNewAtraso(prev => ({ ...prev, multa: e.target.value }))} 
                  placeholder="Digite o valor da multa (ex: R$ 5,00)"
                />
              </div>
              <div className="modal-field">
                <label>Data</label>
                <input 
                  type="date"
                  value={newAtraso.data} 
                  onChange={(e) => setNewAtraso(prev => ({ ...prev, data: e.target.value }))} 
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
};

export default AtrasosPage;