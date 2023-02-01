module.exports = {
  default: {
    parallel: 2,
    format: ['progress', 'html:cucumber-report.html'],
    publishQuiet: true,
    retry: 1,
    requireModule: ['ts-node/register'],
    require: ['./tests/steps/*.steps.ts'],
    paths: ['./tests/features'],
  }
}