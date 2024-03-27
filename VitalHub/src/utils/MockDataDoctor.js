import { CardSituation } from "./AppSituationCard";

export const DoctorData = [
    {
        id: 1,
        nome: "Dr. João Silva",
        especialidade: "Cardiologia",
        idade: 22,
        crm: "12345/SP",
        imagem: require('../assets/Images/Rectangle 414 (1).png'),
        situation: CardSituation.carriedOut,
        horario: "10:00",
        botaoCancelar: true,
        email: generateRandomEmail(),
    },
    {
        id: 2,
        nome: "Dra. Maria Oliveira",
        especialidade: "Dermatologia",
        idade: 76,
        crm: "54321/RJ",
        imagem: require('../assets/Images/Rectangle 414 (2).png'),
        situation: CardSituation.canceled,
        horario: "11:00",
        botaoCancelar: false,
        email: generateRandomEmail(),
    },
    {
        id: 3,
        nome: "Dr. Pedro Santos",
        especialidade: "Ortopedia",
        idade: 38,
        crm: "67890/MG",
        imagem: require('../assets/Images/Rectangle 414.png'),
        situation: CardSituation.scheduled,
        horario: "12:00",
        botaoCancelar: true,
        email: generateRandomEmail(),
    },
    // Adicione mais médicos conforme necessário
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
