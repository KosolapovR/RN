import {configureEndpoints} from 'shared';

export default configureEndpoints({
  hostBuffer: 'http://proxy.ton.services/service-buffer',
  hostChat: 'http://proxy.ton.services/service-chat',
  hostCrypto: 'http://proxy.ton.services/service-payment/proxy',
  hostDeals: 'http://proxy.ton.services/service-deals',
  hostForum: 'http://proxy.ton.services/service-forum',
  hostMarket: 'http://proxy.ton.services/service-market',
  hostPayment: 'http://proxy.ton.services/service-payment',
  hostSocketChat: 'ws://proxy.ton.services/service-chat',
  hostSocketUsers: 'ws://proxy.ton.services/service-users',
  hostStats: 'http://proxy.ton.services/service-stat',
  hostTranslations: 'http://proxy.ton.services/service-translate',
  hostUsers: 'http://proxy.ton.services/service-users',
  hostBuckets: 'http://proxy.ton.services/service-buckets',
});
