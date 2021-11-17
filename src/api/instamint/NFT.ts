import axios from './instamintAxios';
import {MintData, MintResponse, Market} from '../../types';
import {getFullPath} from '../../helpers/apiHelper';
import { NFTBidHistory } from '../../types/NFTBidHistory';
import { NFTTrades } from '../../types/NFTTrades';

const MINT_PATH = 'nft/mintNFT';
const GET_MARKET_PATH = 'nft/getMarket';
const GET_BID_HISTORY_PATH = 'nft/getBidAskHistory';
const GET_TRADES_PATH = 'nft/getNFTTrades';

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

export const getBidAskHistory = async (nft: number) => {
  const url = getFullPath(GET_BID_HISTORY_PATH);
  const params = {
    nft,
  };
  const response = await axios.get<NFTBidHistory[]>(url, {params});
  return response;
};

export const getTrades = async (nft: number) => {
  const url = getFullPath(GET_TRADES_PATH);
  const params = {
    nft,
  };
  const response = await axios.get<NFTTrades[]>(url, {params});
  return response;
};
