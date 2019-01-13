import { generateShopUrl, encode, generateInstallUrl, encodeObject } from './index';

describe('generateShopUrl', () => {
  it('should return the correct url', () => {
    expect(generateShopUrl('myshop')).toEqual('https://myshop.myshopify.com/');
    expect(generateShopUrl('othershop')).toEqual('https://othershop.myshopify.com/');
    expect(generateShopUrl('othershop', '/')).toEqual('https://othershop.myshopify.com/');
    expect(generateShopUrl('othershop', '/test')).toEqual('https://othershop.myshopify.com/test');
    expect(generateShopUrl('http://othershop', '/test')).toEqual('http://othershop.myshopify.com/test');
  });
});


describe('encode', () => {
  it('should encode a string as expected', () => {
    expect(encode('test')).toStrictEqual('test');
    expect(encode('The cost of that is 20% off')).toStrictEqual('The cost of that is 20%25 off');
    expect(encode('if 1 + 2 = 3 then do it')).toStrictEqual('if 1 + 2 = 3 then do it');

    expect(encode('It is == to true')).toStrictEqual('It is == to true');
  });
});

describe('encodeObject', () => {
  it('should encode all the parts of an object', () => {
    expect(encodeObject({ hello: 'world' })).toEqual('hello=world');
    expect(encodeObject({ sale: '20%', formula: '1+2=3' })).toEqual('sale=20%25&formula=1+2=3');
  });
});

describe('generateInstallUrl', () => {
  it('should return an install url', () => {
    expect(
      generateInstallUrl('myshop', '1235467890', ['read_themes', 'read_orders'], '/test', 'myState')
    ).toStrictEqual(
      `https://myshop.myshopify.com/admin/oauth/authorize?client_id=1235467890&scope=read_themes%2Cread_orders&redirect_uri=%2Ftest&state=myState`
    );
  });
});
