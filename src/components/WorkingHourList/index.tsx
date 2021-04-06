import { useState } from "react";
import clsx from "clsx";
import moment from "moment";

// Material UI
import { createStyles, makeStyles, withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";

// Custom Material UI
import TimeBlock from "./TimeBlock";

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

// Default day list
const workingHours = [
  {
    id: 1,
    day: "Monday",
    opened: false,
    from: null,
    to: null,
  },
  {
    id: 2,
    day: "Tuesday",
    opened: true,
    from: "11:00",
    to: "20:00",
  },
  {
    id: 3,
    day: "Wednesday",
    opened: true,
    from: "11:00",
    to: "20:00",
  },
  {
    id: 4,
    day: "Thursday",
    opened: true,
    from: "11:00",
    to: "20:00",
  },
  {
    id: 5,
    day: "Friday",
    opened: true,
    from: "11:00",
    to: "20:00",
  },
  {
    id: 6,
    day: "Saturday",
    opened: true,
    from: "11:00",
    to: "20:00",
  },
  {
    id: 0,
    day: "Sunday",
    opened: false,
    from: "11:00",
    to: "20:00",
  },
];

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const styles = () =>
  createStyles({
    timeBlock: {
      margin: "5px 0",
    },
    timeList: {
      boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.05)",
    },
  });

const useStyles = makeStyles(styles);

const WorkingHourList = ({ className }: Props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<string | false>("panel1");
  const today = moment();

  // Find current day
  const findCurrentDay = () => {
    const currentDayData = workingHours.filter((hour) => hour.id === today.day())[0];
    return {
      name: currentDayData.day,
      time: currentDayData.opened ? `${currentDayData.from} - ${currentDayData.to}` : "Closed",
    };
  };

  const handleChange = (panel: string) => (event: any, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className={clsx(className)}>
      <Accordion square expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
          <TimeBlock
            indicator={true}
            grey={false}
            leftText={<Typography>{findCurrentDay().name}</Typography>}
            rightText={<Typography>{findCurrentDay().time}</Typography>}
          />
        </AccordionSummary>
        <AccordionDetails classes={{ root: classes.timeList }}>
          <Grid container>
            {workingHours.map((hour, index) => {
              return (
                <Grid item lg={12} md={12} sm={12} xs={12} key={index} className={classes.timeBlock}>
                  <TimeBlock
                    grey={today.day() !== hour.id}
                    leftText={<Typography>{hour.day}</Typography>}
                    rightText={
                      <>
                        {hour.opened && (
                          <Typography>
                            {hour.from} - {hour.to}
                          </Typography>
                        )}
                        {!hour.opened && <Typography>Closed</Typography>}
                      </>
                    }
                  />
                </Grid>
              );
            })}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

interface Props {
  className?: string;
}

export default WorkingHourList;
