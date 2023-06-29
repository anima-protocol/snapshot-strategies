import fetch from 'cross-fetch';
import Validation from '../validation';
import snapshot from '@snapshot-labs/snapshot.js';

const API_KEY = process.env.ANIMA_POP_API_KEY;

const headers = API_KEY
  ? {
      'Content-Type': 'application/json',
      'Api-Key': API_KEY
    }
  : undefined;

const ANIMA_POP_API_URI = `https://api.pop.anima.io/v1`;

async function fetchIsPoPApproved(
  wallet: string,
  before: string
): Promise<boolean> {
  const response = await fetch(
    `${ANIMA_POP_API_URI}/personhood/${wallet}/is-approved?before=${before}`,
    { headers }
  );

  const data = await response.json();

  if (!data) {
    console.log('[anima-pop] Unknown error', data);
    throw new Error('Unknown error');
  }

  return data.isApproved;
}

export default class extends Validation {
  public id = 'anima-proof-of-personhood';
  public github = 'anima-protocol';
  public version = '0.0.1';
  public title = 'Anima Proof of Personhood';
  public description =
    'Use this strategies to validate if user have a valid proof of personhood or not.';

  async validate(): Promise<boolean> {
    const provider = snapshot.utils.getProvider(this.network);
    const proposalTs = (await provider.getBlock(this.snapshot)).timestamp;

    return fetchIsPoPApproved(this.author, proposalTs);
  }
}
