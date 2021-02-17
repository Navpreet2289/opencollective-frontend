import React from 'react';
import { useQuery } from '@apollo/client';
import { useIntl } from 'react-intl';

import { API_V2_CONTEXT, gqlV2 } from '../lib/graphql/helpers';

const braintreeTokenQuery = gqlV2/** GraphQL */ `
  query BraintreeTokenQuery {
    token: paymentProviderClientToken(provider: "BRAINTREE")
  }
`;

const setupBraintree = (token, locale) => {
  braintree.dropin.create(
    {
      authorization: token,
      container: '#dropin-container',
      card: false,
      locale,
      venmo: true,
      googlePay: {
        transactionInfo: {
          currencyCode: 'USD',
          totalPriceStatus: 'FINAL',
          totalPrice: 100,
          checkoutOption: 'COMPLETE_IMMEDIATE_PURCHASE',
        },
      },
      paypal: {
        flow: 'vault',
        commit: true,
        buttonStyle: {
          color: 'blue',
          tagline: false,
          label: 'pay',
          size: 'large',
        },
      },
    },
    console.log,
  );
};

const BraintreePage = props => {
  const { data } = useQuery(braintreeTokenQuery, { context: API_V2_CONTEXT });
  const intl = useIntl();

  React.useEffect(() => {
    if (data?.token) {
      setupBraintree(data.token, intl.locale);
    }
  }, [data?.token]);

  return (
    <div>
      Hello World
      <div id="dropin-container"></div>
    </div>
  );
};

BraintreePage.propTypes = {};

export default BraintreePage;
