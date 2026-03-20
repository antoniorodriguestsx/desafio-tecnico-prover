# Desafio Técnico – React Native (Expo)

App mobile para cadastro e controle de lojas e produtos, desenvolvido com Expo e React Native.

---

## Versões utilizadas

| Ferramenta | Versão |
|---|---|
| Node.js | 20.19.x |
| Expo SDK | 54 |
| React | 19.1.0 |
| React Native | 0.81.5 |
| Expo Router | 6.x |
| Gluestack UI | 3.x |
| Zustand | 5.x |
| MirageJS | 0.1.48 |
| TypeScript | 5.9.x |
| Jest | 30.x |

---

## Instalação e execução

```bash
# Instalar dependências
npm install

# Iniciar o projeto
npx expo start
```

Escaneie o QR code com o Expo Go ou pressione `a` para Android / `i` para iOS.

---

## Mock de back-end

O mock é iniciado automaticamente junto com o app. O MirageJS intercepta as requisições e simula os seguintes endpoints:

```
GET    /stores
POST   /stores
PUT    /stores/:id
DELETE /stores/:id

GET    /stores/:storeId/products
POST   /products
PUT    /products/:id
DELETE /products/:id
```

---

## Testes

```bash
# Rodar todos os testes
npm test

# Modo watch
npm run test:watch
```

---

## Funcionalidades

- Listagem, cadastro, edição e exclusão de lojas
- Listagem, cadastro, edição e exclusão de produtos por loja
- Busca e filtro em tempo real
- Validação de formulários
- Pull-to-refresh

---

## Estrutura do projeto

```
src/
├── app/              # Telas (Expo Router)
├── components/       # Componentes reutilizáveis
├── mocks/            # Mock de backend (MirageJS)
├── services/         # Camada de comunicação com a API
├── stores/           # Estado global (Zustand)
├── types/            # Tipagens TypeScript
└── __tests__/        # Testes unitários
```