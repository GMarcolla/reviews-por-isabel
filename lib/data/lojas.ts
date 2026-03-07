import { Lugar } from '../types';

export const lojas: Lugar[] = [
  // Maquiagens e cosméticos
  {
    id: 'kimakes',
    nome: 'Kimakes',
    categoria: 'moda',
    descricaoCurta: 'Loja linda e super completa, com diversas marcas!',
    descricaoCompleta: 'Loja linda e super completa, com diversas marcas! Especializada em maquiagens e cosméticos de qualidade. Cupom de desconto disponível!',
    imagem: '/placeholder-loja.svg',
    imagemAlt: 'Kimakes',
    endereco: 'Blumenau-SC',
    instagramReview: 'https://www.instagram.com/reel/DNG5lNfy68D/?igsh=cWQyd3B5Nmx4dTIy',
    faixaPreco: 3,
    destaque: true,
    ordem: 1,
  },

  // Sousplats
  {
    id: 'souplast-go',
    nome: 'Souplast GO',
    categoria: 'decoracao',
    descricaoCurta: 'Eu amei a qualidade, e ela faz qualquer modelo que tu enviar!',
    descricaoCompleta: 'Eu amei a qualidade, e ela faz qualquer modelo que tu enviar! Sousplats personalizados com qualidade excepcional. Cupom de desconto disponível!',
    imagem: '/placeholder-loja.svg',
    imagemAlt: 'Souplast GO',
    endereco: 'Goiânia-GO',
    instagramReview: 'https://www.instagram.com/reel/DH_9LmVSXMG/?igsh=MW1oN2ozcTlyYjUzZA==',
    faixaPreco: 2,
    ordem: 2,
  },

  // Brechó
  {
    id: 'brecho-tresor',
    nome: 'Brechó Trésor By Saia de Filó',
    categoria: 'moda',
    descricaoCurta: 'Lá você encontra várias peças lindas e também artigos de luxo!',
    descricaoCompleta: 'Lá você encontra várias peças lindas e também artigos de luxo! Brechó com curadoria especial de peças exclusivas e artigos de luxo.',
    imagem: '/placeholder-loja.svg',
    imagemAlt: 'Brechó Trésor',
    endereco: 'Blumenau-SC',
    instagramReview: 'https://www.instagram.com/reel/DJ-F83gS1dl/?igsh=MXZndzNlNnhwdWRyeg==',
    faixaPreco: 3,
    destaque: true,
    ordem: 3,
  },

  // Velas aromáticas
  {
    id: 'zen-pra-caralho',
    nome: 'Zen Pra Caralh*',
    categoria: 'decoracao',
    descricaoCurta: 'Velas super cheirosas e muito criativas!',
    descricaoCompleta: 'Velas super cheirosas e muito criativas! Velas aromáticas artesanais com nomes divertidos e aromas incríveis.',
    imagem: '/placeholder-loja.svg',
    imagemAlt: 'Zen Pra Caralh*',
    endereco: 'Blumenau-SC',
    instagramReview: 'https://www.instagram.com/reel/DOMY5WqD0pS/?igsh=MTR0ajFzcTljNHYycw==',
    faixaPreco: 2,
    ordem: 4,
  },

  // Shopping
  {
    id: 'neumarkt-shopping',
    nome: 'Neumarkt Shopping',
    categoria: 'loja',
    descricaoCurta: 'Um lugar pra passar o tempo sem perceber, com muitas lojas e restaurantes de qualidade!',
    descricaoCompleta: 'Um lugar pra passar o tempo sem perceber, com muitas lojas e restaurantes de qualidade! Shopping completo com diversas opções de compras e gastronomia.',
    imagem: '/placeholder-loja.svg',
    imagemAlt: 'Neumarkt Shopping',
    endereco: 'Blumenau-SC',
    instagramReview: 'https://www.instagram.com/reel/DRqBvtODwE5/?igsh=MWRjZTJ1dzduY2tsNw==',
    faixaPreco: 3,
    destaque: true,
    ordem: 5,
  },
];

// Utility functions
export function getLojas(): Lugar[] {
  return lojas;
}

export function getLojaBySlug(slug: string): Lugar | undefined {
  return lojas.find(l => l.id === slug);
}

export function getLojasByCategoria(categoria: string): Lugar[] {
  return lojas.filter(l => l.categoria === categoria);
}

export function getLojasDestaque(): Lugar[] {
  return lojas.filter(l => l.destaque === true);
}
