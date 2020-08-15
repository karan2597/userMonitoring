The UI demonstrates the monitoring activites of different users, whoose data is given by mock API server. The architecture of this comprises of main file i.e App.js in src directory, in which code for entire UI is present. This project is to be run in node version >= 10.

>   The utils directory within src folder, comprises of api.js, which in turn uses axios and verror for api handling. The reason for seggreagting this, is to make the code more generic, so that in future if we had use some other lib instead of axios, we could make the change directly into api.js file without any changes in app.js.
>   constants.js file comprises of all the constant entites in entire repo. It is important to note that mockAPI is also included in constants. However in practice, if we have server for runinng api, then we might need to have a config file, to identify the domain of the api, if it has to run in beta or prod env.
>   data.JSON comprises of data, which is returned by mock API. Here the start and end time are assumed to be timestamps, for easier computation.
>   moment.js is the library that is been used for easier computation of date and time, from timestamps.

In order to view the user activities task, the one needs to click on the particular row. The library used for implementing components is reactstrap and react bootstrap.

****** For Testing Purposes ******

Following is the data for different users, at which their activites can be monitored:
For given initial 3 users in data.JSON -> Feb 1 2020  1:33PM to 1:54PM, Mar 1 2020  11:11AM to 2:00PM, "Mar 16 2020  5:33PM - 8:02PM
For extrapolated users
>   Maxwell Roberts -> 
    June 20 7:30 AM - 9:30 AM && 18:30 - 19:30
    Aug 15 18:30 - 19:30

> Alex Donald
    12 March 2020 7:56 PM - 7:59 PM
    16 March 2020 19:30 - 19:56
    18 March 2020 17:30 - 19:30

>   Robert Lewandowski
        12 January 2020 06:00:21 -  06:10:21 && 16:10:21- 19:10:21
        25 February 2020 19:10:21 - 19:30:21
        25 March 2020 19:30:21- 21:30
        25 April 2020 21:30 - 22:30
        15 August 2020 06:30 - 10:30

>   Cristiano Ronaldo
        17 April 2020 10:30 - 11:56
        19 April 2020 13:56 - 18:56

> Lionel Messi
    1 January 2020 18:56-19:56
    2 January 2020 19:56-21:16
    15 August 2020 06:30-10:30
