'use strict';

// had enabled by egg
// exports.static = true;

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};

exports.sessionRedis = {
  enable: true,
  package: 'egg-session-redis',
};

exports.oss = {
  enable: true,
  package: 'egg-oss',
};

exports.alinode = {
  enable: true,
  package: 'egg-alinode',
};