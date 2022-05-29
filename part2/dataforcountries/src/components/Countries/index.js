import Country from "../Country";
import CountryHidden from "../CountryHidden";

const Countries = ({countries}) =>  {
    return (
        countries.length === 0
        ? <></>
        : countries.length > 10
        ? <div>Too many matches, specify another filter</div>
        : countries.length > 1
        ? <div>
            {countries.map(country => <CountryHidden key={country.name.common} country={country} />)}
        </div>
        : <Country country={countries[0]} />
    )
}

export default Countries;
