import {
  generateShopUrl, encode, generateInstallUrl, encodeObject, isValidShopName
} from './index';

describe('generateShopUrl', () => {
  it('should return the correct url', () => {
    expect(generateShopUrl('myshop')).toEqual('https://myshop.myshopify.com/');
    expect(generateShopUrl('othershop')).toEqual('https://othershop.myshopify.com/');
    expect(generateShopUrl('othershop', '/')).toEqual('https://othershop.myshopify.com/');
    expect(generateShopUrl('othershop', '/test')).toEqual('https://othershop.myshopify.com/test');
    expect(generateShopUrl('http://othershop', '/test')).toEqual('http://othershop.myshopify.com/test');
  });
});

describe('isValidShopName', () => {
  it('should return true for real shop urls', () => {
    expect(isValidShopName('myshop.myshopify.com')).toEqual(true);
    expect(isValidShopName('my-book-store.myshopify.com')).toEqual(true);
    expect(isValidShopName('a.myshopify.com')).toEqual(true);
  });

  it('should return false for bad urls', () => {
    expect(isValidShopName('myshop')).toEqual(false);
    expect(isValidShopName('myshop.myshopify')).toEqual(false);
    expect(isValidShopName('https://myshop.myshopify.com')).toEqual(false);
    expect(isValidShopName('my%20shop.myshopify.com')).toEqual(false);
    expect(isValidShopName('.myshopify.com')).toEqual(false);
    expect(isValidShopName('myshopify.com')).toEqual(false);
    expect(isValidShopName('store.com')).toEqual(false);
    expect(isValidShopName('test.store.with.dots.myshopify.com')).toEqual(false);
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
