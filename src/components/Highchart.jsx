import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import engagementMessageOverTimeChartOptions from "../utils/engagementHelper";
import channels from "../../channels.json";
import messageCountList from "../../messages.json";

const Highchart = () => {
  // console.log(channels);
  // console.log(messageCountList);
  const options = engagementMessageOverTimeChartOptions(
    messageCountList,
    channels
  );

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Highchart;
