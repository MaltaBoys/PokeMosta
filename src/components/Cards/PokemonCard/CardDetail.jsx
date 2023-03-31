import React from "react";

const CardDetail = (props) => {
  const searchParams = new URLSearchParams(props.location.search);
  const id = searchParams.get("id");

  return <div>CardDetail {id}</div>;
};

export default CardDetail;
