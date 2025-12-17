import "../styles/global.css";
import Table from "../components/Table";
import LineChartLoans from "../components/LineChartLoans";
import Card from "../components/Card";

import warningLogo from "../assets/img/warningLogo.png";
import bookLogo from "../assets/img/bookLogo.png";
import userLogo from "../assets/img/userLogo.png";
import moneyLogo from "../assets/img/moneyLogo.png";

const LoanData = [
  { month: "Janeiro", amount: 5000 },
  { month: "Fevereiro", amount: 7000 },
  { month: "Março", amount: 6000 },
  { month: "Abril", amount: 8000 },
  { month: "Maio", amount: 9000 },
  { month: "Junho", amount: 7500 },
  { month: "Julho", amount: 8500 },
];

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      {/* Coluna da esquerda */}
      <div className="dashboard-left">
        <Card
          title={"Contagem"}
          imageUrl={bookLogo}
          line1={"456 Livros no total"}
          line2={"23 Emprestados"}
          line3={"1 Atrasados"}
        />
        <Card
          title={"Avisos"}
          imageUrl={warningLogo}
          line1={"456 Lorem Ipsum"}
          line2={"23 Lorem Ipsum"}
          line3={"1 Lorem Ipsum"}
        />
        <Card
          title={"Usuários"}
          imageUrl={userLogo}
          line1={"456 Lorem Ipsum"}
          line2={"23 Lorem Ipsum"}
          line3={"1 Lorem Ipsum"}
        />
        <Card
          title={"Pagamentos"}
          imageUrl={moneyLogo}
          line1={"456 Lorem Ipsum"}
          line2={"23 Lorem Ipsum"}
          line3={"1 Lorem Ipsum"}
        />
      </div>

      {/* Coluna da direita */}
      <div className="dashboard-right">
        <Table />
        <LineChartLoans data={LoanData} />
      </div>
    </div>
  );
}