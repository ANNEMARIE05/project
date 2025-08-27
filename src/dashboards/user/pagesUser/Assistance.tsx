import React, { useState } from 'react';

interface Message {
  id: string;
  titre: string;
  description: string;
  statut: 'ouvert' | 'ferme';
  dateCreation: string;
  dernierMessage: string;
}

interface MessageChat {
  id: string;
  texte: string;
  expediteur: 'utilisateur' | 'support';
  horodatage: string;
}

export default function Assistance() {
  const [ongletActif, setOngletActif] = useState<'nouveau' | 'conversations'>('nouveau');
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [conversationSelectionnee, setConversationSelectionnee] = useState<Message | null>(null);
  const [nouveauMessage, setNouveauMessage] = useState('');
  const [messagesChat, setMessagesChat] = useState<MessageChat[]>([]);
  const [conversations, setConversations] = useState<Message[]>([
    {
      id: '1',
      titre: 'Problème de connexion',
      description: 'Je n\'arrive pas à me connecter à mon compte',
      statut: 'ouvert',
      dateCreation: '2024-01-15',
      dernierMessage: 'Nous travaillons sur votre problème...'
    },
    {
      id: '2',
      titre: 'Problème d\'extraction de fichier',
      description: 'Mon quota n\'est pas encore atteint mais je n\'arrive plus à extraire mes fichiers',
      statut: 'ferme',
      dateCreation: '2024-01-10',
      dernierMessage: 'Votre problème a été résolu'
    },
    {
      id: '3',
      titre: 'Erreur technique',
      description: 'L\'application ne fonctionne pas correctement',
      statut: 'ouvert',
      dateCreation: '2024-01-20',
      dernierMessage: 'En attente de réponse...'
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Nouveau message:', { titre, description });
    // Reset form
    setTitre('');
    setDescription('');
    setOngletActif('conversations');
  };

  const ouvrirConversation = (conversation: Message) => {
    setConversationSelectionnee(conversation);
    // Initialize chat messages with the conversation description
    setMessagesChat([
      {
        id: '1',
        texte: conversation.description,
        expediteur: 'utilisateur',
        horodatage: conversation.dateCreation
      },
      {
        id: '2',
        texte: conversation.dernierMessage,
        expediteur: 'support',
        horodatage: new Date().toISOString()
      }
    ]);
  };

  const envoyerMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (nouveauMessage.trim()) {
      const message: MessageChat = {
        id: Date.now().toString(),
        texte: nouveauMessage,
        expediteur: 'utilisateur',
        horodatage: new Date().toISOString()
      };
      setMessagesChat(prev => [...prev, message]);
      setNouveauMessage('');
      
      // Simulate support response after 2 seconds
      setTimeout(() => {
        const messageSupport: MessageChat = {
          id: (Date.now() + 1).toString(),
          texte: 'Merci pour votre message. Notre équipe va vous répondre dans les plus brefs délais.',
          expediteur: 'support',
          horodatage: new Date().toISOString()
        };
        setMessagesChat(prev => [...prev, messageSupport]);
      }, 2000);
    }
  };

  const marquerCommeResolu = () => {
    if (conversationSelectionnee) {
      // Update the conversations array
      setConversations(prevConversations => 
        prevConversations.map(conv => 
          conv.id === conversationSelectionnee.id 
            ? { ...conv, statut: 'ferme', dernierMessage: 'Problème résolu par l\'utilisateur' }
            : conv
        )
      );
      
      // Update the selected conversation
      setConversationSelectionnee({
        ...conversationSelectionnee,
        statut: 'ferme',
        dernierMessage: 'Problème résolu par l\'utilisateur'
      });
    }
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'ouvert': return 'bg-green-100 text-green-800';
      case 'ferme': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (statut: string) => {
    switch (statut) {
      case 'ouvert': return 'Ouvert';
      case 'ferme': return 'Fermé';
      default: return 'Inconnu';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-1">Assistance</h2>
        <p className="text-xs md:text-sm text-gray-600">Centre d'aide et support utilisateur</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setOngletActif('nouveau')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              ongletActif === 'nouveau'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Nouvelle demande
          </button>
          <button
            onClick={() => setOngletActif('conversations')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              ongletActif === 'conversations'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Mes conversations ({conversations.length})
          </button>
        </nav>
      </div>

      {/* New Message Form */}
      {ongletActif === 'nouveau' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Nouvelle demande d'assistance</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Titre du problème *
              </label>
              <input
                type="text"
                id="title"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Décrivez brièvement votre problème"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description détaillée *
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Décrivez votre problème en détail..."
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Envoyer la demande
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Conversations List */}
      {ongletActif === 'conversations' && (
        <div className="space-y-4">
          {conversations.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Aucune conversation trouvée</p>
            </div>
          ) : (
            conversations.map((conversation) => (
              <div
                key={conversation.id}
                className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => ouvrirConversation(conversation)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{conversation.titre}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(conversation.statut)}`}>
                    {getStatusText(conversation.statut)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{conversation.description}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Créé le {new Date(conversation.dateCreation).toLocaleDateString('fr-FR')}</span>
                  <span className="text-blue-600 hover:text-blue-800">Voir la conversation →</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Conversation Detail Modal */}
      {conversationSelectionnee && (
        <div className="fixed inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{conversationSelectionnee.titre}</h3>
                  <span className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(conversationSelectionnee.statut)}`}>
                    {getStatusText(conversationSelectionnee.statut)}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  {conversationSelectionnee.statut === 'ouvert' && (
                    <button
                      onClick={marquerCommeResolu}
                      className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      Marquer comme résolu
                    </button>
                  )}
                  <button
                    onClick={() => setConversationSelectionnee(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messagesChat.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.expediteur === 'utilisateur' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.expediteur === 'utilisateur'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.texte}</p>
                    <p className={`text-xs mt-1 ${
                      message.expediteur === 'utilisateur' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {new Date(message.horodatage).toLocaleString('fr-FR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-6 border-t border-gray-200">
              <form onSubmit={envoyerMessage} className="flex space-x-4">
                <input
                  type="text"
                  value={nouveauMessage}
                  onChange={(e) => setNouveauMessage(e.target.value)}
                  placeholder="Tapez votre message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!nouveauMessage.trim()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Envoyer
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}