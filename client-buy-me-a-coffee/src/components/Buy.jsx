import { ethers } from "ethers";
import "./Buy.css";

const Buy = ({ state }) => {
  const buyCoffee = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const feedback = document.querySelector("#feedback").value;
    const donationAmount = document.querySelector("#donationAmount").value;

    const amount = { value: ethers.utils.parseEther(donationAmount) };
    const transaction = await contract.funding(name, feedback, amount);
    await transaction.wait();

    alert("Transaction is successful!!!");

    window.location.reload();
  };

  return (
    <>
      <div className="center">
        <h1>Feedback Please!</h1>
        <form onSubmit={buyCoffee}>
          <div className="inputbox">
            <input type="text" required="required" id="name"></input>
            <span>Name</span>
          </div>
          <div className="inputbox">
            <input type="text" required="required" id="feedback"></input>
            <span>Feedback</span>
          </div>
          <div className="inputbox">
            <input type="text" required="required" id="donationAmount"></input>
            <span>Amount to be Donated</span>
          </div>
          <div className="inputbox">
            <input type="submit" value="Donate" disabled={!state.contract} />
          </div>
        </form>
      </div>
    </>
  );
};

export default Buy;
