import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({})

    useEffect(() => {
      fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_XFsZhscasv0E5fh9X8BHkiuyKtx89rj4bOPGL8Fm&currencies=&base_currency=${currency}`)
      .then((response) => response.json())
      .then((currData) => setData(currData.data))
    }, [currency])

    console.log(data);
    return data
    
}

export default useCurrencyInfo