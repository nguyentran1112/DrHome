import * as React from "react";
import moment from "moment";
import "./AppWeb.css";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Iframe from "react-iframe";
import AppBarCustom from "./components/AppBarCustom";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
function AppWeb() {

  const channelIdMain = "1882453";
  const readApiKeyMain = "ZJHZYWSDJWN6TCYP%22";
  const writeApiKeyMain = "OY65HQC1GPKPYQIU";
  // LED
  const channelIdLed = "1886570";
  const writeApiKeyLed = "Q9EM8A7HRVWZ1X0M";
  const readApiKeyLed = "51HMTJXWEW3NWHTP";
  //RELAY
  const channelIdRelay = "1886572";
  const writeApiKeyRelay = "RLL7TR5F8OSQ2247";
  const readApiKeyRelay = "61WW6S2PO6EP5DDD";
  // BUZZER
  const channelIdBuzzer = "1882363";
  const writeApiKeyBuzzer = "OFFOK67MS9NN2JGE";
  const readApiKeyBuzzer = "G5HTPRH7QTO40BCG";
  //AUTO
  const channelIdAuto = "1886577";
  const writeApiKeyAuto = "WUI4403AOTJ202DT";
  const readApiKeyAuto = "SSIKOO491IXJZGD3";
  const [state, setState] = React.useState({
    auto: false,
    led: false,
    buzzer: false,
    relay: false,
  });

  const [temperature, setTemperature] = React.useState(0);
  const [humidity, setHumidity] = React.useState(0);
  const [dateTemperature, setDateTemperature] = React.useState(0);
  const [datehumidity, setDateHumidity] = React.useState(0);
  const [led, setLed] = React.useState(0);
  const [buzzer, setBuzzer] = React.useState(0);
  const [relay, setRelay] = React.useState(0);
  const [auto, setAuto] = React.useState(0);
  //MQTT
  console.log(buzzer);

  const check = (condition1, condition2, condition3) => {
    if(condition1 == true || (condition2 == 1)&&(condition3 == true)) {
      return true;
    }
    else {
      return false
    }
    

  }
  React.useEffect(() => {
    if (state.auto) {
      setState({ ...state, led: false, buzzer: false, relay: false });
      axios({
        url: `https://api.thingspeak.com/update?api_key=${writeApiKeyAuto}&field1=1`,
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      });
    }
    else {
      axios({
        url: `https://api.thingspeak.com/update?api_key=${writeApiKeyAuto}&field1=0`,
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      });
    }
  }, [state.auto]);
  React.useEffect(() => {
    if (state.relay) {
      axios({
        url: `https://api.thingspeak.com/update?api_key=${writeApiKeyRelay}&field1=1`,
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      });
    } else {
      axios({
        url: `https://api.thingspeak.com/update?api_key=${writeApiKeyRelay}&field1=0`,
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      });
    }
  }, [state.relay]);
  React.useEffect(() => {
    if (state.led) {
      axios({
        url: `https://api.thingspeak.com/update?api_key=${writeApiKeyLed}&field1=1`,
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      });
    } else {
      axios({
        url: `https://api.thingspeak.com/update?api_key=${writeApiKeyLed}&field1=0`,
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      });
    }
  }, [state.led]);
  React.useEffect(() => {
    if (state.buzzer) {
      axios({
        url: `https://api.thingspeak.com/update?api_key=${writeApiKeyBuzzer}&field1=1`,
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      });
      console.log('on');
    } else {
      axios({
        url: `https://api.thingspeak.com/update?api_key=${writeApiKeyBuzzer}&field1=0`,
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      });
    }
  }, [state.buzzer]);
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  React.useEffect(() => {
    setInterval(() => {
      axios
        .get(
          `https://api.thingspeak.com/channels/${channelIdMain}/fields/2/last.json?api_key=${readApiKeyMain}`
        )
        .then((response) => {
          setTemperature(response.data.field2);
          setDateTemperature(response.data.updated_at);
        })
        .catch((err) => console.log("error", err));
    }, 2000);
  }, []);
  React.useEffect(() => {
    setInterval(() => {
      axios
        .get(
          `https://api.thingspeak.com/channels/${channelIdMain}/fields/1/last.json?api_key=${readApiKeyMain}`
        )
        .then((response) => {
          setHumidity(response.data.field1);
          setDateHumidity(response.data.updated_at);
        })
        .catch((err) => console.log("error", err));
    }, 2000);
  }, []);
  // GET AUTO
  React.useEffect(() => {
    setInterval(() => {
      axios
        .get(
          `https://api.thingspeak.com/channels/${channelIdAuto}/fields/1/last.json?api_key=${readApiKeyAuto}`
        )
        .then((response) => {
          setAuto(response.data.field1);
        })
        .catch((err) => console.log("error", err));
    }, 2000);
  }, []);
  React.useEffect(() => {
    setInterval(() => {
      axios
        .get(
          `https://api.thingspeak.com/channels/${channelIdRelay}/fields/1/last.json?api_key=${readApiKeyRelay}`
        )
        .then((response) => {
          setRelay(response.data.field1);
        })
        .catch((err) => console.log("error", err));
    }, 1000);
  }, []);
  React.useEffect(() => {
    setInterval(() => {
      axios
        .get(
          `https://api.thingspeak.com/channels/${channelIdLed}/fields/1/last.json?api_key=${readApiKeyLed}`
        )
        .then((response) => {
          setLed(response.data.field1);
        })
        .catch((err) => console.log("error", err));
    }, 1000);
  }, []);
  React.useEffect(() => {
    setInterval(() => {
      axios
        .get(
          `https://api.thingspeak.com/channels/${channelIdBuzzer}/fields/1/last.json?api_key=${readApiKeyBuzzer}`
        )
        .then((response) => {
          setBuzzer(response.data.field1);
          console.log("success", response.data.field1);
        })
        .catch((err) => console.log("error", err));
    }, 1000);
  }, []);


  return (
    <div className="App">
      <AppBarCustom></AppBarCustom>
      <div className="Body" style={styleBody}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Iframe
                url="https://thingspeak.com/channels/1882453/maps/channel_show"
                width="450px"
                height="260px"
                id=""
                className=""
                display="block"
                position="relative"
              />
            </Grid>

            <Grid item xs={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",

                  padding: "4px",
                  width: 190,
                  height: 260,
                  backgroundColor: "#272727",
                }}
              >
                <div>
                  <FormControl component="fieldset" variant="standard">
                    <FormLabel component="legend" style={{ color: "white" }}>
                      CONTROLL
                    </FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            color="warning"
                            checked={state.auto}
                            onChange={handleChange}
                            name="auto"
                          />
                        }
                        style={{ color: "white" }}
                        label="AUTO"
                        labelPlacement="start"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            disabled={state.auto ? true : false}
                            color="warning"
                            checked={state.relay}
                            onChange={handleChange}
                            name="relay"
                          />
                        }
                        style={{ color: "white" }}
                        label="Relay"
                        labelPlacement="start"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            disabled={state.auto ? true : false}
                            color="warning"
                            checked={state.led}
                            onChange={handleChange}
                            name="led"
                          />
                        }
                        style={{ color: "white" }}
                        label="LED"
                        labelPlacement="start"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            disabled={state.auto ? true : false}
                            color="warning"
                            checked={state.buzzer}
                            onChange={handleChange}
                            name="buzzer"
                          />
                        }
                        style={{ color: "white" }}
                        label="BUZZER"
                        labelPlacement="start"
                      />
                    </FormGroup>
                    {/* <FormHelperText>Be careful</FormHelperText> */}
                  </FormControl>
                </div>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  padding: "4px",
                  width: 195,
                  height: 260,
                  backgroundColor: "#272727",
                }}
              >
                <div
                  style={{
                    //backgroundColor: state.relay ? "#ED6C02" : "#222527",
                    backgroundColor: check(state.relay,relay,state.auto) ? "#ED6C02" : "#222527",
                    borderRadius: "50%",
                  }}
                >
                  <img width={80} height={80} src="https://img.icons8.com/color/96/000000/azure-relay-hybrid-connection.png" />
                </div>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  padding: "4px",
                  width: 190,
                  height: 260,
                  backgroundColor: "#272727",
                }}
              >
                <LightbulbIcon
                  //color={state.led ? "warning" : "disabled"}
                  color={check(state.led,led,state.auto) ? "warning" : "disabled"}
                  style={{ width: "80px", height: "80px" }}
                />
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  padding: "4px",
                  width: 190,
                  height: 260,
                  backgroundColor: "#272727",
                }}
              >
                <VolumeUpIcon
                  //color={state.buzzer ? "warning" : "disabled"}
                  color={check(state.buzzer,buzzer,state.auto) ? "warning" : "disabled"}
                  style={{ width: "80px", height: "80px" }}
                ></VolumeUpIcon>
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Iframe
                url="https://thingspeak.com/channels/1882453/charts/2?bgcolor=%23272727&color=%2300FF00&dynamic=true&results=300&type=line"
                width="450px"
                height="260px"
                id=""
                className=""
                display="block"
                position="relative"
              />
            </Grid>
            <Grid item xs={4}>
              <Iframe
                url="https://thingspeak.com/channels/1882453/charts/1?bgcolor=%23272727&color=%23d62020&dynamic=true&results=60&type=line"
                width="450px"
                height="260px"
                id=""
                className=""
                display="block"
                position="relative"
              />
            </Grid>
            <Grid item xs={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  padding: "4px",
                  width: 190,
                  height: 260,
                  backgroundColor: "#272727",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    opacity: [0.9, 0.8, 0.7],
                  },
                }}
              >
                <div
                  style={{
                   
                    color: "white",
                    fontSize: "16px",
                    textTransform: "uppercase",
                  }}
                >
                  temperature
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "white",
                    }}
                  >
                    Last value Temperature:
                  </div>
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "52px",
                      color: "#00FF00",
                    }}
                  >
                    {temperature} &deg;C
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "white",
                    }}
                  >
                    {moment(dateTemperature).format("l") +
                      " " +
                      moment(dateTemperature).format("LTS")}
                  </div>
                </div>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  padding: "4px",
                  width: 190,
                  height: 260,
                  backgroundColor: "#272727",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    opacity: [0.9, 0.8, 0.7],
                  },
                }}
              >
                <div
                  style={{
                    // position: "absolute",
                    // top: "50%",
                    color: "white",
                    fontSize: "16px",
                    textTransform: "uppercase",
                  }}
                >
                  Humidity
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "white",
                    }}
                  >
                    Last value Humidity:
                  </div>
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "52px",
                      color: "#00FF00",
                    }}
                  >
                    {humidity} %
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "white",
                    }}
                  >
                    {moment(datehumidity).format("l") +
                      " " +
                      moment(datehumidity).format("LTS")}
                  </div>
                </div>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
      <div className="footer">
        <p style={{ color: "white" }}>Power by Trần Chí Nguyên</p>
      </div>
    </div>
  );
}

export default AppWeb;
const styleBody = {
  padding: "16px",
  backgroundColor: "#000000",

  height: "100vh",
};
