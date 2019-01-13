// Copyright (c) 2019 Dominic Masters
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import { URL } from 'url';

const SHOPFIY_SUFFIX = '.myshopify.com'

export const generateShopUrl = (shop:string, url:string = '/'):string => {
  if(!shop.startsWith('http')) shop = `https://${shop}`;
  if(!shop.endsWith(SHOPFIY_SUFFIX)) shop += SHOPFIY_SUFFIX;
  if(!url.startsWith('/')) url = `/${url}`;

  return `${shop}${url}`;
}


export const isValidShopName = (shop:string):boolean => {
  let shopUrl = shop;
  shopUrl = `https://${shopUrl}`;//Prepend protocol

  let u;
  try { u = new URL(shopUrl); } catch(e) { return false; } //Parse URL Attempt.

  let { hostname } = u;
  return (
    hostname === shop && //Make sure the url parse didn't affect what they're testing
    /^[a-z][-a-z0-9\._]*$/.test(hostname) && //Test for A-z, 0-9, . and _ only
    hostname.endsWith(SHOPFIY_SUFFIX) && //ends with .myshopify.com
    hostname.split('.').length === 3 //Make sure there aren't extra dots (only shop.myshopify.com)
  );
};


export const generateInstallUrl = (shop:string, clientId:string, scopes:string[], redirectUri:string, state:string) =>  {
  let url = generateShopUrl(shop, '/admin/oauth/authorize');
  let o = {
    client_id: clientId,
    scope: scopes.join(','),
    redirect_uri: redirectUri,
    state
  };
  url += '?';
  let keys = Object.keys(o);
  for(let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let keyEscaped = encodeURIComponent(key);
    let valueEscaped = encodeURIComponent(o[key]);
    if(i != 0) url += '&';
    url += `${keyEscaped}=${valueEscaped}`;
  }
  return url;
};


export const encode = (data:string) => {
  //Shopify doesn't use the standard encodeUriComponent style for escaping for some reason.
  return data.replace(/\%/g, "%25").replace(/\&/g, "%26");
}


export const encodeObject = (o:object):string => {
  let keys = Object.keys(o);
  let qs = '';
  for(let i = 0; i < keys.length; i++) {
    let key = encode(keys[i]);
    let val = encode(o[keys[i]]);
    qs += `${key}=${val}`;
    if(i < keys.length-1) qs += '&';
  }
  return qs;
};
