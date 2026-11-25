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
    catalog:  { title: 'Aucun produit en vente',         text: 'Les produits apparaîtront ici dès qu’une boutique en ajoute.', action: 'Vendre sur Marché Express' },
    cart:     { title: 'Votre panier est vide',          text: 'Ajoutez des produits pour passer commande.',                action: 'Voir les produits' },
    vendor:   { title: 'Aucun produit',                  text: 'Ajoutez votre premier produit pour le mettre en vente.',    action: 'Ajouter un produit' },
    missing:  { title: 'Produit introuvable',            text: 'Ce produit n’existe plus ou a été retiré.',                   action: 'Retour au catalogue' },
    noshop:   { title: 'Pas encore de boutique',        text: 'Faites votre demande de boutique pour mettre vos produits en vente.', action: 'Vendre sur Marché Express' },
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

  menu: {
    sell: 'Vendre sur Marché Express',
    pending: 'Ma demande de boutique (en attente)',
    fix: 'Ma demande de boutique (à corriger)',
    space: 'Espace vendeur',
    back: 'Retour à la boutique'
  },
  sell: {
    title: 'Vendre sur Marché Express',
    signupLink: 'Vous êtes commerçant ?',
    signupAction: 'Vendre sur Marché Express',
    signupOn: 'Après la création de votre compte, vous remplirez votre demande de boutique.',
    signupCancel: 'Annuler',
    signupLead: 'Vous êtes commerçant ?',
    intro: 'Remplissez votre demande en 3 étapes. L’administrateur l’examine, puis vous recevez un message avec sa décision.',
    stepOf: 'Étape {n} sur 3',
    steps: ['La boutique', 'Le contact et le lieu', 'Validation'],
    name: 'Nom de la boutique', namePh: 'Ex. Gloire Market',
    category: 'Catégorie principale', categoryPick: 'Choisissez une catégorie',
    description: 'Courte description', descriptionPh: 'Ce que vous vendez, ce qui vous distingue…', descriptionHint: 'Entre 10 et 500 caractères.',
    logo: 'Logo de la boutique (facultatif)', logoPick: 'Choisir une image', logoChange: 'Changer le logo', logoRemove: 'Retirer', logoBusy: 'Envoi du logo…',
    phone: 'Numéro de téléphone', phoneHint: 'Format international, par exemple +243812345678. Vos clients pourront vous appeler ou vous écrire sur WhatsApp.',
    district: 'Quartier ou commune', districtPh: 'Ex. Gombe',
    landmark: 'Point de repère (facultatif)', landmarkPh: 'Ex. En face de la station',
    zones: 'Zones desservies pour la livraison', zonesHint: 'Indiquez les quartiers ou communes où vous livrez et le prix de la livraison en FC (0 si gratuit).',
    zoneName: 'Zone', zoneFee: 'Frais (FC)', zoneAdd: 'Ajouter une zone', zoneRemove: 'Retirer',
    recap: 'Récapitulatif', terms: 'J’accepte les', termsLink: 'conditions vendeur',
    next: 'Suivant', back: 'Retour', send: 'Envoyer ma demande',
    draftKept: 'Votre brouillon est conservé si vous quittez cette page.',
    sent: 'Demande envoyée. Vous recevrez un message dès qu’elle aura été examinée.',
    errName: 'Indiquez le nom de la boutique (2 caractères au moins).',
    errCategory: 'Choisissez la catégorie principale.',
    errDescription: 'La description doit faire entre 10 et 500 caractères.',
    errDistrict: 'Indiquez votre quartier ou votre commune.',
    errZones: 'Indiquez au moins une zone de livraison avec son prix.',
    errZoneFee: 'Les frais de livraison doivent être un nombre, par exemple 2000.',
    errTerms: 'Vous devez accepter les conditions vendeur.',
    pendingTitle: 'Demande en cours d’examen',
    pendingText: 'L’administrateur examine votre demande. Vous recevrez un message dès qu’il aura décidé.',
    sentOn: 'Envoyée le',
    fixTitleRefused: 'Votre demande n’a pas été acceptée',
    fixTitleInfo: 'L’administrateur a besoin de précisions',
    fixText: 'Corrigez votre demande ci-dessous puis renvoyez-la.',
    reason: 'Motif'
  },
  shopPage: {
    title: 'Ma boutique',
    status: { en_attente: 'En attente', precisions: 'Précisions demandées', refusee: 'Refusée', approuvee: 'Approuvée', suspendue: 'Suspendue' },
    suspendedText: 'Vos produits ne sont plus visibles des clients. Vos commandes en cours restent visibles.',
    save: 'Enregistrer la boutique', saved: 'Boutique enregistrée.',
    history: 'Historique des décisions',
    phoneGateTitle: 'Ajoutez le numéro de votre boutique',
    phoneGateText: 'Ce numéro est obligatoire : sans lui, vous ne pouvez pas continuer à vendre. Format international, par exemple +243812345678.'
  },
  adm: {
    requests: 'Demandes de boutique',
    none: 'Aucune demande en attente.',
    shops: 'Boutiques',
    call: 'Appeler', whatsapp: 'WhatsApp',
    approve: 'Approuver', refuse: 'Refuser', ask: 'Demander des précisions',
    suspend: 'Suspendre', reactivate: 'Réactiver',
    reasonRefuse: 'Motif du refus (obligatoire)', reasonAsk: 'Votre question au vendeur (obligatoire)', reasonSuspend: 'Motif de la suspension (obligatoire)', reasonReactivate: 'Message au vendeur (facultatif)',
    confirm: 'Confirmer', cancel: 'Annuler',
    needReason: 'Un motif est obligatoire.',
    done: { approuver: 'Boutique approuvée. Le vendeur a reçu un message.', refuser: 'Demande refusée. Le vendeur a reçu un message.', precisions: 'Question envoyée au vendeur.', suspendre: 'Boutique suspendue. Le vendeur a reçu un message.', reactiver: 'Boutique réactivée. Le vendeur a reçu un message.' },
    journal: 'Journal des décisions', by: 'par', requestedOn: 'Demande du', vendor: 'Vendeur', noJournal: 'Aucune décision enregistrée.',
    actions: { soumise: 'Demande envoyée', approuvee: 'Approuvée', refusee: 'Refusée', precisions: 'Précisions demandées', suspendue: 'Suspendue', reactivee: 'Réactivée', migration: 'Boutique existante approuvée' }
  },
  profileSell: {
    title: 'Vendre sur Marché Express',
    none: 'Vous avez un commerce ? Ouvrez votre boutique et recevez des commandes.',
    pending: 'Votre demande de boutique est en cours d’examen.',
    fix: 'Votre demande de boutique demande une correction.',
    active: 'Votre boutique est active. Gérez vos produits et vos commandes dans l’espace vendeur.',
    suspended: 'Votre boutique est suspendue. Ouvrez l’espace vendeur pour voir le motif.'
  },
  ptr: { pull: 'Tirez pour actualiser', loading: 'Actualisation…' },
  top: 'Retour en haut',
  categories: { all: 'Tout', none: 'Non classé', label: 'Filtrer par catégorie' }
};
