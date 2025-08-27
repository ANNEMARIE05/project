export default function Transactions() {
  const lignes = [
    { id: 'a1', date: '12/02/2025', utilisateur: 'Jean Dupont', type: 'Achat pack 100', montant: '5 000 FCFA', statut: 'Réussi' },
    { id: 'a2', date: '10/02/2025', utilisateur: 'Marie Martin', type: 'Achat pack 500', montant: '20 000 FCFA', statut: 'Réussi' },
  ];

  return (
    <div className="space-y-3 sm:space-y-4">
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Transactions</h2>
        <p className="text-xs sm:text-sm text-gray-600">Suivez les achats de quotas effectués par les utilisateurs</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilisateur</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lignes.map(l => (
                <tr key={l.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{l.date}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{l.utilisateur}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{l.type}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{l.montant}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">{l.statut}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


