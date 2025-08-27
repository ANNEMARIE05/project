import { useState } from 'react';

type Pack = { id: string; nom: string; quota: number; prix: string };

export default function Packs() {
  const [packs, setPacks] = useState<Pack[]>([
    { id: 'p100', nom: 'Pack 100', quota: 100, prix: '5 000 FCFA' },
    { id: 'p500', nom: 'Pack 500', quota: 500, prix: '20 000 FCFA' },
  ]);
  const [form, setForm] = useState<Pack>({ id: '', nom: '', quota: 100, prix: '' });

  const enregistrer = () => {
    if (!form.nom || !form.prix) return;
    if (form.id) {
      setPacks(packs.map(p => (p.id === form.id ? form : p)));
    } else {
      setPacks([...packs, { ...form, id: `p-${Date.now()}` }]);
    }
    setForm({ id: '', nom: '', quota: 100, prix: '' });
  };

  const editer = (p: Pack) => setForm(p);
  const supprimer = (id: string) => setPacks(packs.filter(p => p.id !== id));

  return (
    <div className="space-y-3 sm:space-y-4">
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Packs quotas</h2>
        <p className="text-xs sm:text-sm text-gray-600">Créer et mettre à jour les packs de quotas</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Nom</label>
            <input value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Quota</label>
            <input type="number" value={form.quota} onChange={e => setForm({ ...form, quota: Number(e.target.value) })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Prix</label>
            <input value={form.prix} onChange={e => setForm({ ...form, prix: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" />
          </div>
        </div>
        <div className="mt-3 flex space-x-2">
          <button onClick={enregistrer} className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">{form.id ? 'Mettre à jour' : 'Créer'}</button>
          {form.id && <button onClick={() => setForm({ id: '', nom: '', quota: 100, prix: '' })} className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm">Annuler</button>}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quota</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {packs.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{p.nom}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{p.quota}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{p.prix}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    <button onClick={() => editer(p)} className="text-blue-600 hover:text-blue-800 mr-2">Éditer</button>
                    <button onClick={() => supprimer(p.id)} className="text-red-600 hover:text-red-800">Supprimer</button>
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


