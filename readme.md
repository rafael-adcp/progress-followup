# Progress Followup
a simple npm package to keep track of a script process, showing its status / velocity and estimated time of completion.

# Usage
```
const progressFollowup = require('progress-followup');

const totalIterations = 10000;

const progressFollower = new progressFollowup(totalIterations, 10);
progressFollower.start();

for(var i =0; i<= totalIterations; i++){
    //... your code here

    progressFollower.addCheckPoint();
    progressFollower.estimate();
}
```

# Example output
```
$ node example.js 
2022-01-13T20:12:02.704-03:00: [10/10000] elapsed time [0 ms], velocity is [0 ms/iteration] remaining [00:00:00 0] ====> ETA at 2022-01-13T20:12:02.686-03:00
2022-01-13T20:12:02.710-03:00: [20/10000] elapsed time [24 ms], velocity is [1.2 ms/iteration] remaining [00:00:11 976] ====> ETA at 2022-01-13T20:12:14.686-03:00 
2022-01-13T20:12:02.712-03:00: [30/10000] elapsed time [24 ms], velocity is [0.8 ms/iteration] remaining [00:00:07 976] ====> ETA at 2022-01-13T20:12:10.686-03:00 
2022-01-13T20:12:02.714-03:00: [40/10000] elapsed time [28 ms], velocity is [0.7 ms/iteration] remaining [00:00:06 972] ====> ETA at 2022-01-13T20:12:09.686-03:00 
2022-01-13T20:12:02.715-03:00: [50/10000] elapsed time [29 ms], velocity is [0.58 ms/iteration] remaining [00:00:05 771] ====> ETA at 2022-01-13T20:12:08.486-03:00
...
```

# Documentation ?
Such a small lib shouldnt need docs, check the code docs.