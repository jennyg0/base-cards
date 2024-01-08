import axios from 'axios';

type JSONBodyType = {
  name: string;
  description: string;
  image: string;
  attributes: Attribute[];
};

type Attribute = {
  trait_type: string;
  value: string;
};

const pinJSONToIPFS = async (JSONBody: JSONBodyType) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

  try {
    const response = await axios.post(url, JSONBody, {
      headers: {
        pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
        pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_KEY,
      },
    });

    return `ipfs://${response.data.IpfsHash}`;
  } catch (error) {
    console.error('Error pinning JSON to IPFS', error);
    throw new Error('Error pinning JSON to IPFS');
  }
};

export default pinJSONToIPFS;
