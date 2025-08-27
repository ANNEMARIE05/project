export default function Achats() {
  const packs = [
    { id: 'p100', nom: 'Pack 100', quota: 100, prix: '5 000 FCFA' },
    { id: 'p500', nom: 'Pack 500', quota: 500, prix: '20 000 FCFA' },
    { id: 'p1k', nom: 'Pack 1 000', quota: 1000, prix: '35 000 FCFA' },
  ];

  return (
    <div className="space-y-3 sm:space-y-4">
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Achat de quota</h2>
        <p className="text-xs sm:text-sm text-gray-600">Choisissez un pack pour augmenter votre quota de documents OCR.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {packs.map((p) => (
          <div key={p.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col">
            <h3 className="text-base font-semibold text-gray-900">{p.nom}</h3>
            <p className="text-sm text-gray-600 mt-1">{p.quota} documents</p>
            <div className="mt-3 text-xl font-bold text-blue-600">{p.prix}</div>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">Acheter</button>
          </div>
        ))}
      </div>
    </div>
  );
}


