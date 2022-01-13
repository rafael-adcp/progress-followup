const progressFollowup = require('./index');

const totalIterations = 10000;

const progressFollower = new progressFollowup(totalIterations, 10);
progressFollower.start();

for(var i =0; i<= totalIterations; i++){
    //... your code here

    progressFollower.addCheckPoint();
    progressFollower.estimate();
}