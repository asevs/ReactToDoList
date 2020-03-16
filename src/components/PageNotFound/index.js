import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const PageNotFound = ({ location }) => {
  const [counter, setCounter] = useState(10);
  const countdown = () => setCounter(counter - 1);

  useEffect(() => {
    const id = setTimeout(countdown, 1000);
    return () => clearTimeout(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  return (
    <div>
      <p>
        No match for <code>{location.pathname}</code>
      </p>
      <p>Redirect to homepage in {counter} seconds.</p>
      {counter === 0 && <Redirect to="/" />}
    </div>
  );
};
export default PageNotFound;
