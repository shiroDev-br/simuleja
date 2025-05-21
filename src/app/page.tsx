import Image from "next/image";
import CreditCard from '../assets/CreditCard.svg';
import lambo from '../assets/lambo.jpg';
import Link from 'next/link';
import 'boxicons/css/boxicons.min.css';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-amber-100 to-amber-50 text-center py-20">
        <h1 className="text-5xl md:text-6xl font-extrabold text-amber-600">
          Simule seu financiamento
        </h1>
      </header>

      {/* Financing Options */}
      <section className="flex-grow container mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold text-center text-amber-600 mb-12">
          Selecione a opção desejada
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {financingOptions.map((option, index) => {
            let typeParam = "";
            if (option.title.toLowerCase().includes("leves")) {
              typeParam = "veiculos-leves";
            } else if (option.title.toLowerCase().includes("pesados")) {
              typeParam = "veiculos-pesados";
            } else if (option.title.toLowerCase().includes("imóveis") || option.title.toLowerCase().includes("imoveis")) {
              typeParam = "imovel";
            }
            return (
              <Link key={index} href={`/simulate?type=${typeParam}`} passHref>
                  <img
                    src={option.image}
                    alt={option.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="bg-white p-6 border border-amber-100 shadow-lgw hover:border-amber-300 transition-all rounded-lg overflow-hidden text-center">
                    <h3 className="text-xl font-semibold text-amber-600">
                      {option.title}
                    </h3>
                  </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-50 text-amber-600 text-center py-6 border-t border-amber-200">
        <p>&copy; 2025 Financiamentos Rápidos. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

const financingOptions = [
  {
    title: "Veículos Leves",
    image: "https://nxboats.com.br/wp-content/uploads/2023/11/marcas-de-carros-de-luxo-lamborghini.jpg"
  },
  {
    title: "Veículos Pesados",
    image: "https://fotos-estradao-estadao.nyc3.cdn.digitaloceanspaces.com/wp-content/uploads/2022/05/10120845/Actros-2653-13-1160x775.jpg"
  },
  {
    title: "Imóveis",
    image: "https://swellconstrucoes.com.br/wp-content/uploads/2021/04/apartamento-de-luxo-1.png"
  }
];