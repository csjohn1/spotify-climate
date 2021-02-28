import axios from "axios";

const updateRelic = (user, points) => {
  var config = {
    method: "post",
    url: "https://insights-collector.newrelic.com/v1/accounts/3077839/events",
    headers: {
      "Content-Type": "application/json",
      // "Content-Encoding": "gzip",
      //   "Accept-Encoding": "gzip",
      "X-Insert-Key": "NRII-9dpUtm3tKr9-sjzIiPoTb5cfXm-Yfglo",
    },
    data: JSON.stringify([
      { eventType: "EnergyPoints", user: user, points: points },
    ]),
  };
  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

const updateRelicShow = (user, show) => {
  var config = {
    method: "post",
    url: "https://insights-collector.newrelic.com/v1/accounts/3077839/events",
    headers: {
      "Content-Type": "application/json",
      // "Content-Encoding": "gzip",
      //   "Accept-Encoding": "gzip",
      "X-Insert-Key": "NRII-9dpUtm3tKr9-sjzIiPoTb5cfXm-Yfglo",
    },
    data: JSON.stringify([
      { eventType: "EnergyPoints", user: user, show: show },
    ]),
  };
  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

export { updateRelic, updateRelicShow };
