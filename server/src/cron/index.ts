import { FetchLiveJob } from './FetchLiveJob';
import { PubLiveJob } from './PubLiveJob';

function start () {
  FetchLiveJob.start();
  PubLiveJob.start();
}

export const Jobs = {
  start,
};