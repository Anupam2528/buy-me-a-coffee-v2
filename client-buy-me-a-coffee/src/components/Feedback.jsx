import { useEffect, useState } from "react";
import "./Feedback.css";

const Feedback = ({ state }) => {
  const [feedbacks, setFeedBack] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const feedbackMessage = async () => {
      const feedbacks = await contract.getFeedbacks();
      setFeedBack(feedbacks);
    };
    contract && feedbackMessage();
  }, [contract]);

  return (
    <>
      <div className="container-fluid">
        <h3 style={{ textAlign: "center", marginTop: "20px" }}>Feedbacks</h3>
        <table>
          <tbody>
            {feedbacks.map((feedback) => {
              return (
                <tr>
                  <td
                    style={{
                      backgroundColor: "dodgerblue",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "100px",
                      color: "white",
                    }}
                  >
                    {feedback.name}
                  </td>
                  <td
                    style={{
                      backgroundColor: "dodgerblue",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "800px",
                      color: "white",
                    }}
                  >
                    {new Date(feedback.timestamp * 1000).toLocaleString()}
                  </td>
                  <td
                    style={{
                      backgroundColor: "dodgerblue",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "300px",
                      color: "white",
                    }}
                  >
                    {feedback.feedBack}
                  </td>
                  <td
                    className="container-fluid"
                    style={{
                      backgroundColor: "dodgerblue",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "400px",
                      color: "white",
                    }}
                  >
                    {feedback.from}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Feedback;
