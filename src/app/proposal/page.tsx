'use client';

import { useState, useEffect } from "react";

type ProposalData = {
  credit: number;
  entrada: number;
  proposal1: string; // Valor da parcela para o prazo menor
  proposal2: string; // Valor da parcela para o prazo maior
};

type ProposalState = {
  type: string;
  first: ProposalData;
  second: ProposalData;
};

export default function Proposal() {
  const [proposal, setProposal] = useState<ProposalState | null>(null);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutos em segundos

  // Countdown timer: diminui 1 segundo a cada intervalo
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Converte timeLeft em minutos e segundos
  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    // Lê os parâmetros da URL
    const searchParams = new URLSearchParams(window.location.search);
    const typeParam = searchParams.get("type")?.toLowerCase();
    const creditParam = searchParams.get("credit");

    if (!typeParam || !creditParam) return;

    // Converte o crédito informado para número:
    const parsedCredit = parseFloat(
      creditParam.replace(/[^\d,.-]/g, "").replace(",", ".")
    );
    if (isNaN(parsedCredit)) return;

    // Define as tabelas de dados para cada tipo.
    // Estes arrays podem (e devem) ser expandidos com os dados completos.

    // Tabela para "imovel": Prazos: 214 e 220 Meses
    const imovelTable: ProposalData[] = [
      { credit: 500000, entrada: 70000, proposal1: "2.910,80", proposal2: "2.887,32" },
      { credit: 550000, entrada: 77000, proposal1: "3.201,88", proposal2: "3.176,06" },
      { credit: 600000, entrada: 84000, proposal1: "3.492,96", proposal2: "3.464,79" },
      { credit: 650000, entrada: 91000, proposal1: "3.784,04", proposal2: "3.753,52" },
      { credit: 700000, entrada: 98000, proposal1: "4.075,12", proposal2: "4.042,25" },
      { credit: 750000, entrada: 105000, proposal1: "4.366,20", proposal2: "4.330,99" },
      { credit: 800000, entrada: 112000, proposal1: "4.657,28", proposal2: "4.619,72" },
      { credit: 850000, entrada: 119000, proposal1: "4.948,36", proposal2: "4.906,45" },
      { credit: 900000, entrada: 126000, proposal1: "5.239,44", proposal2: "5.197,18" },
      { credit: 950000, entrada: 133000, proposal1: "5.530,60", proposal2: "5.485,92" },
      { credit: 1000000, entrada: 140000, proposal1: "5.821,60", proposal2: "5.774,65" },
    ];

    // Tabela para "veiculos-pesados": Prazos: 71 e 98 Meses
    const veiculosPesadosTable: ProposalData[] = [
        { credit: 125000, entrada: 17500, proposal1: "1.851,41", proposal2: "1.533,82" },
        { credit: 130000, entrada: 18200, proposal1: "1.925,47", proposal2: "1.595,17" },
        { credit: 135000, entrada: 18900, proposal1: "1.999,53", proposal2: "1.656,53" },
        { credit: 140000, entrada: 19600, proposal1: "2.073,58", proposal2: "1.717,88" },
        { credit: 145000, entrada: 20300, proposal1: "2.147,64", proposal2: "1.779,23" },
        { credit: 150000, entrada: 21000, proposal1: "2.221,70", proposal2: "1.840,59" },
        { credit: 160000, entrada: 22400, proposal1: "2.369,81", proposal2: "1.963,29" },
        { credit: 175000, entrada: 24500, proposal1: "2.591,98", proposal2: "2.147,35" },
        { credit: 190000, entrada: 26600, proposal1: "2.814,15", proposal2: "2.331,41" },
        { credit: 205000, entrada: 28700, proposal1: "3.036,32", proposal2: "2.515,47" },
        { credit: 220000, entrada: 30800, proposal1: "3.258,49", proposal2: "2.699,53" },
        { credit: 235000, entrada: 32900, proposal1: "3.480,66", proposal2: "2.883,59" },
        { credit: 250000, entrada: 35000, proposal1: "3.702,83", proposal2: "3.067,64" },
        { credit: 260000, entrada: 36400, proposal1: "4.211,26", proposal2: "3.051,02" },
        { credit: 270000, entrada: 37800, proposal1: "4.373,23", proposal2: "3.168,36" },
        { credit: 280000, entrada: 39200, proposal1: "4.535,21", proposal2: "3.285,71" },
        { credit: 290000, entrada: 40600, proposal1: "4.697,18", proposal2: "3.403,06" },
        { credit: 300000, entrada: 42000, proposal1: "4.859,15", proposal2: "3.520,08" },
      ];
      

    // Tabela para "veiculos-leves": Prazos: 61 e 88 Meses
    const veiculosLevesTable: ProposalData[] = [
      { credit: 45000, entrada: 6300, proposal1: "855,73", proposal2: "593,18" },
      { credit: 50000, entrada: 7000, proposal1: "950,81", proposal2: "659,09" },
      { credit: 55000, entrada: 7700, proposal1: "1.045,90", proposal2: "725,00" },
      { credit: 60000, entrada: 8400, proposal1: "1.140,98", proposal2: "790,91" },
      { credit: 65000, entrada: 9100, proposal1: "1.236,06", proposal2: "856,82" },
      { credit: 70000, entrada: 9800, proposal1: "1.331,15", proposal2: "922,73" },
      { credit: 75000, entrada: 10500, proposal1: "1.426,23", proposal2: "988,64" },
      { credit: 80000, entrada: 11200, proposal1: "1.521,31", proposal2: "1.054,55" },
      { credit: 85000, entrada: 11900, proposal1: "1.616,38", proposal2: "1.120,45" },
      { credit: 90000, entrada: 12600, proposal1: "1.903,97", proposal2: "1.319,80" },
      { credit: 100000, entrada: 14000, proposal1: "2.091,80", proposal2: "1.450,00" },
      { credit: 110000, entrada: 15400, proposal1: "2.113,47", proposal2: "1.465,02" },
      { credit: 120000, entrada: 16800, proposal1: "2.286,29", proposal2: "1.584,82" },
      { credit: 130000, entrada: 18200, proposal1: "2.427,13", proposal2: "1.713,64" },
      { credit: 140000, entrada: 19600, proposal1: "2.662,30", proposal2: "1.845,46" },
      { credit: 150000, entrada: 21000, proposal1: "2.852,49", proposal2: "1.977,30" },
      { credit: 160000, entrada: 22400, proposal1: "3.042,63", proposal2: "2.109,10" },
      { credit: 170000, entrada: 23800, proposal1: "3.231,30", proposal2: "2.240,09" },
    ];

    let tableData: ProposalData[] = [];

    // Seleciona a tabela de acordo com o tipo
    if (typeParam === "imovel") {
      tableData = imovelTable;
    } else if (typeParam === "veiculos-pesados") {
      tableData = veiculosPesadosTable;
    } else if (typeParam === "veiculos-leves") {
      tableData = veiculosLevesTable;
    } else {
      console.warn("Tipo de consórcio não reconhecido.");
      return;
    }

    // Ordena a tabela por crédito (caso ainda não esteja ordenada)
    tableData.sort((a, b) => a.credit - b.credit);

    // Encontra a melhor proposta: a maior linha cujo crédito seja menor ou igual ao informado.
    const chosenRow =
      tableData.reduce<ProposalData | null>((prev, curr) => {
        if (curr.credit <= parsedCredit && (!prev || curr.credit > prev.credit)) {
          return curr;
        }
        return prev;
      }, null) || tableData[0];

    // Procura pela próxima proposta (com crédito maior que o escolhido)
    const nextRow = tableData.find((row) => row.credit > chosenRow.credit);

    // Se não achar a próxima, repetir a atual (ou implementar outro comportamento)
    setProposal({
      type: typeParam,
      first: chosenRow,
      second: nextRow || chosenRow,
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#ffffff] py-10 px-4 flex flex-col items-center gap-10 font-sans transition-all duration-500">
      <div className="text-center">
        <p className="text-4xl text-amber-600 font-bold">Nosso parceiro</p>
        <div className="mt-2">
          <img
            src="https://analisedecredito.net.br/wp-content/uploads/2024/10/innove_logo_doc-1.png"
            alt="INNOVE"
            width={301}
            height={90}
            className="mx-auto"
          />
        </div>
        <p className="mt-6 text-2xl sm:text-3xl text-amber-600 font-medium">
          Tem duas ofertas especiais para você:
        </p>
      </div>

      {/* Timer de 30 minutos */}
      <div className="w-full max-w-md text-center">
        <p className="text-sm text-red-600 tracking-wide font-semibold uppercase">
          Oferta expira em:
        </p>
        <div className="mt-2 bg-red-100 rounded-xl shadow-sm py-2 text-xl font-bold text-red-800">
          {formatTime(timeLeft)}
        </div>
      </div>

      {proposal && (
        <>
          <div className="w-full max-w-md text-center">
            <p className="text-sm text-gray-500 tracking-wide font-semibold uppercase">
              Valor de crédito aprovado:
            </p>
            <div className="mt-2 bg-white rounded-xl shadow-sm py-4 text-2xl font-bold text-gray-800">
              {`R$ ${proposal.first.credit.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}`}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
            {/* Condição 1: Proposta escolhida */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 transition-transform hover:scale-[1.015]">
              <div className="bg-white text-amber-600 border border-amber-300 py-3 rounded-t-2xl text-center font-semibold">
                Condição 1
              </div>
              <div className="p-6 grid gap-4">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Entrada</p>
                  <input
                    readOnly
                    value={`R$ ${proposal.first.entrada.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}`}
                    className="w-full px-3 py-2 border rounded-md font-bold text-gray-800 bg-gray-100"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">
                      {proposal.type === "imovel"
                        ? "214 Meses"
                        : proposal.type === "veiculos-leves"
                        ? "61 Meses"
                        : "71 Meses"}
                    </p>
                    <input
                      readOnly
                      value={`R$ ${proposal.first.proposal1}`}
                      className="w-full px-3 py-2 border rounded-md font-bold text-gray-800 bg-gray-100"
                    />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">
                      {proposal.type === "imovel"
                        ? "220 Meses"
                        : proposal.type === "veiculos-leves"
                        ? "88 Meses"
                        : "98 Meses"}
                    </p>
                    <input
                      readOnly
                      value={`R$ ${proposal.first.proposal2}`}
                      className="w-full px-3 py-2 border rounded-md font-bold text-gray-800 bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Condição 2: Próxima proposta */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 transition-transform hover:scale-[1.015]">
              <div className="bg-white text-amber-600 border border-amber-300 py-3 rounded-t-2xl text-center font-semibold">
                Condição 2
              </div>
              <div className="p-6 grid gap-4">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Entrada</p>
                  <input
                    readOnly
                    value={`R$ ${proposal.second.entrada.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}`}
                    className="w-full px-3 py-2 border rounded-md font-bold text-gray-800 bg-gray-100"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">
                      {proposal.type === "imovel"
                        ? "214 Meses"
                        : proposal.type === "veiculos-leves"
                        ? "61 Meses"
                        : "71 Meses"}
                    </p>
                    <input
                      readOnly
                      value={`R$ ${proposal.second.proposal1}`}
                      className="w-full px-3 py-2 border rounded-md font-bold text-gray-800 bg-gray-100"
                    />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">
                      {proposal.type === "imovel"
                        ? "220 Meses"
                        : proposal.type === "veiculos-leves"
                        ? "88 Meses"
                        : "98 Meses"}
                    </p>
                    <input
                      readOnly
                      value={`R$ ${proposal.second.proposal2}`}
                      className="w-full px-3 py-2 border rounded-md font-bold text-gray-800 bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
