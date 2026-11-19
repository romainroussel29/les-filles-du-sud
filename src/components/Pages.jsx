import Photo from './Photo';
import { Embleme } from './Logo';

export function Histoire() {
  const etapes = [
    { annee: '2019', texte: 'Camille et Léa cousent leurs premières robes dans l’appartement familial d’Endoume, avec des coupons de lin chinés au marché.' },
    { annee: '2020', texte: 'Premier stand au marché de la Plaine, à Marseille. Les vingt robes partent en une matinée.' },
    { annee: '2022', texte: 'Ouverture de l’atelier à Marseille et lancement de la boutique en ligne. Les paniers en raphia rejoignent la collection.' },
    { annee: '2024', texte: 'Arrivée des maillots de bain, en polyamide recyclé. L’équipe compte désormais huit personnes, toutes avec la même vibe.' },
  ];

  return (
    <article className="page">
      <header className="bandeau">
        <Photo cle="histoire" alt="Deux sœurs dans leur atelier lumineux, entourées de rouleaux de lin" className="bandeau-photo" prioritaire />
        <div className="bandeau-voile" aria-hidden="true" />
        <div className="bandeau-texte">
          <h1>Notre histoire</h1>
          <p>Deux sœurs, une machine à coudre et beaucoup de soleil.</p>
        </div>
      </header>

      <div className="page-corps">
        <section className="recit apparition">
          <Embleme className="recit-embleme" />
          <p className="recit-chapeau">
            Vibe du Sud est né à Marseille, entre le Vieux-Port et les calanques, là où Camille et Léa
            ont grandi.
          </p>
          <p>
            Enfants, elles passaient leurs étés entre les criques de Sormiou et la maison de leur grand-mère,
            couturière à Cassis, qui leur a appris à reconnaître un beau lin au toucher. Adultes, elles
            cherchaient des
            vêtements simples, légers et colorés, qu’on peut porter du marché du matin au dîner en terrasse,
            sans les trouver.
          </p>
          <p>
            Alors elles les ont dessinés. Aujourd’hui, chaque pièce est imaginée dans notre atelier
            marseillais, confectionnée en petites séries par des ateliers partenaires au Portugal et en
            Italie, et les paniers sont tressés à la main au Maroc.
          </p>
        </section>

        <section className="chronologie" aria-labelledby="titre-chrono">
          <h2 id="titre-chrono" className="titre-section">Quelques dates</h2>
          <ol>
            {etapes.map((e) => (
              <li key={e.annee} className="apparition">
                <span className="chrono-annee">{e.annee}</span>
                <p>{e.texte}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="engagements" aria-labelledby="titre-engagements">
          <h2 id="titre-engagements" className="titre-section">Ce à quoi nous tenons</h2>
          <div className="engagements-grille apparition">
            <div>
              <h3>Des matières naturelles</h3>
              <p>Lin européen, coton biologique, viscose certifiée et raphia naturel pour la grande majorité de la collection.</p>
            </div>
            <div>
              <h3>De petites séries</h3>
              <p>Nous produisons peu et réassortissons ce qui plaît, pour éviter les invendus.</p>
            </div>
            <div>
              <h3>Des tailles pour toutes</h3>
              <p>Chaque modèle est essayé du XS au XL par des femmes de notre entourage avant d’être produit.</p>
            </div>
          </div>
        </section>

        <div className="page-action">
          <a href="#boutique" className="bouton bouton-noir">Découvrir la collection</a>
        </div>
      </div>
    </article>
  );
}

export function MentionsLegales() {
  return (
    <article className="page page-texte">
      <div className="page-corps juridique">
        <h1 className="titre-section">Mentions légales</h1>
        <p className="maj">Dernière mise à jour : 17 novembre 2026</p>

        <h2>Éditeur du site</h2>
        <p>
          Le site <strong>vibe-du-sud.fr</strong> est édité par la société <strong>Vibe du Sud</strong>, société par actions
          simplifiée (SAS) au capital de 10 000 €.
        </p>
        <ul>
          <li>Siège social : 14 chemin des Cigales, 13007 Marseille, France</li>
          <li>RCS Marseille : XXX XXX XXX</li>
          <li>Numéro de TVA intracommunautaire : FR XX XXX XXX XXX</li>
          <li>Téléphone : 04 XX XX XX XX (du lundi au vendredi, de 9 h à 17 h)</li>
          <li>E-mail : contact@vibe-du-sud.fr</li>
          <li>Directrice de la publication : Camille Roux, présidente</li>
        </ul>

        <h2>Hébergement</h2>
        <p>
          Le site est hébergé par Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, États-Unis.
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          L’ensemble des contenus du site (textes, photographies, logo, noms de produits, éléments graphiques)
          est la propriété exclusive de Vibe du Sud. Toute reproduction, représentation ou diffusion,
          totale ou partielle, sans autorisation écrite préalable est interdite.
        </p>

        <h2>Données personnelles</h2>
        <p>
          Les données collectées sur le site (nom, adresse, e-mail, historique de commandes) sont traitées par
          Vibe du Sud pour la gestion des commandes, la relation client et, avec votre accord, l’envoi
          de notre lettre d’information. Elles sont conservées pendant la durée de la relation commerciale,
          puis trois ans à des fins de prospection, et ne sont jamais revendues.
        </p>
        <p>
          Conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et
          Libertés, vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation,
          d’opposition et de portabilité de vos données. Pour l’exercer, écrivez à
          contact@vibe-du-sud.fr ou à l’adresse du siège social. Vous pouvez également introduire une
          réclamation auprès de la CNIL (www.cnil.fr).
        </p>

        <h2>Cookies</h2>
        <p>
          Le site utilise uniquement le stockage local de votre navigateur pour mémoriser le contenu de votre
          panier. Aucun cookie publicitaire ni de mesure d’audience n’est déposé sans votre consentement.
        </p>

        <h2>Médiation de la consommation</h2>
        <p>
          En cas de litige non résolu avec notre service client, vous pouvez recourir gratuitement au médiateur
          de la consommation dont nous relevons : [nom du médiateur à compléter]. Vous pouvez aussi utiliser la
          plateforme européenne de règlement en ligne des litiges : ec.europa.eu/consumers/odr.
        </p>

        <h2>Droit applicable</h2>
        <p>
          Les présentes mentions légales sont régies par le droit français. À défaut de résolution amiable,
          tout litige relève de la compétence des tribunaux de Marseille.
        </p>
      </div>
    </article>
  );
}
