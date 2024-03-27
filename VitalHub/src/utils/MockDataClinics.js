import { CardSituation } from "./AppSituationCard";

export const ClinicData = [
    {
        id: 1,
        nome: "Clínica Cardiomed",
        localidade: "Rua dos Médicos, 123, Cidade A",
        horarioFuncionamento: "Seg-Sab",
        classificacao: 4.5,
        situation: CardSituation.scheduled
    },
    {
        id: 2,
        nome: "Clínica Dermacare",
        localidade: "Avenida das Peles, 456, Cidade B",
        horarioFuncionamento: "Seg-Sex",
        classificacao: 4.2,
        situation: CardSituation.scheduled
    },
    {
        id: 3,
        nome: "Clínica Ortopedia Total",
        localidade: "Travessa dos Ossos, 789, Cidade C",
        horarioFuncionamento: "Seg-Sex",
        classificacao: 4.8,
        situation: CardSituation.scheduled
    },
    {
        id: 4,
        nome: "Clínica OdontoMais",
        localidade: "Rua dos Dentistas, 101, Cidade D",
        horarioFuncionamento: "Seg-Sex",
        classificacao: 4.0,
        situation: CardSituation.scheduled
    },
    {
        id: 5,
        nome: "Clínica OftalmoVisão",
        localidade: "Avenida dos Olhos, 202, Cidade E",
        horarioFuncionamento: "Seg-Sab",
        classificacao: 4.7,
        situation: CardSituation.scheduled
    },
    {
        id: 6,
        nome: "Clínica Geral Bem-Estar",
        localidade: "Rua da Saúde, 303, Cidade F",
        horarioFuncionamento: "Ter-Dom",
        classificacao: 5.0,
        situation: CardSituation.scheduled
    },
];
