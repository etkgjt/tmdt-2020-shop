import React from "react";
import { Helmet } from "react-helmet-async";
export const useHelmetMeta = (
  description,
  title,
  image = "https://www.hydrocarbons-technology.com/wp-content/uploads/sites/9/2020/09/shutterstock_1152185600-1440x1008-1-857x600.jpg"
) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="og:description" content={description} />
      <meta name="og:title" content={title} />
      <meta name="og:image" content={image} />
    </Helmet>
  );
};
