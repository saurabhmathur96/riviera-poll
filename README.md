# riviera-poll
riviera-poll is a web application to conduct a poll among VIT Students for which artists should be invited in Riviera 2017. 
Each student can submit exactly one response which can have a maximum of three artists.

## Running Locally
```
git clone https://github.com/saurabhmathur96/riviera-poll.git
npm i --silent
npm start`
```

## Routes
| Route    | Method | Description                                                                               |
|----------|--------|-------------------------------------------------------------------------------------------|
| /        | GET    | Serve the poll form.                                                                      |
| /        | POST   | Save the response submitted via the poll form. Ensure that registration number is unique. |
| /results | GET    | Serve a graph of the poll results.                                                        |
