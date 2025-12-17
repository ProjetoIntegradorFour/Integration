# 📚 Sistema de Gerenciamento de Biblioteca
Sistema robusto para automação de acervos, controle de empréstimos, reservas e gestão de multas, desenvolvido para atender às necessidades da unidade **SENAI - Centro de Formação Profissional Antônio Conceição Cunha Filho**.

---

## Sumário
- [📚 Sistema de Gerenciamento de Biblioteca](#-sistema-de-gerenciamento-de-biblioteca)
  - [Sumário](#sumário)
  - [Integrantes](#integrantes)
  - [Objetivo](#objetivo)
  - [Escopo do Produto](#escopo-do-produto)
  - [Arquitetura e Infraestrutura](#arquitetura-e-infraestrutura)
  - [Stack Tecnológica](#stack-tecnológica)
  - [Fluxos de Processo](#fluxos-de-processo)
    - [1. Fluxo do Leitor (Mobile)](#1-fluxo-do-leitor-mobile)
    - [2. Fluxo Administrativo (Web)](#2-fluxo-administrativo-web)
  - [Segurança e Qualidade](#segurança-e-qualidade)

---

## Integrantes
* Guilherme Camargo
* João Arantes 
* Melina Nogueira 
* Millena França 
* Thomas Steinhoff

---

## Objetivo
Modernizar a gestão bibliotecária através da substituição de processos manuais por uma plataforma digital integrada. O Sistema de Gerenciamento de Biblioteca visa otimizar o controle de acervos, automatizar notificações de atraso e oferecer uma experiência ágil para reserva e consulta de materiais.

---

## Escopo do Produto
* **Gestão de Acervo:** CRUD de títulos, periódicos e controle de cópias físicas.
* **Fluxo de Empréstimos:** Registro de retiradas, devoluções e cálculo automático de multas.
* **Sistema de Reservas:** Gerenciamento de fila de espera para obras sem estoque imediato.
* **Ecossistema Multiplataforma:** Interface Mobile (Leitor) e Dashboard Web (Administrativo).

---

## Arquitetura e Infraestrutura
O projeto adota uma arquitetura de microsserviços hospedada na **AWS**, utilizando:
* **VPC & Security Groups:** Redes isoladas para proteção de dados sensíveis.
* **EC2 & RDS:** Hospedagem do backend Java e banco de dados MySQL.
* **Amplify & Nginx:** Deployment do front-end e gerenciamento de proxy com SSL (HTTPS).

---

## Stack Tecnológica
* **Backend:** Java + Spring Boot (API RESTful) com autenticação JWT.
* **Frontend Web:** React + Vite (TypeScript) para gestão administrativa.
* **Mobile:** React Native + Expo (TypeScript) para interação dos alunos.

---

## Fluxos de Processo

### 1. Fluxo do Leitor (Mobile)
Focado na autonomia do aluno, o fluxo valida o token de acesso e verifica a elegibilidade do usuário (débitos ou limite de livros). O sistema gerencia o estoque em tempo real, direcionando o usuário para a **fila de espera** caso não haja exemplares disponíveis no momento.

### 2. Fluxo Administrativo (Web)
Destinado aos bibliotecários, permite o controle total do ciclo de vida do usuário e do acervo. Inclui o motor de multas automático para devoluções em atraso, gestão de bloqueios de conta e manutenção técnica dos registros bibliográficos.

---

## Segurança e Qualidade
O sistema foi submetido a uma avaliação de segurança através de testes de intrusão (**Pentest**) e varreduras automatizadas com **OWASP ZAP** em ambiente **Kali Linux**.

Foram identificadas e mitigadas vulnerabilidades de nível médio e baixo relacionadas a cabeçalhos de segurança (CSP e Clickjacking) e exposição de metadados do servidor. A infraestrutura foi reforçada com políticas de **Hardening** no Nginx e isolamento de banco de dados via Security Groups para garantir a integridade do acervo e a privacidade dos usuários.

---