import "../styles/components/DisplayPages.css";
import { useState, useEffect } from "react";
import axios from "axios";

function DisplayPages() {
  const [contentArray, setContentArray] = useState<any>(null);
  const [actualPage, setActualPage] = useState(0);

  useEffect(() => {
    getContentArray();
  }, []);

  const getContentArray = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:8080",
      headers: {},
    };
    axios
      .request(config)
      .then((response: { data: any }) => {
        setContentArray(response.data);
        console.log(JSON.stringify(response.data));
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const pageChanger = (increment: number) => {
    if (actualPage + increment < 0) {
      return;
    }
    if (actualPage + increment >= contentArray.length) {
      return;
    }
    setActualPage((prevPage) => prevPage + increment);
  };

  const isContentUrl = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch (error) {
      return false;
    }
  };

  const getContentPage = () => {
    if (contentArray === null) {
      return null;
    }
    if (actualPage >= contentArray.length) {
      return null;
    }
    if (actualPage < 0) {
      return null;
    }

    const content = contentArray[actualPage].content;
    if (isContentUrl(content)) {
      return <img src={content} alt={content} />;
    } else {
      return content;
    }
  };

  return (
    <div>
      <div className="change-pages">
        <div className="change-button" onClick={() => pageChanger(-1)}>
          &lt;
        </div>
        <div className="page-number">{actualPage}</div>
        <div className="change-button" onClick={() => pageChanger(1)}>
          &gt;
        </div>
      </div>
      <div className="display-content">{getContentPage()}</div>
    </div>
  );
}

export default DisplayPages;
