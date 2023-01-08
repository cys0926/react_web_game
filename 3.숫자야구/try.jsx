import React, { memo, useState } from "react";

const Try = memo(({ tryInfo }) => {
  const [result, setResult] = useState(tryInfo.result);

  const onClick = () => {
    setResult("1");
  };

  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
});
Try.displayName = "Try";

export default Try;
