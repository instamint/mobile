import axios from './instamintAxios';
import {MintData, MintResponse} from '../../types';
import {getFullPath,} from '../../helpers/apiHelper';

const MINT_PATH = '/api/nft/mintNFT';

export const processMint = async (data: MintData) => {
  const url = getFullPath(MINT_PATH);

  const response = await axios.post<MintResponse>(url, data);
  return response;
};