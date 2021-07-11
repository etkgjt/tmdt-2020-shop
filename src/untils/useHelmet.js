import React from "react";
import { Helmet } from "react-helmet-async";
export const useHelmetMeta = (title) => {
  return (
    <Helmet>
      <title>{title}</title>
      {/* <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={image} />
      <meta property="fb:app_id" content="185042066921121" /> */}
    </Helmet>
  );
};
