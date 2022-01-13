const _ = require("lodash");
const luxon = require("luxon");

const luxonDateTime = luxon.DateTime;

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

  estimate() {
    /*
        need to subtract 1 here, since the first entry is the start point
        this is to allow us to have metrics for the first iteration,
        otherwise we would need 2 iterations to get the first metric
        */
    const iterationsSoFar = _.size(this.checkpoints) - 1;

    if (iterationsSoFar % this.logEvery == 0) {
      const startTime = _.head(this.checkpoints);
      const lastTime = _.last(this.checkpoints);

      const elapsedTime = lastTime - startTime;

      const velocity = _.round(elapsedTime / iterationsSoFar, 2);

      const remainingToProcess = this.totalAmountOfIterations - iterationsSoFar;

      const estimated = (elapsedTime * remainingToProcess) / iterationsSoFar;

      const finishDate = luxonDateTime
        .fromMillis(Date.now() + estimated)
        .toString();

      const remainingTime = luxon.Duration.fromObject({
        milliseconds: estimated,
      }).toFormat("hh:mm:ss S");

      console.log(
        `${luxonDateTime.now().toString()}: [${iterationsSoFar}/${this.totalAmountOfIterations}] ` +
        `elapsed time [${elapsedTime} ms], velocity [${velocity} ms/iteration] ` +
        `remaining [${remainingTime}] ====> ETA at ${finishDate}`
      );
    }
  }
};
