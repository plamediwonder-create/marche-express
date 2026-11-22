/* Marché Express : tous les textes de l'application (français uniquement).
   L'application n'a pas de traducteur : ce fichier est le seul endroit où modifier les phrases
   de la présentation, des écrans vides, des notifications et du suivi de commande. */
window.COPY = {
  onboarding: {
    skip: 'Passer',
    next: 'Suivant',
    start: 'Commencer',
    replay: 'Revoir la présentation',
    slides: [
      { art: 'browse', title: 'Choisissez vos produits', text: 'Parcourez les boutiques et le catalogue.' },
      { art: 'order',  title: 'Passez commande',        text: 'Indiquez votre adresse, la boutique prépare votre commande.' },
      { art: 'track',  title: 'Suivez votre colis',     text: 'Recevez un message à chaque étape jusqu’à la livraison.' }
    ]
  },
  empty: {
    orders:   { title: 'Aucune commande pour le moment', text: 'Vos commandes apparaîtront ici dès que vous aurez commandé.', action: 'Découvrir les boutiques' },
    messages: { title: 'Aucun message',                  text: 'Vos messages de livraison apparaîtront ici',                action: 'Découvrir les boutiques' },
    search:   { title: 'Aucun résultat',                 text: 'Essayez un autre mot ou retirez les filtres',               action: 'Retirer les filtres' },
    shop:     { title: 'Aucun produit pour le moment',   text: 'Cette boutique n’a pas encore mis de produit en vente.',    action: 'Retour au catalogue' },
    list:     { title: 'Aucun produit ici',             text: 'Aucun produit dans cette sélection pour le moment.',       action: 'Retour au catalogue' },
    catalog:  { title: 'Aucun produit en vente',         text: 'Les produits apparaîtront ici dès qu’une boutique en ajoute.', action: 'Passer en mode Vendeur' },
    cart:     { title: 'Votre panier est vide',          text: 'Ajoutez des produits pour passer commande.',                action: 'Voir les produits' },
    vendor:   { title: 'Aucun produit',                  text: 'Ajoutez votre premier produit pour le mettre en vente.',    action: 'Ajouter un produit' },
    missing:  { title: 'Produit introuvable',            text: 'Ce produit n’existe plus ou a été retiré.',                   action: 'Retour au catalogue' },
    noshop:   { title: 'Pas encore de boutique',        text: 'Créez votre boutique pour mettre vos produits en vente.',     action: 'Créer ma boutique' },
    vorders:  { title: 'Aucune commande reçue',          text: 'Elles apparaîtront ici dès qu’un client achète un de vos produits.' }
  },
  toast: {
    updated: 'Mis à jour',
    updateFailed: 'Connexion perdue, réessayez',
    back: 'Connexion rétablie.',
    shellUpdated: 'Mise à jour installée : elle sera active à la prochaine ouverture.',
    orderSent: 'Commande envoyée à la boutique.',
    ordersSent: ' commandes envoyées aux boutiques.',
    cancelled: 'Commande annulée.',
    profileSaved: 'Profil enregistré.',
    reportSent: 'Signalement envoyé à l’administrateur.'
  },
  timeline: {
    steps: ['Reçue', 'En préparation', 'En livraison', 'Livrée'],
    cancelled: 'Annulée',
    label: 'Suivi de la commande'
  },
  buybar: { price: 'Prix', total: 'Total', order: 'Commander', soldout: 'Épuisé', cart: 'Voir mon panier', add: 'Ajouter au panier' },
  ptr: { pull: 'Tirez pour actualiser', loading: 'Actualisation…' },
  top: 'Retour en haut',
  categories: { all: 'Tout', none: 'Non classé', label: 'Filtrer par catégorie' }
};
