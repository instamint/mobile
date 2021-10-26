import axios from './instamintAxios';
import {MintData, MintResponse, Market} from '../../types';
import {getFullPath} from '../../helpers/apiHelper';

const MINT_PATH = '/api/nft/mintNFT';
const GET_MARKET_PATH = '/api/nft/getMarket';

export const processMint = async (data: MintData) => {
  const url = getFullPath(MINT_PATH);

  const response = await axios.post<MintResponse>(url, data);
  return response;
};

export const getMarkets = async () => {
  const url = getFullPath(GET_MARKET_PATH);

  const response = await axios.get<Market[]>(url);
  return response;
};