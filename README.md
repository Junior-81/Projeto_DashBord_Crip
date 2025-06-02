# 🚀 CryptoBoard - Dashboard de Criptomoedas


## 📋 Visão Geral

CryptoBoard é uma aplicação web moderna desenvolvida com Next.js que permite aos usuários monitorar criptomoedas em tempo real. A aplicação oferece uma interface intuitiva e responsiva para acompanhar preços, variações e detalhes das principais criptomoedas do mercado.

![Next.js](https://img.shields.io/badge/Next.js-13.0+-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-2.0+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)

## ✨ Funcionalidades

- **🔍 Dashboard Completo:** Visualize as principais criptomoedas com informações detalhadas
- **💹 Monitoramento em Tempo Real:** Acompanhe dados atualizados de preços e variações
- **🔄 Conversor de Moedas:** Converta valores entre diferentes criptomoedas e moedas fiduciárias
- **⭐ Sistema de Favoritos:** Marque suas criptomoedas favoritas para fácil acesso
- **📊 Gráficos Interativos:** Visualize o histórico de preços com gráficos detalhados
- **🔍 Filtros e Buscas:** Encontre rapidamente qualquer criptomoeda por nome ou símbolo
- **🔄 Seleção de Moedas:** Alterne entre diferentes moedas (BRL, USD, EUR) para visualização
- **🌓 Tema Claro/Escuro:** Interface adaptada para preferências visuais do usuário

## 🛠️ Tecnologias Utilizadas

- **Framework:** Next.js (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Componentes UI:** Custom components usando Tailwind
- **Gráficos:** Chart.js / React Chart.js
- **Requisições HTTP:** Axios
- **Gerenciamento de Estado:** React Hooks
- **Implantação:** Vercel

## 📡 APIs Consumidas

### CoinGecko API

O projeto utiliza principalmente a API pública do CoinGecko para obter dados sobre criptomoedas:

- **Endpoints Principais:**
  - `/coins/markets` - Lista de criptomoedas com preços e dados de mercado
  - `/coins/{id}` - Informações detalhadas sobre uma criptomoeda específica
  - `/coins/{id}/market_chart` - Dados históricos para gráficos de preços
  - `/simple/price` - Preços atuais para conversão de moedas

### Gerenciamento de Dados:

- Implementação de cache para reduzir o número de requisições à API
- Tratamento de erros e estados de carregamento
- Conversão entre diferentes moedas fiduciárias (BRL, USD, EUR)

## 🏗️ Estrutura do Projeto

```
src/
├── app/                       # Páginas da aplicação (Next.js App Router)
│   ├── page.tsx               # Página principal (Dashboard)
│   └── coin/[id]/page.tsx     # Página de detalhes de criptomoedas
├── components/                # Componentes reutilizáveis
│   ├── CryptoCard.tsx         # Card individual de criptomoeda
│   ├── FilterBar.tsx          # Barra de pesquisa e filtros
│   ├── CurrencyConverter.tsx  # Conversor de criptomoedas
│   └── PriceChart.tsx         # Componente de gráfico de preços
├── services/                  # Serviços e APIs
│   └── cryptoService.ts       # Integração com a API do CoinGecko
└── hooks/                     # Custom hooks
    └── useFavorites.ts        # Hook para gerenciar favoritos
```

## 📱 Layout Responsivo

A aplicação foi desenvolvida com um design totalmente responsivo, proporcionando uma excelente experiência de usuário em dispositivos desktop, tablets e smartphones:

- **Layout Desktop:** Visualização completa com múltiplas colunas
- **Layout Tablet:** Adaptação para tela média com duas colunas
- **Layout Mobile:** Interface otimizada para dispositivos móveis



