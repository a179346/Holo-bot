import { CleanLocalCacheJob } from './CleanLocalCacheJob';
import { FetchLiveJob } from './FetchLiveJob';
import { PubLiveJob } from './PubLiveJob';

function start () {
  FetchLiveJob.start();
  PubLiveJob.start();
  CleanLocalCacheJob.start();
}

export const Jobs = {
  start,
};