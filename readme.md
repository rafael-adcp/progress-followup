# Progress Followup
a simple npm package to keep track of a script process, showing its status / velocity and estimated time of completion.

# Example + Documentation
```
const progressFollowup = require('progress-followup');

const totalIterations = 10000;

const progressFollower = new progressFollowup(
    totalIterations, // tells the lib how many iterations there will be so metrics can be calculated
    10 // tell the script to log every X, if nothing is provided 10 is assumed
);

// creates the starting point so we can have metrics already on first iteration
progressFollower.start();

for(var i =0; i <= totalIterations; i++){
    //... your code here

    //adds a checkpoint with current timestamp
    progressFollower.addCheckPoint();
    
    //prints the estimative metrics
    progressFollower.estimate();
}
```

# Example output
```
$ node example.js 
2022-01-15 10:47:06.140 GMT-3: [10/10000] elapsed time [00:00:00.000], velocity [0 ms/iteration] remaining [00:00:00.000] ====> ETA at 2022-01-15 10:47:06.123 GMT-3
2022-01-15 10:47:06.146 GMT-3: [20/10000] elapsed time [00:00:00.023], velocity [1.15 ms/iteration] remaining [00:00:11.477] ====> ETA at 2022-01-15 10:47:17.623 GMT-3
2022-01-15 10:47:06.148 GMT-3: [30/10000] elapsed time [00:00:00.024], velocity [0.8 ms/iteration] remaining [00:00:07.976] ====> ETA at 2022-01-15 10:47:14.123 GMT-3
2022-01-15 10:47:06.149 GMT-3: [40/10000] elapsed time [00:00:00.026], velocity [0.65 ms/iteration] remaining [00:00:06.474] ====> ETA at 2022-01-15 10:47:12.623 GMT-3
2022-01-15 10:47:06.150 GMT-3: [50/10000] elapsed time [00:00:00.027], velocity [0.54 ms/iteration] remaining [00:00:05.373] ====> ETA at 2022-01-15 10:47:11.523 GMT-3
...
...
...
2022-01-15 10:47:08.089 GMT-3: [9970/10000] elapsed time [00:00:01.965], velocity [0.2 ms/iteration] remaining [00:00:00.005] ====> ETA at 2022-01-15 10:47:08.093 GMT-3
2022-01-15 10:47:08.091 GMT-3: [9980/10000] elapsed time [00:00:01.967], velocity [0.2 ms/iteration] remaining [00:00:00.003] ====> ETA at 2022-01-15 10:47:08.093 GMT-3
2022-01-15 10:47:08.092 GMT-3: [9990/10000] elapsed time [00:00:01.968], velocity [0.2 ms/iteration] remaining [00:00:00.001] ====> ETA at 2022-01-15 10:47:08.092 GMT-3
2022-01-15 10:47:08.093 GMT-3: [10000/10000] elapsed time [00:00:01.970], velocity [0.2 ms/iteration] remaining [00:00:00.000] ====> ETA at 2022-01-15 10:47:08.093 GMT-3
```