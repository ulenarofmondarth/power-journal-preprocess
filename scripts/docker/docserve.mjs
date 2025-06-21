#!/usr/bin/env zx
import config from '../utils/config.js';

$.verbose = false;

const docker_exec_cmd = [
  'sphinx-autobuild',
  '--host',
  '0.0.0.0',
  '--port',
  config.docserve.ports[0].internal,
  '.',
  '_build/html',
];

const args = [
  '--user',
  `${process.getuid()}:${process.getgid()}`,
  '--name',
  config.docserve.name,
  ...config.docserve.ports.map(p => ['-p', `${p.external}:${p.internal}`]),
  ...config.docserve.volumes.map(v => ['-v', `${v.external}:${v.internal}`]),
  '-w',
  config.docserve.volumes[0].internal,
  `${config.docserve.image.registry}/${config.docserve.image.name}:${config.docserve.image.version}`,
  ...docker_exec_cmd,
].flat();

const res = await $`docker run -d --rm  ${args}`;

if (res.exitCode !== 0) {
  console.log(res);
} else {
  console.log(`Document server started on port ${config.docserve.ports[0].external}`);
}
