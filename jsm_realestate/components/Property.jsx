import Link from "next/link";
import React from "react";

export const Property = ({
  property: {
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    externalId,
  },
}) => {
  return (
    <Link href={`property/${externalId}`} passHref>
      {title}
    </Link>
  );
};
