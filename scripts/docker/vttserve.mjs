#!/usr/bin/env zx
import config from '../utils/config.js';

$.verbose = false;

const compose_args = ['-f', `./.foundryvtt/docker-compose.yml`].flat();
const args = ['-d'].flat();

const res = await $`docker compose ${compose_args} up ${args}`;
console.log(res);

if (res.exitCode !== 0) {
  console.log(res);
} else {
  console.log(`VTT server started on port ${config.vttserve.ports[0].external}`);
}
