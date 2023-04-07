import { Box, Button, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

import { baseUrl, fetchApi } from '@/utils/fetch.api';
import { Property } from '@/components/Property';

const Banner = ({
  imageUrl,
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  linkName,
  buttonText,
}) => {
  return (
    <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m={10}>
      <Image alt="banner" src={imageUrl} width={500} height={300} />
      <Box p="5">
        <Text color="gray.500" fontSize="sm" fontWeight="medium">
          {purpose}
        </Text>
        <Text fontSize="3xl" fontWeight="bold">
          {title1} <br />
          {title2}{' '}
        </Text>
        <Text fontSize="lg" pt={3} pb={3} color="gray.700">
          {desc1} <br /> {desc2}
        </Text>
        <Button fontSize="xl" bg="blue.300" color="white">
          <Link href={linkName}>{buttonText}</Link>
        </Button>
      </Box>
    </Flex>
  );
};

export default function Home({ propertyForSale, propertyForRent }) {
  return (
    <div>
      {console.log(propertyForRent, propertyForSale)}
      <Box>
        <Banner
          purpose="For Sale"
          title1="Rental Homes For"
          title2="Every One"
          desc1="Explore Apartments, Villas, Home"
          desc2="and More"
          buttonText="Exploring Renting"
          linkName="/search?purpose=for-rent"
          imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110798997/d9446cee36ba4f839c8fedd0e0b52208"
        />

        <Flex flexWrap="wrap" justifyContent="space-between">
          {propertyForRent.map((property) => {
            return <Property property={property} key={property.id} />;
          })}
        </Flex>
      </Box>
    </div>
  );
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
  const propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );

  return {
    props: {
      propertyForSale: propertyForSale?.hits,
      propertyForRent: propertyForRent?.hits,
    },
  };
}
