import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// HoC
import withHeader from "../../hoc/withHeader";

// Functions imported
import {
  getGifsByOwner,
  getGifsByTag,
  getGifsByTitle,
} from "../../services/gifApi";

// CSS
import "./style.css";

function Search() {
  const history = useHistory();
  const params = new URLSearchParams(history.location.search);
  const query = params.get("query");

  const [gifsByTitle, setGifsByTitle] = useState({
    data: [],
    loaded: false,
  });
  const [gifsByUsername, setGifsByUsername] = useState({
    data: [],
    loaded: false,
  });
  const [gifsByTag, setGifsByTag] = useState({
    data: [],
    loaded: false,
  });

  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    setSearching(true);

    getGifsByTitle(query)
      .then((resp) => {
        setGifsByTitle({ data: resp.data.result, loaded: true });
      })
      .catch((error) => {
        setGifsByTitle({ data: [], loaded: true });
        alert(error);
      });

    getGifsByOwner(query)
      .then((resp) => {
        setGifsByUsername({ data: resp.data.result, loaded: true });
      })
      .catch((error) => {
        setGifsByUsername({ data: [], loaded: true });
        alert(error);
      });

    getGifsByTag(query)
      .then((resp) => {
        setGifsByTag({ data: resp.data.result, loaded: true });
      })
      .catch((error) => {
        setGifsByTag({ data: [], loaded: true });
        alert(error);
      });
  }, [query]);

  useEffect(() => {
    if (gifsByTitle.loaded & gifsByUsername.loaded & gifsByTag.loaded) {
      let tempResults = [];
      tempResults = [...tempResults, ...gifsByTitle.data];
      tempResults = [...tempResults, ...gifsByUsername.data];
      tempResults = [...tempResults, ...gifsByTag.data];

      var resultFiltered = tempResults.reduce((unique, o) => {
        if (!unique.some((obj) => obj._id === o._id)) {
          unique.push(o);
        }
        return unique;
      }, []);

      setResults(resultFiltered);
      setSearching(false);
    }
  }, [gifsByTitle, gifsByUsername, gifsByTag]);

  return (
    <main>
      <div className="title-wrapper">
        <h1 className="title-search">{query}</h1>
        {!searching && <div>{results.length} results</div>}
      </div>
      {searching ? (
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        [
          results.length === 0 ? (
            <div>No GIFs found for {query}</div>
          ) : (
            results.map((result, index) => (
              <div key={index}>{result.title}</div>
            ))
          ),
        ]
      )}
    </main>
  );
}

export default withHeader(Search);
