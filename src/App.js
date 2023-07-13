import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState();
  const [submittedMoney, setSubmittedMoney] = useState('');
  const [coinMoney, setCoinMoney] = useState();
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers").then(response => response.json()).then(json => { setCoins(json); setLoading(false); });
  }, [])

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(money);
    setSubmittedMoney(money);
    setMoney("");
  }
  const onChange = (event) => {
    setMoney(event.target.value)
    setCoinMoney(coins[0].quotes.USD.price);
  }
  const onChangeSelect = (event) => {
    const priceIndex = event.target.selectedIndex
    setCoinMoney(coins[priceIndex].quotes.USD.price);
    setSelected(true);

  }
  return (
    <div>
      <h1>The Coins! {loading ? "" : coins.length} </h1>
      <form onSubmit={onSubmit}>
        <input value={money} onChange={onChange} type="text" placeholder="How much do you have" />
        <button type="submit">Submit</button>
      </form>
      {submittedMoney ? <h2>You have {submittedMoney} USD</h2> : null}
      {loading ? <strong>Loading...</strong> : <select onChange={onChangeSelect}>
        {coins.map((coin) => <option>{coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD</option>)}
      </select>}

      {submittedMoney ? <h2>You can get {Math.floor(submittedMoney / coinMoney)}</h2> : null}

    </div>
  )
}

export default App