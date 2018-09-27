import React from 'react';
import Popup from 'reactjs-popup';
import ExternalLink from '../external-link';
import './product-info.css';

const ProductInfo = () => (
  <Popup
    trigger={<button type="button" className="trigger">Product additional info</button>}
    modal
    closeOnDocumentClick
  >
    <div>
      Product additional info:
      <ul>
        <li>
          The product is free of charge.
        </li>
        <li>
          Was developed in free time.
          <b> Not ideal.</b>
        </li>
        <li>
          If the product does not meet your desires completely -
          <b> just live with it </b>
          or you can try to submit a bug or proposal as an issue
          <ExternalLink
            title="here"
            href="https://github.com/apunko/price-list-diff-manager/issues"
          />
        </li>
        <li>
          More information and code you can find on
          <ExternalLink
            title="github"
            href="https://github.com/apunko/price-list-diff-manager"
          />
        </li>
        <li>
          Elite testing was perfomed by
          <ExternalLink
            title="Danila Melentsevich"
            href="https://github.com/dMelentsevich"
          />
        </li>
        <li>
          The product was developed by
          <ExternalLink
            title="Anton Punko"
            href="https://github.com/apunko"
          />
        </li>
        <li>
          To say thanks - buy pizza for the team.
        </li>
      </ul>
    </div>
  </Popup>
);

export default ProductInfo;
