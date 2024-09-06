//filters the data w.r.t to date
function filterData(arr, date_time_data) {
  let newarr = arr.filter((item) => {
    //get the time and date
    let date_time = item.dt_txt.split(" ");
    if (date_time[0] === date_time_data[0][0]) {
      return item;
    }
  });
  return newarr; //return array of object time and temp-details
}

function dataFilter(data_c) {
  let today_temp = [];
  //get the data : time and date in iso
  const isoTimestamp = new Date().toISOString();
  let tm = isoTimestamp.split("T").shift();
  const list_of_temperature = data_c.list;
  const tz = data_c.city.timezone;
  console.log(tz);
  //split the other dates temperatures
  function getTimeIsoTimestamp(days) {
    const today = new Date();
    const futureDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
    return futureDate.toISOString();
  }
  //all five days date and time
  const fiveDays = [];
  for (let i = 0; i < 5; i++) {
    const iso_time_stamp = getTimeIsoTimestamp(i).split("T");
    iso_time_stamp.pop();
    fiveDays.push([iso_time_stamp]);
  }

  // filter temp info w.r.t to dates
  let whole_data = [];
  fiveDays.map((days) => {
    const day = days[0][0];
    today_temp = filterData(list_of_temperature, days);
    whole_data.push({ day, tz, today_temp });
  });
  // console.log("whole data", whole_data);
  return whole_data;
}

export { dataFilter };
