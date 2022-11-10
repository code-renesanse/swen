import { restcountries } from './countries';

describe('Countries', () => {
  it('Requests API', async () => {
    const data = restcountries.BASE_UTL;
    expect(data).toContain('restcountries');
  });
});
