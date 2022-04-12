## About
This code is written to fetch the movie availability. It works based on the Function App and Logic App.
> *Logic App* triggers the *Function App* based on the recurrence. If the response received is success then it means "movie - available" and the configured person will get notified via e-mail.

## Function App
> azure-function.js

## Logic App
The Logic App has to be designed as shown in the below image. 

![Logic App](/movie-ticket-cron/azure-logic-app.jpg)

File - *Shared Access Signature(SAS)* has to be provided inside the http trigger -> request body -> "Storage File" to get file access.