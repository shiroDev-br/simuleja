'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from "next/image";
import 'boxicons/css/boxicons.min.css';
import santander from '../../assets/santander.png';
import bradesco from '../../assets/bradesco.jpeg';
import caixa from '../../assets/caixa.png';
import itau from '../../assets/itau.jpeg';

export default function SimulateClient() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const router = useRouter();

  const [creditOptions, setCreditOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showNotApproved, setShowNotApproved] = useState(false);

  useEffect(() => {
    if (type === 'veiculos-leves') {
      setCreditOptions([
        "45.000,00", "50.000,00", "55.000,00", "60.000,00", "65.000,00", "70.000,00",
        "75.000,00", "80.000,00", "85.000,00", "90.000,00", "100.000,00", "110.000,00",
        "120.000,00", "130.000,00", "140.000,00", "150.000,00", "160.000,00", "170.000,00"
      ]);
    } else if (type === 'imovel') {
      setCreditOptions([
        "500.000,00", "550.000,00", "600.000,00", "650.000,00", "700.000,00", "750.000,00", "800.000,00", "850.000,00", "900.000,00", "950.000,00", "1.000.000,00"
      ]);
    } else if (type === 'veiculos-pesados') {
      setCreditOptions([
        "125.000,00", "130.000,00", "135.000,00", "140.000,00", "140.000,00", "145.000,00", "150.000,00", "160.000,00", "175.000,00", "190.000,00", "205.000,00", "220.000,00", "235.000,00", "250.000,00", "260.000,00", "270.000,00", "280.000,00", "290.000,00", "300.000,00"
      ]);
    } else {
      setCreditOptions([]);
    }
  }, [type]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const creditValue = formData.get("credito") as string;
    if (!type || !creditValue) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowNotApproved(true);
    }, 10000);
  };

  const handleRedirect = () => {
    setShowNotApproved(false);
    router.push(`/proposal?type=${type}&credit=0`);
  };
  

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
       <header className="relative h-96 overflow-hidden bg-gradient-to-br from-amber-500 to-amber-600">
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 space-y-6">
          {/* Título principal atualizado */}
          <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tight drop-shadow-xl">
            Simule Agora
            <span className="block mt-2 text-3xl md:text-4xl font-medium normal-case">
              Seu Financiamento
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="text-xl text-amber-100 font-medium max-w-2xl mx-auto">
            Simule sem compromisso - o resultado sai na hora!
          </p>

          {/* Parceiros com logos */}
          <div className="mt-8">
            <p className="text-sm text-amber-200 font-semibold mb-4">
              Somos parceiros das maiores instituições financeiras:
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              <Image 
                src={santander} 
                alt="Santander" 
                className="h-12 w-auto contrast-200 rounded-sm"
                width={160}
                height={48}
              />
              <Image 
                src={bradesco} 
                alt="Santander" 
                className="h-8  w-42 contrast-200 rounded-sm"
                width={160}
                height={48}
              />
              <Image 
                src={itau} 
                alt="Itaú" 
                className="h-10 w-auto contrast-200 rounded-sm"
                width={120}
                height={40}
              />
              <Image 
                src={caixa} 
                alt="Itaú" 
                className="h-10 w-auto contrast-200 rounded-sm"
                width={120}
                height={40}
              />
              {/* Adicione mais bancos conforme necessário */}
            </div>
          </div>
        </div>
      </header>

      {/* Form Section */}
      <section className="flex-grow container mx-auto px-6 py-16">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border-2 border-amber-100 space-y-6">
          <div>
            <label htmlFor="nome" className="block text-amber-600 font-semibold mb-2">Nome Completo</label>
            <input
              type="text"
              id="nome"
              name="nome"
              className="w-full px-4 py-3 rounded-lg bg-amber-50 text-gray-800 border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Digite seu nome"
            />
          </div>

          <div>
          <label htmlFor="cpf" className="block text-amber-600 font-semibold mb-2">CPF</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              className="w-full px-4 py-3 rounded-lg bg-amber-50 text-gray-800 border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Digite seu CPF"
            />
          </div>

          <div>
          <label htmlFor="Telefone" className="block text-amber-600 font-semibold mb-2">Telefone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="w-full px-4 py-3 rounded-lg bg-amber-50 text-gray-800 border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Digite seu Telefone de Contato"
            />
          </div>

          <div>
          <label htmlFor="Email" className="block text-amber-600 font-semibold mb-2">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full px-4 py-3 rounded-lg bg-amber-50 text-gray-800 border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Digite seu Email de Contato"
            />
          </div>


          <div>
            <label htmlFor="credito" className="block text-amber-600 font-semibold mb-2">Crédito Desejado</label>
            <select
              id="credito"
              name="credito"
              className="w-full px-4 py-3 rounded-lg bg-amber-50 text-gray-800 border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
              defaultValue=""
            >
              <option value="" disabled>Selecione um valor</option>
              {creditOptions.map((valor, index) => (
                <option key={index} value={valor}>{valor}</option>
              ))}
            </select>
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 rounded-lg text-white font-bold transition-all duration-300 shadow-md hover:shadow-amber-200"
          >
            Enviar Simulação
          </button>
        </form>
      </section>

      {/* Footer atualizado */}
      <footer className="bg-amber-50 text-amber-600 text-center py-6 border-t border-amber-200">
        <p>&copy; 2025 Financiamentos Rápidos. Todos os direitos reservados.</p>
      </footer>

      {/* Overlays atualizados */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/60 backdrop-blur-sm">
          <div className="text-center space-y-4">
            <i className='bx bx-loader-alt bx-spin text-5xl text-amber-600'></i>
            <p className="text-xl font-semibold text-white">Simulando seu financiamento...</p>
          </div>
        </div>
      )}

      {showNotApproved && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/70 backdrop-blur-md">
          <div className="text-center space-y-6 max-w-md mx-auto p-6 bg-white rounded-xl shadow-2xl border-2 border-amber-200">
            <i className='bx bx-x-circle text-6xl text-red-500'></i>
            <h2 className="text-2xl font-bold text-gray-800">Financiamento não aprovado</h2>
            <p className="text-amber-600">Infelizmente, não conseguimos aprovar essa simulação.</p>
            <button
              onClick={handleRedirect}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 rounded-lg text-white font-semibold transition-all"
            >
              Ver ofertas disponíveis
            </button>
          </div>
        </div>
      )}
    </div>
  );
}