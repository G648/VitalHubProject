import { CardSituation } from "./AppSituationCard";

export const MockData = [
    {
        id: 1,
        nome: "João",
        idade: 30,
        imagem: 'https://github.com/gsolivier.png',
        situacao: "urgencia",
        horario: "10:00",
        botaoCancelar: true,
        situation: CardSituation.scheduled,
        email: generateRandomEmail(),
    },
    {
        id: 2,
        nome: "Maria",
        idade: 25,
        imagem: "https://github.com/G648.png",
        situacao: "rotina",
        horario: "11:00",
        botaoCancelar: false,
        situation: CardSituation.canceled,
        email: generateRandomEmail(),
    },
    {
        id: 3,
        nome: "Pedro",
        idade: 40,
        imagem: "https://github.com/JoaoRoccella.png",
        situacao: "consulta",
        horario: "12:00",
        botaoCancelar: true,
        situation: CardSituation.carriedOut,
        email: generateRandomEmail(),
    },
    {
        id: 4,
        nome: "Ana",
        idade: 35,
        imagem: "https://github.com/fiorentinoartur.png",
        situacao: "rotina",
        horario: "13:00",
        botaoCancelar: true,
        situation: CardSituation.canceled,
        email: generateRandomEmail(),
    },
    {
        id: 5,
        nome: "Lucas",
        idade: 28,
        imagem: "https://github.com/Carlos-Augusto-Roque.png",
        situacao: "urgencia",
        horario: "14:00",
        botaoCancelar: false,
        situation: CardSituation.carriedOut,
        email: generateRandomEmail(),
    },
    {
        id: 6,
        nome: "Carla",
        idade: 32,
        imagem: "https://github.com/JoaoRoccella.png",
        situacao: "consulta",
        horario: "15:00",
        botaoCancelar: true,
        situation: CardSituation.carriedOut,
        email: generateRandomEmail(),
    },
    {
        id: 7,
        nome: "Mariana",
        idade: 27,
        imagem: "https://github.com/Carlos-Augusto-Roque.png",
        situacao: "rotina",
        horario: "16:00",
        botaoCancelar: false,
        situation: CardSituation.scheduled,
        email: generateRandomEmail(),
    },
    {
        id: 8,
        nome: "Felipe",
        idade: 38,
        imagem: "https://github.com/gsolivier.png",
        situacao: "consulta",
        horario: "17:00",
        botaoCancelar: true,
        situation: CardSituation.scheduled,
        email: generateRandomEmail(),
    },
    {
        id: 9,
        nome: "Julia",
        idade: 23,
        imagem: "https://github.com/Carlos-Augusto-Roque.png",
        situacao: "rotina",
        horario: "18:00",
        botaoCancelar: true,
        situation: CardSituation.canceled,
        email: generateRandomEmail(),
    },
    {
        id: 10,
        nome: "Gustavo",
        idade: 29,
        imagem: "https://github.com/G648.png",
        situacao: "urgencia",
        horario: "19:00",
        botaoCancelar: false,
        situation: CardSituation.carriedOut,
        email: generateRandomEmail(),
    }
];


function generateRandomEmail() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let email = '';
    for (let i = 0; i < 10; i++) {
        email += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    email += '@example.com'; // Adiciona um domínio fictício
    return email;
}