#!/usr/bin/env zx
import config from '../utils/config.js';

$.verbose = false;

const docker_exec_cmd = ['make', 'html'];

const args = [
  '--user',
  `${process.getuid()}:${process.getgid()}`,
  '--name',
  config.docbuild.name,
  ...config.docbuild.volumes.map(v => ['-v', `${v.external}:${v.internal}`]),
  '-w',
  config.docbuild.volumes[0].internal,
  `${config.docbuild.image.registry}/${config.docbuild.image.name}:${config.docbuild.image.version}`,
  ...docker_exec_cmd,
].flat();

const res = await $`docker run --rm ${args}`;

if (res.exitCode !== 0) {
  console.log(res);
} else {
  console.log(`Document build executed`);
}
