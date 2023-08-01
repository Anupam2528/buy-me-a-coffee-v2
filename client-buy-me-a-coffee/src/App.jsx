import { useState, useEffect } from "react";
import "./App.css";
import { ethers } from "ethers";
import buyMeACoffeeabi from "./contractJson/BuyMeACoffee.json";
import Feedback from "./components/Feedback";
import Buy from "./components/Buy";
import coffee from "./coffee.png";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("Wallet not conencted!! ");

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0x3b9EA12087dEf68B41e7610dF3dfEf1f63998358";
      const contractABI = buyMeACoffeeabi.abi;
      try {
        const { ethereum } = window;
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        setAccount(account);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        console.log(contract);
        setState({ provider, signer, contract });
      } catch (error) {
        alert("Please install Metamask wallet to continue...");
      }
    };

    template();
  }, []);

  return (
    <div>
      <img src={coffee} alt=".." width="100%" />

      <p style={{ marginTop: "10px", marginLeft: "5px" }}>
        <small>Connected Account - {account}</small>
      </p>

      <Buy state={state}></Buy>
      <Feedback state={state}></Feedback>
    </div>
  );
}

export default App;
