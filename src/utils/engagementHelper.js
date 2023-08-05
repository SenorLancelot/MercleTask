const engagementMessageOverTimeChartOptions = (messageCount, channelblob) => {
  const msgs = messageCount.messageCountList;
  const channelList = channelblob.channels;

  let channelData = {};

  for (let i = 0; i < msgs.length; i++) {
    if (msgs[i].channelId in channelData) {
      channelData[msgs[i].channelId].push({
        count: msgs[i].count,
        date: msgs[i].timeBucket,
      });
    } else {
      channelData[msgs[i].channelId] = [
        {
          count: msgs[i].count,
          date: msgs[i].timeBucket,
        },
      ];
    }
  }

  for (let j in channelData) {
    if (channelData[j].length < 2) {
      delete channelData[j];
    }
  }

  const dataSeries = [];

  const finalChannels = Object.keys(channelData);

  for (let channel of finalChannels) {
    const obj = channelList.find((ch) => ch.id === channel);

    if (obj) {
      const lineObject = {
        name: obj.name,
        data: [],
      };
      for (let message in channelData[channel]) {
        const dt = new Date(channelData[channel][message].date);

        const dataEntry = [
          dt.getTime(),
          parseInt(channelData[channel][message].count),
        ];
        lineObject.data.push(dataEntry);
      }

      dataSeries.push(lineObject);
    }
  }

  const options = {
    chart: {
      type: "spline",
    },
    title: {
      text: "Engagement Message Over Time",
    },
    xAxis: {
      type: "datetime",
      title: {
        text: "Date",
      },
    },
    yAxis: {
      title: { text: "Message Count" },
      labels: {
        format: "{value} msgs",
      },
    },

    series: dataSeries,
  };

  return options;
};

export default engagementMessageOverTimeChartOptions;
