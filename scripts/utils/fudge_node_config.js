// This is needed to ensure the NODE_CONFIG_DIR environment variable is set BEFORE node-config is loaded
import PDT from '../constants.js';
import path from 'path';
import { pfs } from './runtime-config.js';

const current_config_dir = process.env.NODE_CONFIG_DIR || `${path.join(__dirname, '..', PDT.CONF_DIR)}`;

process.env.NODE_CONFIG_DIR = `${path.join(pfs.userDataDir, PDT.PROGRAM_NAME)}${path.delimiter}${current_config_dir}`;
