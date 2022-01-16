const _ = require("lodash");
const luxon = require("luxon");

const luxonDateTime = luxon.DateTime;
const DATE_FORMAT_FULL = "yyyy-MM-dd hh:mm:ss.SSS ZZZZ";

module.exports = class ProgressFollowup {
  constructor(totalAmountOfIterations, logEvery = 10) {
    this.totalAmountOfIterations = totalAmountOfIterations;
    this.checkpoints = [];
    this.logEvery = logEvery;
  }

  start() {
    this.checkpoints.push(Date.now());
  }

  addCheckPoint() {
    this.checkpoints.push(Date.now());
  }

  getEstimative() {
    /*
        need to subtract 1 here, since the first entry is the start point
        this is to allow us to have metrics for the first iteration,
        otherwise we would need 2 iterations to get the first metric
    */
    const iterationsSoFar = _.size(this.checkpoints) - 1;

    const startTime = _.head(this.checkpoints);
    const lastTime = _.last(this.checkpoints);

    const elapsedTimeInMS = lastTime - startTime;

    const velocity = _.round(elapsedTimeInMS / iterationsSoFar, 2);

    const remainingToProcess = this.totalAmountOfIterations - iterationsSoFar;

    const estimated = (elapsedTimeInMS * remainingToProcess) / iterationsSoFar;

    const finishDate = luxonDateTime
      .fromMillis(Date.now() + estimated)
      .toFormat(DATE_FORMAT_FULL);

    const remainingTime = luxon.Duration.fromObject({
      milliseconds: estimated,
    }).toFormat("hh:mm:ss.SSS");

    const elapsedtimePretty = luxon.Duration.fromObject({
      milliseconds: elapsedTimeInMS,
    }).toFormat("hh:mm:ss.SSS");

    return {
      iterationsSoFar,
      startTime,
      lastTime,
      elapsedTimeInMS,
      velocity,
      remainingToProcess,
      estimated,
      finishDate,
      remainingTime,
      elapsedtimePretty,
    };
  }

  estimate() {
    const estimative = this.getEstimative();

    if (estimative.iterationsSoFar % this.logEvery == 0) {
      console.log(
        `${luxonDateTime.now().toFormat(DATE_FORMAT_FULL)}: ` +
          `[${estimative.iterationsSoFar}/${this.totalAmountOfIterations}] ` +
          `elapsed time [${estimative.elapsedtimePretty}], ` +
          `velocity [${estimative.velocity} ms/iteration], ` +
          `remaining [${estimative.remainingTime}] ====> ETA at ${estimative.finishDate}`
      );
    }
  }
};
