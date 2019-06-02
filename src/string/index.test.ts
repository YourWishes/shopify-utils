import {
  handlize
} from './../';

describe('handlize', () => {
  it('should return a handle', () => {
    expect(handlize('Hello World')).toStrictEqual('hello-world');
    expect(handlize('How are you today?')).toStrictEqual('how-are-you-today');
    expect(handlize('!! NoDashesPlease !!')).toStrictEqual('nodashesplease');
  });

  it('should throw an error when passing something thats not a string', () => {
    expect(() => handlize(null)).toThrow();
  });

  it('should throw an error when passing a string with no length', () => {
    expect(() => handlize('')).toThrow();
    expect(() => handlize('   ')).toThrow();
    expect(() => handlize(' \n ')).toThrow();
    expect(() => handlize('!!')).toThrow();
  });
});
