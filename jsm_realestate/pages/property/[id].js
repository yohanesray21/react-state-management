import ImagesScrollBar from '@/components/ImagesScrollBar';
import { baseUrl, fetchApi } from '@/utils/fetch.api';
import { Box } from '@chakra-ui/react';

const PropertyDetails = ({
  propertiesDetails: {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  },
}) => {
  <Box maxWidth="1000px" margin="auto" p={4}>
    {photos && <ImagesScrollBar data={photos} />}
  </Box>;
};

export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

  return {
    props: {
      propertiesDetails: data,
    },
  };
}
