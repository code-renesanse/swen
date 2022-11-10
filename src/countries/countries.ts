
export const restcountries = {
  BASE_UTL: 'https://restcountries.com',
  async getAllCountryNames () {
    const url = `${this.BASE_UTL}/v3.1/all`;

    const req = await fetch(url);
    const data = await req.json();

    const nameList = data.map((country: { name: { common: string } }) => country.name.common);

    return nameList;
  },
  /**
     * @param {string} countryCode - country code
     * @returns string common name of the country
     */
  async getCountryName (countryCode: string) {
    const url = `${this.BASE_UTL}/v3.1/alpha/${countryCode}`;

    const req = await fetch(url);
    const data = await req.json();

    return data[0].name.common;
  },
  async getCountry (countryName: string) {
    const name = countryName.replace(' ', '%20');
    const url = `${this.BASE_UTL}/v3.1/name/${name}`;

    const req = await fetch(url);
    const data = await req.json();

    return data[0];
  },
  // getCountryCodeFromCountryName: async (name) => {
  //     return await getCountryFromCountryName(name)
  // },
  async isValidCountry (countryName: string) {
    const all = await this.getAllCountryNames();
    return all.includes(countryName);
  }
};
